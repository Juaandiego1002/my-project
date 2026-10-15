import type { HeroSliderBlock as HeroSliderBlockProps } from '@/payload-types'
import React from 'react'

import { HeroSliderClient, type HeroSlide, type HeroSocialLinks } from './Component.client'

type MediaRef = NonNullable<HeroSliderBlockProps['slides']>[number]['desktopImage']

const mediaUrl = (media: MediaRef): string | null => {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  return media.url ?? null
}

const mediaAlt = (media: MediaRef): string | null => {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  return media.alt ?? null
}

export const HeroSliderBlock: React.FC<
  HeroSliderBlockProps & {
    id?: string | number
  }
> = ({ slides, socialLinks }) => {
  const mapped: HeroSlide[] = (slides ?? [])
    .filter((slide) => slide.active !== false)
    .map((slide, index) => {
      const desktop =
        mediaUrl(slide.desktopImage) ?? slide.imageUrl ?? `/banner${(index % 3) + 1}.png`
      const mobile = mediaUrl(slide.mobileImage) ?? slide.imageUrl ?? desktop
      const alt =
        mediaAlt(slide.desktopImage) ?? mediaAlt(slide.mobileImage) ?? slide.title ?? 'Banner'

      return {
        type: (slide.type as HeroSlide['type']) ?? 'custom',
        title: slide.title,
        description: slide.description ?? null,
        desktopImage: desktop,
        mobileImage: mobile,
        alt,
        buttonLabel: slide.buttonLabel ?? null,
        buttonLink: slide.buttonLink ?? null,
        note: slide.note ?? null,
        showSocialLinks: Boolean(slide.showSocialLinks),
      }
    })
    .filter((slide) => Boolean(slide.desktopImage && slide.mobileImage))

  if (mapped.length === 0) return null

  const socials: HeroSocialLinks | null = socialLinks
    ? {
        instagram: socialLinks.instagram ?? null,
        facebook: socialLinks.facebook ?? null,
        tiktok: socialLinks.tiktok ?? null,
      }
    : null

  return <HeroSliderClient slides={mapped} socialLinks={socials} />
}
