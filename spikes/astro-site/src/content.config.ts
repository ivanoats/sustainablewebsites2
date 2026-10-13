import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The same Markdown files the Next.js site reads; the Zod schemas replace the
// hand-written validation in app/lib/content.ts.
const base = '../../content';
const text = z.string().min(1);

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base }),
  schema: z.object({
    title: text,
    description: text,
    heading: text,
    sources: z.array(z.object({ label: text, href: z.string().url() })).min(1),
  }),
});

const wsgCheck = defineCollection({
  loader: glob({ pattern: 'wsg-check.md', base }),
  schema: z.object({
    title: text,
    description: text,
    heading: text,
    intro: text,
    cta: z.object({ label: text, href: text }),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: 'services.md', base }),
  schema: z.object({
    title: text,
    description: text,
    heading: text,
    tagline: text,
    intro: text,
    services: z
      .array(
        z.object({
          id: text,
          title: text,
          tagline: text,
          summary: text,
          benefitsTitle: text,
          benefits: z.array(z.object({ label: text, text })).min(1),
          deliverable: text,
          cta: text,
        })
      )
      .min(1),
    closing: z.object({ heading: text, text, cta: text }),
  }),
});

// 71 guidelines from the wsg-check repository's vendored WSG release.
const guidelines = defineCollection({
  loader: file('src/data/guidelines.json'),
  schema: z.object({
    id: text,
    title: text,
    section: text,
    url: z.string().url(),
    summary: z.string(),
    criteriaCount: z.number(),
  }),
});

export const collections = { about, wsgCheck, services, guidelines };
