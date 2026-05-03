# ScamIQ — Testing & QA Checklist

A comprehensive pre-submission checklist to ensure ScamIQ is stable, polished, and demo-ready. Use this to catch critical bugs, validate core gameplay, and verify fallback behavior across devices.

---

## 1) Device & Layout Testing

- [ ] Test on **mobile portrait** (320–430 px width)
- [ ] Test on **mobile landscape**
- [ ] Test on **desktop (Chrome)**
- [ ] Test on **desktop (Safari / Edge if available)**
- [ ] Confirm there is **no horizontal scrolling**
- [ ] Ensure all cards fit cleanly within the viewport
- [ ] Verify buttons are easy to tap/click (minimum 44px height)
- [ ] Confirm text remains readable on small screens
- [ ] Ensure animations do not break layout or overflow

---

## 2) Landing Page QA

- [ ] Product name displays correctly
- [ ] Tagline is clear and visible
- [ ] Primary CTA button is prominent and clickable
- [ ] Page loads without blank or broken states
- [ ] Visual styling matches the final design system
- [ ] No missing icons, images, or assets

---

## 3) Core Game Flow QA

### Quick Play
- [ ] Clicking **Play Now** starts the game instantly
- [ ] Round counter updates correctly (1 → 8)
- [ ] Scenario loads properly each round
- [ ] Answer buttons are visible, responsive, and well-spaced
- [ ] Feedback appears immediately after selection
- [ ] Auto-advance OR **Next** button works reliably
- [ ] Game completes after exactly 8 rounds
- [ ] Result screen appears without delay

### Scoring Logic
- [ ] Correct answers increase score accurately
- [ ] Incorrect answers reduce or do not increase score appropriately
- [ ] Streak bonus is applied correctly
- [ ] Final ScamIQ score calculation is consistent
- [ ] Badge corresponds to the correct score range
- [ ] Weakest category is calculated correctly

---

## 4) Category Coverage QA

Test at least one scenario from each category:

- [ ] SMS / Smishing
- [ ] Email / Phishing
- [ ] Social DM
- [ ] Marketplace / Payment Scam
- [ ] Fake Login / Suspicious Link
- [ ] AI Social Engineering
- [ ] Safe scenario
- [ ] Suspicious scenario

For each category:
- [ ] Scenario feels realistic and believable
- [ ] Correct label matches explanation
- [ ] Red flags are specific and relevant
- [ ] Feedback is clear and educational

---

## 5) Answer Validation QA

For each tested scenario:

- [ ] Correct answers are recognized properly
- [ ] Incorrect answers are flagged correctly
- [ ] Borderline/suspicious cases behave as expected
- [ ] Feedback aligns with the scenario label
- [ ] Safety tip is actionable and concise
- [ ] Red flag chips render properly and are readable

---

## 6) Feedback & Coaching QA

- [ ] Correct-answer feedback feels positive and encouraging
- [ ] Incorrect feedback is clear but not overly harsh
- [ ] Explanations are short and easy to understand
- [ ] Red flags are displayed as clear chips/tags
- [ ] Safety tip appears consistently in each round
- [ ] AI Weakness Coach appears after the game
- [ ] Fallback coaching appears if AI fails

---

## 7) Share Card QA

### Browser
- [ ] Share card renders correctly on desktop browsers
- [ ] Score, badge, and tagline display accurately
- [ ] Download image function works
- [ ] Copy link works properly
- [ ] X/Twitter share opens correctly

### Mobile
- [ ] Share card renders correctly on **iOS Safari**
- [ ] Share card renders correctly on **Android Chrome**
- [ ] Download works OR shows a graceful fallback
- [ ] Text remains readable on small screens
- [ ] Image export is not cropped or misaligned

---

## 8) AI Mode & Fallback QA

### AI Challenge Pack
- [ ] AI challenge option appears after Quick Play
- [ ] Loading state is visible during generation
- [ ] AI-generated scenarios follow schema correctly
- [ ] Generated scenarios are playable and valid
- [ ] Timeout triggers fallback correctly

### No API Mode (Critical)
- [ ] App works when API is disabled
- [ ] Static curated dataset loads properly
- [ ] Fallback message is clear and visible
- [ ] No infinite loading or broken states
- [ ] Game remains fully playable without AI

---

## 9) Content & Safety QA

- [ ] No risky real-brand impersonation
- [ ] No harmful or instructional scam content
- [ ] No personal data exposure
- [ ] No misleading or confusing explanations
- [ ] No duplicate scenarios within a session
- [ ] Safe scenarios are genuinely safe
- [ ] Suspicious scenarios are not mislabeled as scams

---

## 10) Demo Readiness QA

- [ ] Full game can be completed without errors
- [ ] At least 3 scenario types can be demonstrated
- [ ] At least 1 incorrect answer can be shown for feedback
- [ ] Final score and badge display cleanly
- [ ] Share card generation works live
- [ ] AI mode OR fallback mode can be demonstrated
- [ ] App can refresh and restart cleanly

---

## 11) Final Pre-Submission Check

- [ ] App is deployed and publicly accessible
- [ ] No console errors on landing page
- [ ] No console errors during gameplay
- [ ] All links and buttons work
- [ ] No layout issues on mobile
- [ ] No missing assets
- [ ] End-to-end flow works smoothly
- [ ] Demo video matches actual product behavior

---

## Test Log

| Date | Device | Browser | Tester | Notes |
|------|--------|---------|--------|-------|
|      |        |         |        |       |
|      |        |         |        |       |
|      |        |         |        |       |

---

## ✅ Pass Criteria

All critical items must be checked, no fatal bugs present, and the complete game flow must work smoothly across both mobile and desktop environments.

---

**Goal:** Ensure ScamIQ is stable, intuitive, and impressive during live demo and judging.