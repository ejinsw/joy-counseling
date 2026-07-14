# J.O.Y. CTC Design System

## Purpose

This site exists to help people in emotional pain take a next step toward care. It should point beyond itself: to counseling in Jesus' name, to the warm welcome of Christ, and to practical help from a trustworthy counselor. The website is a bridge to care, not the destination.

The design language is humble, warm, clear, and premium. It should never feel like a sales funnel, a generic therapy template, an entry-level wellness page, or an AI-generated mood board.

## Current Audit

### Stack and CMS

- SvelteKit with Prismic Slice Machine.
- Live pages: `home`, `about`, and `contact`.
- Current slices: `Hero`, `Services`, `FAQ`, `AboutSection`, `ContactForm`, `RichText`, and `Testimonials`.
- This redesign must use existing Prismic pages, slices, fields, images, links, and copy. No schema changes are part of this pass.

### Existing Issues to Retire

- Mixed visual language: sky blue, yellow, sage, lavender, multiple gradients, glass cards, and heavy shadows.
- Repeated centered section headers and repeated card grids.
- Decorative blobs, overlaid gradients, and trust badges that make the site feel generic.
- Ornate font mix: Inter, Merriweather, Poppins, and Playfair Display are competing for voice.
- Long service copy is forced into equal cards, which hurts readability.
- Testimonials are present in the codebase but should not be used for this counseling site flow.
- Hand-rolled SVG icons appear in multiple components despite the existing `@lucide/svelte` dependency.

### Preserve

- Routes and slugs: `/`, `/about`, `/contact`.
- Nav labels: `Home`, `About Us`, `Contact`.
- Prismic content and images.
- Existing contact form field names and submission API.
- Existing logo from Prismic settings.

## Design Principles

### Clear and Gentle Christian Identity

The site may name Jesus, Christ, and the cross in design guidance, section framing, and future copy work. Visual expression should stay gentle. Avoid loud religious decoration, dramatic symbolism, glowing crosses, or theatrical hero treatments.

### Less Is More

The site should reduce emotional load. Prefer open space, clear hierarchy, plain language, and one obvious next step. Do not crowd visitors with trust badges, repeated CTAs, or busy feature cards.

### Premium Professionalism

Visitors should feel safe and oriented. The site should feel clinically credible without becoming cold, pastoral without becoming sentimental, and polished without becoming flashy.

### Existing Data First

Render CMS data as-is. Do not hardcode replacement copy. Use layout, truncation, disclosure, and hierarchy to make existing content readable.

## Design Dials

- `DESIGN_VARIANCE: 3`
- `MOTION_INTENSITY: 2`
- `VISUAL_DENSITY: 4`

This means predictable layouts, restrained interaction, medium content density, and no decorative animation loops.

## Tokens

### Color

Use a research-informed healthcare palette that sits between the first sage/olive direction and the later teal direction: eucalyptus green-teal for steadiness, health, trust, and quiet hope, with warm off-white neutrals for readability. Yellow should not function as a brand surface or primary warmth cue. Reserve high-energy warm colors only for rare semantic needs such as warnings.

- Page: `#f5f7ef`
- Surface: `#fbfcf8`
- Soft surface: `#eaf4ee`
- Border: `#dfe8d5`
- Text: `#20251d`
- Muted text: `#59634f`
- Accent: `#3c7864`
- Accent strong: `#2b4f45`
- Accent soft: `#dcefe6`
- Error: `#9f2d2d`
- Success: `#326253`

The color direction should feel like steady clinical care beside quiet pastoral warmth: calm, clear, grounded, and closer to nature than to a tech product. Avoid yellow-heavy sections, lavender, rainbow gradients, glass effects, and neon/glow treatment.

### Typography

Use the platform sans stack:

`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Headings should be calm, compact, and readable. Do not use ornate display serif fonts. Letter spacing should be normal.

Suggested scale:

- Hero: `clamp(2.35rem, 6vw, 4.6rem)`, line-height `1.02`
- Section heading: `clamp(2rem, 4vw, 3.2rem)`, line-height `1.08`
- Card/list heading: `1.15rem-1.35rem`
- Body: `1rem-1.125rem`, line-height `1.7`
- Small: `0.875rem`

### Layout

- Container max width: `72rem`.
- Wide media max width: `80rem`.
- Page padding: `1.25rem` mobile, `2rem` tablet, `2.5rem` desktop.
- Section padding: `4rem` mobile, `6rem` desktop.
- Use borders and spacing instead of heavy elevation.

### Shape and Shadow

- One radius scale: `6px` for panels, forms, media corners, buttons, and controls.
- Avoid pill shapes except when a third-party embedded control requires them.
- Shadow is rare, crisp, and shallow. Prefer `0 18px 36px rgb(18 39 32 / 0.10)` only when elevation is useful.
- Do not add generated bitmap plates, paper, felt, scrapbook, torn-edge, or handmade material cues in the active UI.

### Buttons and Links

- Primary button: accent-strong background, warm off-white text, `6px` radius.
- Secondary button: transparent or off-white background, accent-strong border/text, `6px` radius.
- Button labels must fit on one line.
- Use one contact CTA intent per surface. Existing CMS labels can render, but surrounding UI should not add competing CTAs.

### Forms

- Labels above fields.
- Placeholders are examples only, never the label.
- Inputs use warm surface, visible border, strong focus ring, and readable helper/error text.
- Loading, error, and success states must be visually calm and clear.

## Slice Specs

### Hero

- Use the existing Prismic background image.
- Render as a calm, readable hero with left-aligned content on desktop.
- Replace `min-h-screen` with `min-h-[calc(100dvh-72px)]` or similar.
- Use a warm image overlay for text legibility.
- Render headline, subheadline, optional description only if meaningful, and CMS-provided CTAs.
- Do not render fake trust pills in the hero.

### Services

- Render existing service items as a quiet service list or two-column list, not equal decorative cards.
- Service surfaces should be quiet, hard-edged panels without decorative background assets.
- Preserve all CMS text.
- Long descriptions should be readable through native disclosure or an expanded detail region.
- Use icons sparingly and with one color family.
- Keep each service CTA if present, but style it as a low-pressure text link or quiet button.
- Service detail content must open in a true modal overlay, not a full-page replacement view.

### FAQ

- Render a plain accessible accordion.
- Remove category icons and decorative badges.
- Featured status may affect ordering, but should not create loud visual treatment.
- Keep the existing contact block if CMS data exists, styled as a quiet closing panel.

### AboutSection

- Preserve existing CMS content and images.
- Use a simple clipped image treatment with no border, padding frame, tilted photo, decorative circle, or heavy gradient overlay.
- Variation behavior may keep image left/right, but mobile should stack image below text.
- Long credentials should wrap naturally without tiny text or badges.

### ContactForm

- Keep field names and API payload unchanged.
- Restyle the page as a safe intake surface.
- Use existing CMS headings and service options.
- Improve field spacing, focus states, disabled state, error block, and success block.
- Do not add extra sensitive questions.

### Testimonials

- Do not use testimonials in the intended site flow.
- If a testimonial slice appears in Prismic, render nothing or replace with a neutral empty fragment in a later implementation pass.
- Do not display ratings, client photos, names, session dates, or verified badges.

## Component Rules

- Use `@lucide/svelte` icons already installed. Do not hand-roll SVG paths when an icon exists.
- Keep navigation to one line on desktop and under 80px tall.
- Remove glass cards, decorative blobs, AI-style gradients, and repeated trust badges.
- Use a single accent color across nav, buttons, links, icons, form focus, and active states.
- Preserve Prismic image alt text where available.
- Avoid adding new visible copy unless it is part of form state or accessibility support.

## Prismic Rules

- No schema changes in this pass.
- No hardcoded replacement for CMS copy.
- No route or slug changes.
- No nav label changes.
- No form field name changes.
- No testimonials in the site flow.

## QA Checklist

- `npm run check` passes.
- `npm run build` passes.
- Home, About, and Contact work on mobile, tablet, and desktop.
- Hero CTA is visible without scroll on common desktop viewports.
- Text does not overflow buttons, panels, or images.
- Long service descriptions are readable.
- Keyboard focus is visible in nav, accordions, links, and form controls.
- Contact form has clear loading, error, and success states.
- No testimonials appear in normal page flow.
- No decorative gradients, lavender/sky/yellow palette mixing, glass cards, or heavy shadows remain in active components.
