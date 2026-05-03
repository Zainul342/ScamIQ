# ScamIQ — Design System & UI Style Guide

A cohesive, high-contrast design system inspired by the clarity of Duolingo and the modular polish of Kahoot—adapted for a fast, mobile-first scam‑detection game.

---

## 1) Brand Feel

- **Personality:** Playful, sharp, trustworthy, modern
- **Keywords:** Arcade, fast feedback, confident learning, friendly challenge
- **Visual balance:** Duolingo-style friendliness + Kahoot-style game energy + ScamIQ’s security tone

---

## 2) Color Palette

### Core Colors
- **Primary / Action Green:** `#34D399`  
  Primary CTAs, positive states, progress, success highlights
- **Accent Blue:** `#38BDF8`  
  Links, secondary accents, focus rings, informational cues
- **Danger Red:** `#FF4D6D`  
  Scam labels, incorrect states, critical alerts
- **Warning Amber:** `#FBBF24`  
  Suspicious states, caution badges, borderline cases
- **Background (Dark):** `#0B1020`  
  App background
- **Surface (Dark):** `#121A2E`  
  Cards, panels, modals
- **Surface (Light):** `#FFFFFF`  
  Share cards and light surfaces (use sparingly)
- **Text Primary:** `#F8FAFC` (on dark) / `#0F172A` (on light)
- **Text Secondary:** `#94A3B8`
- **Border / Divider:** `rgba(148,163,184,0.18)`

### Semantic Mapping
- **Safe:** Green
- **Suspicious:** Amber
- **Scam:** Red
- **Neutral / Info:** Blue

### Gradients
- **Primary CTA:** `linear-gradient(135deg, #34D399, #22C55E)`
- **Result Glow:** `linear-gradient(135deg, #38BDF8, #34D399)`
- **Danger Pulse:** `linear-gradient(135deg, #FF4D6D, #FB7185)`

---

## 3) Typography

### Font Pairing
- **Headlines:** `Baloo 2`, `Nunito`, or `Poppins` (rounded, friendly)
- **Body:** `Inter`, `Nunito Sans`, or system UI
- **Scores / Numbers:** `JetBrains Mono` or `Space Mono`

### Type Scale
- **Hero Title:** 48–56 px · Bold · Tight line-height
- **Section Title:** 28–32 px · Bold
- **Card Title:** 20–24 px · Semibold
- **Body:** 15–16 px · Regular
- **Caption / Helper:** 12–13 px · Medium
- **Score Display:** 40–72 px · Bold · Monospaced

### Rules
- Keep headings short and punchy
- Prefer sentence case; reserve ALL CAPS for small badges
- Maintain strong contrast on dark surfaces

---

## 4) Layout & Spacing

### Grid & Spacing
- **Base unit:** 8 px
- **Card padding:** 16–24 px
- **Section spacing:** 32–48 px
- **Mobile max width:** 480 px (gameplay)
- **Desktop max width:** 1120 px (marketing/results)

### Radius
- **Buttons:** 14–18 px
- **Cards:** 20–24 px
- **Chips / Badges:** 999 px (pill)

### Elevation
- Prefer soft, layered shadows over hard borders
- Example: `0 12px 30px rgba(0,0,0,0.25)`
- Add subtle glow on primary actions and score reveals

---

## 5) Buttons

### Primary
- Solid green (or gradient)
- White text
- Min height: 44 px
- Slight lift on hover / press
- Use for: **Play Now**, **Next**, **Try AI Challenges**

### Secondary
- Dark surface with border
- Blue/white text
- Use for: **Copy Link**, **Learn More**, **Back**

### Danger
- Red fill or outlined red
- Use for: destructive actions / **Scam** answer

### Answer Buttons
- **Safe:** Green · Shield/Check icon
- **Suspicious:** Amber · Alert icon
- **Scam:** Red · X/Flame icon
- Equal width, large targets, clear labels

### Interaction
- Keep labels to 1–2 words
- Press animation: slight scale down → snap back

---

## 6) Cards

### Scenario Card
- Dark, rounded surface
- Channel label (top-left)
- Sender row
- Clear content hierarchy
- Action area for answers

### Feedback Card
- Appears immediately after selection
- Shows: result state, red flags (chips), explanation, safety tip
- Outline color reflects state (green/amber/red)

### Result Card (Shareable)
- Light surface for clarity
- Prominent ScamIQ score
- Badge + short tagline
- Minimal, screenshot-friendly layout

### Promo / Feature Card
- For AI challenges, streaks, coaching
- Subtle gradient + one strong visual

### Rules
- Scannable in ≤3 seconds
- One primary action per card
- Prefer icon + text for key states

---

## 7) Icons & Badges

### Icon Style
- Rounded line icons · 2 px stroke
- Simple, friendly geometry

### Core Icons
- Shield (safe)
- Alert triangle (suspicious)
- X circle (scam)
- Flame (streak)
- Star (reward)
- Trophy (achievement)
- Sparkles (AI / special)
- Message (DM)
- Mail (email)
- Link (login / URL)
- Download (export)

### Badges
- **Easy Target** — muted gray-red
- **Cautious Clicker** — amber
- **Scam Spotter** — blue-green
- **Fraud Fighter** — bright green
- **Human Firewall** — gold glow

### Presentation
- Pill/medallion with icon + label
- Strong contrast and short descriptors

---

## 8) Motion & Feedback

### Principles
- Fast, playful, purposeful
- Immediate feedback; no long transitions

### Micro‑Interactions
- **Correct:** confetti + green glow
- **Incorrect:** quick shake + red flash
- **Score reveal:** count-up animation
- **Badge unlock:** glow pulse / pop scale
- **Progress bar:** smooth XP-like fill

### Timing
- Press: 80–120 ms
- Feedback in: 180–250 ms
- Auto-advance: 3–4 s max

---

## 9) Inspiration & Adaptation

### Borrow from Duolingo
- Rounded shapes, clarity, strong rewards, clear progression

### Borrow from Kahoot
- Bold energy, large cards, strong color coding, fast decisions

### ScamIQ Direction
- Playful UI with credible, real-world content
- Game feel + trustworthy learning experience

---

## 10) Implementation Notes

- Use **shadcn/ui** for base components
- Use **Tailwind CSS** tokens for theming
- Use **Lucide** for icons
- Mobile-first gameplay
- Reuse a unified card system across scenarios, feedback, and results

---

## 11) Quick Reference

### Do
- Large tap targets
- Bold, clear labels
- Rounded cards and consistent spacing
- High contrast
- Immediate, visible feedback
- Shareable result screens

### Avoid
- Tiny text or dense paragraphs
- Overly corporate styling
- Excessive color usage
- Complex menus or deep navigation
- Long loading states

---

**ScamIQ should feel fun to play, clear to trust, and polished enough to share.**