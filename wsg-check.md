# WSG-Check: Web Sustainability Guidelines Auditor

A free, open-source tool that evaluates your website's compliance with the
[W3C Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/)
and provides actionable recommendations to reduce energy consumption.

## Why WSG-Check?

The Web Sustainability Guidelines define 30+ evidence-based practices across
five areas:

- **User experience design** — reducing bloat, respecting attention
- **Web development** — semantic HTML, efficient code, performance budgets
- **Hosting infrastructure** — sustainable providers, caching, compression
- **Business & product** — transparency, measurement, systemic impact
- **Organizational governance** — accountability and continuous improvement

Most sustainability tools give you a score. **WSG-Check gives you actionable
feedback at the code level** — like
[axe-core](https://github.com/dequelabs/axe-core) for accessibility, but for
environmental impact.

## How It Works

### Three Ways to Use It

#### 1. Command Line (No Installation Required)

```bash
npx wsg-check https://example.com
```

**2. Web Interface** Visit
[wsg-check.netlify.app](https://wsg-check.netlify.app/) to run an instant check
from your browser.

**3. REST API** Integrate sustainability checks into your CI/CD pipeline:

```bash
POST /api/check
GET /api/guidelines
GET /api/health
```

## What It Checks

### Performance & Efficiency (WSG 3.x)

- HTML minification and asset optimization
- Render-blocking resources
- Page weight against sustainability budgets
- CSS and JavaScript redundancy

### Semantics & Standards (WSG 3.x)

- Semantic HTML structure (heading hierarchy, landmarks, ARIA)
- Accessible forms and navigation
- Metadata completeness (title, description, Open Graph)
- Structured data (JSON-LD, Schema.org)

### Design & UX (WSG 2.x)

- Non-essential content (auto-playing media, intrusive modals)
- Responsive design and lazy-loaded images
- Modern image formats (WebP, AVIF)
- Animation and motion preferences (`prefers-reduced-motion`)
- Web typography and font efficiency
- Dark mode support (`prefers-color-scheme`)

### Hosting & Infrastructure (WSG 4.x)

- Sustainable (green) hosting verification
- HTTP caching headers and strategies
- Compression (gzip, Brotli, zstd)
- Redirect chains and CDN usage
- Service Worker and offline support

### Security & Maintenance (WSG 3.x)

- HTTP security headers
- Third-party dependency assessment
- Expected files (favicon, manifest, sitemap)
- HTML version and deprecated element detection

## Reports

Every check produces a detailed report with:

- **Overall score** (0–100) and letter grade (A–F)
- **Category breakdown** — see which areas need attention
- **Recommendations** — prioritized by impact and sorted by severity
- **CO₂ estimate** — grams per page view using Sustainable Web Design v4 model
- **Green hosting status** — verified via the
  [Green Web Foundation](https://www.thegreenwebfoundation.org/)
- **Methodology notes** — understand what is and isn't measured

Export as **JSON**, **Markdown**, **HTML**, or **Terminal** output.

## Why It's Different

- **Lighthouse / PageSpeed:** Speed metrics focused on broad performance signals
- **Website Carbon / EcoGrader:** Estimated CO₂ with score-first outputs
- **axe-core / WAVE:** Accessibility checks for shift-left quality
- **WSG-Check:** WSG guideline compliance with actionable remediation

WSG-Check is the accessibility tool for sustainability: **developer-native,
standards-based, and built into your workflow.**

## Integration with CI/CD

Fail your build if sustainability score drops:

```bash
npx wsg-check https://example.com --fail-threshold 70
```

Use in GitHub Actions:

```yaml
- name: Check sustainability
  run:
    npx wsg-check https://example.com --fail-threshold 70 --format json --output
    report.json
```

## Open Source & Transparent

- **Free to use** — no proprietary pricing or hidden algorithms
- **Fully transparent** — see the exact checks that run and why
- [View the source](https://github.com/ivanoats/wsg-check) and contribute on
  GitHub
- Based on the official **W3C Web Sustainability Guidelines** — the industry
  standard

## Get Started

1. **Try it now** → [wsg-check.netlify.app](https://wsg-check.netlify.app/)
2. **Run from your terminal** → `npx wsg-check https://your-site.com`
3. **Add to CI/CD** → See the
   [documentation](https://github.com/ivanoats/wsg-check#cli-usage)
4. **Questions?** →
   [Open an issue](https://github.com/ivanoats/wsg-check/issues)

---

## Next Steps

Use WSG-Check as part of your sustainability audit or performance baseline.
Combine with [Lighthouse](https://developers.google.com/web/tools/lighthouse),
[Pa11y](https://pa11y.org/) (accessibility), and
[MarkdownLint](https://github.com/igorshubovych/markdownlint-cli) for a complete
quality gate.

**Want help interpreting your results or implementing fixes?**
[Contact us](./about.md#contact) for a free consultation.
