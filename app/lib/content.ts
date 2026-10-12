import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Build-time loader for Markdown content in /content.
 * Frontmatter is validated with the `read*` helpers so a malformed file
 * fails the build instead of rendering a broken page.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Frontmatter = Record<string, unknown>;

export interface ContentFile<T> {
  data: T;
  body: string;
}

export function loadContent<T>(
  name: string,
  parse: (data: Frontmatter, file: string) => T
): ContentFile<T> {
  const file = `${name}.md`;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return { data: parse(data, file), body: content.trim() };
}

export function readString(data: Frontmatter, key: string, file: string) {
  const value = data[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${file}: frontmatter "${key}" must be a non-empty string`);
  }
  return value;
}

export function readObject(data: Frontmatter, key: string, file: string) {
  const value = data[key];
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${file}: frontmatter "${key}" must be an object`);
  }
  return value as Frontmatter;
}

export function readList(data: Frontmatter, key: string, file: string) {
  const value = data[key];
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${file}: frontmatter "${key}" must be a non-empty list`);
  }
  return value.map((item, i) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error(`${file}: "${key}[${i}]" must be an object`);
    }
    return item as Frontmatter;
  });
}
