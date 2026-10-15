#!/usr/bin/env bash
#
# Levanta el stack de desarrollo (Postgres + Next.js) en Docker y muestra los puertos.
#
#   ./scripts/dev-stack.sh            # up (idempotente: si ya está arriba, solo muestra y sigue logs)
#   ./scripts/dev-stack.sh up         # build + up en background, imprime puertos y sigue logs de la app
#   ./scripts/dev-stack.sh rebuild    # up --build renovando volúmenes (tras cambiar package.json/lockfile)
#   ./scripts/dev-stack.sh logs [svc] # sigue logs (app por defecto)
#   ./scripts/dev-stack.sh ps         # estado y puertos mapeados
#   ./scripts/dev-stack.sh shell      # shell dentro del contenedor de la app
#   ./scripts/dev-stack.sh db         # psql contra la base
#   ./scripts/dev-stack.sh down       # detiene y elimina contenedores (conserva el volumen de datos)
#   ./scripts/dev-stack.sh reset      # down + borra el volumen de Postgres (DESTRUCTIVO)
#
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

APP_URL='http://localhost:3000'
ADMIN_URL='http://localhost:3000/admin'

die() {
  printf '\033[31merror:\033[0m %s\n' "$*" >&2
  exit 1
}

need_docker() {
  command -v docker >/dev/null 2>&1 || die "docker no está instalado o no está en el PATH"
  docker info >/dev/null 2>&1 || die "el demonio de Docker no responde (¿Docker Desktop está abierto?)"
}

wait_for_app() {
  local tries=60
  printf 'esperando a que la app responda en %s ' "$APP_URL"
  while ((tries-- > 0)); do
    if curl -fsS -o /dev/null "$APP_URL" 2>/dev/null; then
      printf ' listo\n'
      return 0
    fi
    printf '.'
    sleep 2
  done
  printf ' no respondió a tiempo\n'
  printf 'revisa los logs con: %s logs\n' "$0"
  return 0
}

own_app_running() {
  local id
  id=$(docker compose ps -q app 2>/dev/null)
  [[ -n $id ]] && [[ $(docker inspect -f '{{.State.Running}}' "$id" 2>/dev/null) == 'true' ]]
}

ensure_port_free() {
  # Si el que responde en :3000 ya es nuestro propio contenedor (app), el puerto es nuestro:
  # no hay conflicto. Solo abortamos ante un proceso ajeno (p. ej. `pnpm dev` en el host).
  if own_app_running; then
    return 0
  fi

  if curl -fsS -o /dev/null --max-time 2 "$APP_URL" 2>/dev/null; then
    printf '\033[33maviso:\033[0m ya hay algo respondiendo en %s y no es este stack (probablemente un `pnpm dev` en el host).\n' "$APP_URL" >&2
    printf 'El contenedor no puede publicar el 3000 mientras esté ocupado. Detén ese proceso y reintenta.\n' >&2
    printf 'En Windows: netstat -ano | findstr :3000  ->  taskkill /PID <pid> /F\n\n' >&2
    exit 1
  fi
}

show_ports() {
  printf '\npuertos publicados:\n'
  docker compose ps
  printf '\n  app        -> %s   (admin: %s)\n' "$APP_URL" "$ADMIN_URL"
  printf '  postgres   -> postgresql://postgres:postgres@localhost:5432/my-project\n\n'
}

cmd_up() {
  need_docker
  ensure_port_free
  if own_app_running; then
    printf 'el stack ya estaba arriba; no recreo nada (usa `rebuild` tras cambiar package.json).\n'
  else
    docker compose up -d --build
  fi
  show_ports
  wait_for_app
  printf '\nContenedores en background. Ctrl+C solo corta los logs (el stack sigue arriba).\n\n'
  docker compose logs -f app
}

cmd_rebuild() {
  need_docker
  ensure_port_free
  # node_modules y .next son volúmenes anónimos que sobreviven a los recreates:
  # sin --renew-anon-volumes un `--build` seguiría usando las dependencias viejas.
  printf 'recreando app con volúmenes renovados…\n'
  docker compose up -d --build --renew-anon-volumes
  show_ports
  wait_for_app
}

cmd_down() {
  need_docker
  docker compose down
}

cmd_reset() {
  need_docker
  printf 'Esto borrará TODOS los datos de Postgres (volumen postgres_data).'
  read -r -p ' ¿Continuar? [y/N] ' reply
  [[ $reply == [yY] ]] || die 'cancelado'
  docker compose down -v
}

cmd_logs() {
  need_docker
  docker compose logs -f "${1:-app}"
}

cmd_ps() {
  need_docker
  docker compose ps
}

cmd_shell() {
  need_docker
  docker compose exec app sh
}

cmd_db() {
  need_docker
  docker compose exec postgres psql -U postgres -d my-project
}

case "${1:-up}" in
  up) cmd_up ;;
  rebuild) cmd_rebuild ;;
  down) cmd_down ;;
  reset) cmd_reset ;;
  logs) shift || true; cmd_logs "${1:-app}" ;;
  ps) cmd_ps ;;
  shell) cmd_shell ;;
  db) cmd_db ;;
  -h | --help | help) awk 'NR>2 && /^#/ {sub(/^# ?/, ""); print; next} NR>2 {exit}' "${BASH_SOURCE[0]}" ;;
  *) die "comando desconocido: $1 (usa: up | rebuild | down | reset | logs | ps | shell | db)" ;;
esac
