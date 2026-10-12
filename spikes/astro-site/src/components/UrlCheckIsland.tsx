import { useState } from 'react';

/**
 * Spike island: the one kind of interactivity the product plan implies on the
 * marketing site (a URL check form). It makes no network call; it only proves
 * that a hydrated React component can sit on an otherwise static page.
 */
export default function UrlCheckIsland() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(url);
      }}
    >
      <label htmlFor="url">Website to check</label>
      <input
        id="url"
        name="url"
        type="url"
        required
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
      />
      <button type="submit">Check</button>
      {submitted && <p role="status">Would check {submitted}</p>}
    </form>
  );
}
