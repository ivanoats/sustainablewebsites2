import { describe, it, expect } from 'vitest';
import {
  loadContent,
  readList,
  readObject,
  readString,
  type Frontmatter,
} from './content';

const FILE = 'test.md';

describe('readString', () => {
  it('returns a non-empty string', () => {
    expect(readString({ a: 'x' }, 'a', FILE)).toBe('x');
  });

  it.each([undefined, '', '   ', 1, null, {}])('rejects %j', (value) => {
    expect(() => readString({ a: value }, 'a', FILE)).toThrow(
      'test.md: frontmatter "a" must be a non-empty string'
    );
  });
});

describe('readObject', () => {
  it('returns an object', () => {
    expect(readObject({ a: { b: 1 } }, 'a', FILE)).toEqual({ b: 1 });
  });

  it.each([undefined, null, 'x', [], 1])('rejects %j', (value) => {
    expect(() => readObject({ a: value }, 'a', FILE)).toThrow(
      'frontmatter "a" must be an object'
    );
  });
});

describe('readList', () => {
  it('returns a list of objects', () => {
    expect(readList({ a: [{ b: 1 }] }, 'a', FILE)).toEqual([{ b: 1 }]);
  });

  it.each([undefined, [], 'x', {}])('rejects %j as a list', (value) => {
    expect(() => readList({ a: value }, 'a', FILE)).toThrow(
      'frontmatter "a" must be a non-empty list'
    );
  });

  it.each(['x', null, [], 1])('rejects list item %j', (item) => {
    expect(() => readList({ a: [item] }, 'a', FILE)).toThrow(
      '"a[0]" must be an object'
    );
  });
});

describe('loadContent', () => {
  it('parses frontmatter and trims the body of a real content file', () => {
    const { data, body } = loadContent(
      'wsg-check',
      (fm: Frontmatter, file) => ({
        title: readString(fm, 'title', file),
      })
    );
    expect(data.title).toBe('WSG Check');
    expect(body.startsWith('## Coming Soon')).toBe(true);
  });

  it('passes the file name to the parser and propagates its errors', () => {
    expect(() =>
      loadContent('about', (fm, file) => readString(fm, 'missing', file))
    ).toThrow('about.md: frontmatter "missing"');
  });

  it('throws for a file that does not exist', () => {
    expect(() => loadContent('nope', () => null)).toThrow();
  });
});
