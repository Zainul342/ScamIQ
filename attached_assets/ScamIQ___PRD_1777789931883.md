# ScamIQ

### TL;DR

ScamIQ is a fun, arcade-style scam detection game that teaches everyday internet users to recognize phishing emails, smishing texts, suspicious DMs, marketplace fraud, fake login pages, and AI-generated social engineering. Users play 8 fast rounds, judge each scenario as Safe / Suspicious / Scam, get instant feedback with red flag explanations, and receive a shareable ScamIQ score card. Built for the Replit 10 Year Buildathon (May 2-3, 2026) as a solo project using Replit Agent.

---

## Goals

### Business Goals

* Win or place in the Replit 10 Year Buildathon ($100K+ prize pool).
* Demonstrate a polished, complete product built solo in 24 hours using Replit Agent.
* Create a product with viral sharing mechanics that generates organic reach through social posts.
* Establish ScamIQ as a consumer-first scam education brand distinct from enterprise training tools.
* Generate a compelling 3-minute demo video and social post for buildathon submission.

### User Goals

* Test and improve personal scam detection instincts in under 3 minutes.
* Learn to identify red flags across multiple scam channels (SMS, email, DM, marketplace, AI-generated messages).
* Receive personalized feedback on scam weaknesses after each game.
* Share ScamIQ score and badge with friends to create awareness and friendly competition.
* Access scam training without needing a corporate account, login, or payment.

### Non-Goals

* Building an enterprise security training platform or LMS.
* Real-time URL scanning, phishing detection, or browser extension functionality.
* User accounts, authentication, persistent leaderboards, or payment processing.

---

## User Stories

### Everyday Internet User

* As an everyday internet user, I want to play a quick scam detection game, so that I can test whether I would fall for real-world scams.
* As an everyday internet user, I want to see which red flags I missed, so that I can learn what to look for next time.
* As an everyday internet user, I want to get a ScamIQ score and badge, so that I can understand my scam awareness level.
* As an everyday internet user, I want to share my ScamIQ result card on social media, so that I can challenge my friends and spread awareness.
* As an everyday internet user, I want to try AI-generated challenge packs, so that the game stays fresh and unpredictable.

### Parent or Family Member

* As a parent, I want to send the game link to my family members, so that they can practice spotting scams without me lecturing them.
* As a parent, I want the game to cover SMS, DMs, and marketplace scams (not just email), so that it reflects the scams my family actually encounters.

### Student

* As a student, I want to complete a game round in under 3 minutes, so that I can play between classes or during a break.
* As a student, I want to see explanations for each scenario, so that I actually learn something and not just guess.

### Buildathon Judge

* As a buildathon judge, I want to see a complete, polished product with a clear value proposition, so that I can score high on Execution and Progress.
* As a buildathon judge, I want to see meaningful use of Replit Agent and AI APIs, so that I can score high on Use of Agent.
* As a buildathon judge, I want to hear a compelling story behind why this was built, so that I can score high on Story.

---

## Functional Requirements

* Landing Page (Priority: Critical)

  * Hero Section: Display product name "ScamIQ", tagline "Can you spot the scam before it spots you?", and a prominent "Play Now" CTA button. No login required.
  * Value Proposition: Show 3 quick bullet points explaining what ScamIQ does: test your instincts, learn red flags, share your score.
  * Social Proof / Stats: Display a real-time or static counter: "X scams spotted today" or "Join 500+ scam spotters" (can be illustrative for MVP).
  * Visual Tone: Dark background, neon green and electric blue accents, arcade game aesthetic.

* Game Engine (Priority: Critical)

  * Quick Play Mode: Single game mode with 8 rounds per session. No mode selection needed for MVP.
  * Scenario Loading: Load 8 scenarios from a pre-seeded static dataset. Scenarios are randomized each session to prevent memorization.
  * Scenario Display: Render each scenario as a realistic-looking card matching its type (email layout for email scams, chat bubble for SMS/DM, browser mockup for fake login pages).
  * Answer Input: Three answer buttons per round: Safe, Suspicious, Scam. Buttons are large, touch-friendly, and color-coded (green, yellow, red).
  * Answer Validation: Compare user answer to correct answer. Award points based on correctness.
  * Round Transition: After answering, show feedback overlay, then auto-advance to next round after 3-4 seconds or on user tap.

* Scenario Content (Priority: Critical)

  * Static Dataset: Pre-seed 24-30 scenarios across 6 categories. Each scenario includes: id, type, difficulty, sender/source, content body, correct answer, red flags array, explanation text, and safety tip.
  * Category Mix Per Game: Each 8-round game draws a balanced mix: 2 SMS/Smishing, 2 Email Phishing, 1 Social Media DM, 1 Marketplace/Payment Scam, 1 Fake Login/Link, 1 AI Social Engineering.
  * Safe Scenarios: At least 2 of 8 scenarios per game should be legitimately safe to prevent users from always guessing "scam."
  * Difficulty Variance: Mix easy, medium, and hard scenarios within each game session.

* Feedback System (Priority: Critical)

  * Instant Feedback: After each answer, display whether the user was correct or incorrect with a visual indicator (checkmark or X animation).
  * Red Flag Highlights: Show 2-4 specific red flags for scam/suspicious scenarios (e.g., "Urgency language," "Suspicious domain," "Asks for personal info").
  * Explanation: Display a 1-2 sentence explanation of why the scenario is safe, suspicious, or a scam.
  * Safety Tip: Show one actionable tip the user can apply in real life.

* Scoring System (Priority: Critical)

  * Points Calculation: +100 for correct answer, +0 for wrong answer, +25 streak bonus after 3 consecutive correct answers.
  * ScamIQ Score: Calculate final score as a percentage (0-100) based on accuracy across all 8 rounds.
  * Badge Assignment: Assign a badge based on ScamIQ score: Easy Target (0-39), Cautious Clicker (40-59), Scam Spotter (60-79), Fraud Fighter (80-94), Human Firewall (95-100).
  * Weakness Analysis: Identify the scenario category where user performed worst. Display as "Your biggest weakness: \[category\]."

* Result Screen (Priority: Critical)

  * Score Display: Show ScamIQ score prominently with badge name and icon.
  * Stats Summary: Display total correct, total wrong, streak count, and weakest category.
  * Share Card: Generate a visually appealing result card with: ScamIQ score, badge, tagline "Can you beat me?", and ScamIQ branding.
  * Share Actions: Provide buttons to share result card to Twitter/X, copy link, and download as image.
  * Play Again: Prominent "Play Again" button to start a new randomized session.

* AI Challenge Pack (Priority: High)

  * AI Generation Toggle: After completing Quick Play, show a button or badge: "Try AI-Generated Challenges" or "AI Challenge Pack."
  * AI Scenario Generation: On user request, call LLM API (Replit AI API primary, Gemini fallback) to generate a fresh set of 8 scenarios following the same JSON schema as static scenarios.
  * Fallback Handling: If API call fails or times out (>5 seconds), gracefully fall back to a second set of static scenarios with a toast message: "AI unavailable — playing curated challenges instead."
  * AI Weakness Coach: After completing any game (static or AI), use LLM to generate a 2-3 sentence personalized analysis of the user's mistakes and scam detection weaknesses.

* AI Weakness Coach (Priority: High)

  * Post-Game Analysis: After the result screen, display an AI-generated coaching message analyzing the user's wrong answers.
  * Coaching Content: Identify patterns in mistakes (e.g., "You tend to miss urgency-based scams" or "You are strong at spotting fake emails but weak against marketplace scams").
  * Actionable Advice: Provide 2-3 specific tips to improve based on the user's performance.
  * Fallback: If AI API is unavailable, show a generic tip based on the weakest category from the static mapping.

---

## User Experience

**Entry Point and First-Time User Experience**

* User discovers ScamIQ through a shared link, social media post, or buildathon submission page.
* Landing page loads instantly with dark arcade-themed design, product name, tagline, and a single "Play Now" button.
* No signup, no login, no onboarding tutorial. User clicks "Play Now" and the first scenario loads within 1 second.
* A brief 3-second intro animation shows: "8 Rounds. Spot the Scams. Get Your ScamIQ." Then the first scenario card appears.

**Core Experience**

* Step 1: User sees the first scenario card.

  * Card displays a realistic rendering of the scam/safe content (email layout, SMS bubble, DM thread, browser mockup, or message transcript).
  * Scenario type label shown at the top (e.g., "SMS," "Email," "Social DM").
  * Round counter visible: "Round 1 of 8."
  * Three large answer buttons at the bottom: Safe (green), Suspicious (yellow), Scam (red).

* Step 2: User selects an answer.

  * Button press triggers a micro-animation (pulse or glow).
  * Feedback overlay slides in from bottom.
  * If correct: green checkmark animation, confetti particles, "+100" points float up.
  * If incorrect: red X animation, subtle shake, "+0" displayed.
  * Streak counter updates if applicable.

* Step 3: User reads the feedback.

  * Feedback card shows: Correct/Incorrect status, the correct answer, 2-4 red flags as tagged pills (e.g., "Urgency," "Fake Domain," "Personal Info Request"), a 1-2 sentence explanation, and a safety tip.
  * User taps "Next" or waits 4 seconds for auto-advance.

* Step 4: Rounds 2 through 8 repeat the same flow.

  * Each round loads a different scenario type to keep the game varied.
  * Streak counter and point total are visible in a top bar.
  * Progress bar fills as rounds complete.

* Step 5: After round 8, the result screen appears.

  * ScamIQ score displays with a count-up animation (0 to final score).
  * Badge reveals with a glow/unlock animation: "You are a Fraud Fighter!"
  * Stats summary: 6/8 correct, best streak: 4, weakest area: SMS scams.
  * AI Weakness Coach section loads below (or fallback tip if API unavailable).
  * Share card preview shows with "Share to X," "Copy Link," and "Download" buttons.
  * "Play Again" and "Try AI Challenges" buttons at the bottom.

* Step 6: User shares their result.

  * Share card is a visually designed image/card with: ScamIQ score, badge icon, tagline "My ScamIQ is 86. Can you beat me?", and ScamIQ URL.
  * Sharing to X pre-fills a post with the score and a link back to ScamIQ.
  * Download saves a PNG of the share card to device.

* Step 7: User tries AI Challenge Pack (optional).

  * User taps "Try AI Challenges."
  * Loading state: "AI is generating fresh scam scenarios..."
  * If successful: new 8-round game starts with AI-generated scenarios.
  * If API fails: toast notification appears, fallback static set loads instead.
  * Game flow is identical to Quick Play.

**Advanced Features and Edge Cases**

* If user closes browser mid-game, no progress is saved. User starts fresh on return.
* If all static scenarios have been seen (after 3+ games), AI Challenge Pack becomes the primary replay option.
* If share card generation fails, fallback to text-only share with score and link.
* If a scenario's correct answer is debatable (e.g., "suspicious" vs "scam"), accept both "suspicious" and "scam" as correct for borderline cases.
* Empty state: if scenario dataset fails to load, show an error screen with "Something went wrong. Please refresh." and a retry button.

**UI/UX Highlights**

* Dark mode only. Background: near-black (#0a0a0f or similar). Accent colors: neon green (#00ff88), electric blue (#00d4ff), warning orange (#ff6b35), danger red (#ff3366).
* All interactive elements sized for mobile touch targets (minimum 44px tap area).
* Scenario cards should mimic real-world UI: email cards look like email clients, SMS cards look like phone message bubbles, DM cards look like social media chat threads.
* Typography: clean sans-serif, high contrast for readability. Score numbers use a monospace or display font for arcade feel.
* Animations: subtle but satisfying. Confetti on correct answers, shake on wrong answers, count-up on final score, glow on badge reveal.
* Responsive: mobile-first design. Desktop layout centers the game card with comfortable max-width (480px).
* Accessibility: color is not the only indicator for correct/incorrect (icons + text labels used alongside color). Answer buttons have clear text labels, not just colors.
* Loading states: skeleton loaders or pulsing placeholders while scenarios or AI content loads.
* No horizontal scrolling. No modals that block gameplay. No popups.

---

## Narrative

It is 9 PM on a Tuesday. A college student receives a text message: "Your package could not be delivered. Confirm your address now." The link looks almost real. They hesitate. Normally, they would click it, enter their info, and move on. But last week, they played ScamIQ.

They remember the red flags: the urgency, the unfamiliar domain, the request for personal information. They delete the text and check the real delivery app instead. Nothing is pending. The text was a smishing attempt.

This is why ScamIQ exists. Most people never receive scam awareness training unless they work at a company with a security compliance program. Meanwhile, scammers are getting smarter. They use AI to write convincing emails, impersonate trusted brands across SMS and social media, and create fake login pages that look pixel-perfect.

ScamIQ makes scam training accessible by turning it into a fast, playable arcade game. Eight rounds. Real-world scenarios across emails, texts, DMs, marketplaces, and AI-generated social engineering. Instant feedback with red flag breakdowns. A shareable ScamIQ score that turns awareness into social currency.

The result: users build real scam instincts in under three minutes. They share their scores, challenge friends, and spread awareness organically. Scam education stops being a corporate checkbox and starts being something people actually want to do.

---

## Success Metrics

### User-Centric Metrics

* Game completion rate: percentage of users who finish all 8 rounds after starting. Target: above 80%.
* Share rate: percentage of users who share their ScamIQ result card after completing a game. Target: above 15%.
* Replay rate: percentage of users who play a second game within the same session. Target: above 25%.
* AI Challenge Pack engagement: percentage of users who try AI-generated challenges after completing Quick Play. Target: above 10%.

### Business Metrics

* Total games played during the buildathon demo period. Target: 100+ within first 24 hours of submission.
* Social media impressions generated from shared score cards. Target: measurable via UTM links.
* Buildathon placement: win or place in the Replit 10 Year Buildathon.

### Technical Metrics

* Page load time: landing page loads in under 2 seconds on mobile.
* Scenario load time: each round loads in under 500ms from static dataset.
* AI generation latency: AI Challenge Pack scenarios generate in under 8 seconds, with 5-second timeout triggering fallback.
* Error rate: fewer than 2% of game sessions encounter an unrecoverable error.
* Mobile responsiveness: fully functional on screens 320px and wider.

### Tracking Plan

* Page view: landing page loaded.
* Game started: user clicks "Play Now."
* Round answered: user selects Safe, Suspicious, or Scam (log answer, correct/incorrect, round number, scenario type).
* Game completed: user finishes all 8 rounds (log final score, badge, time elapsed).
* Share clicked: user clicks any share button (log share target: X, copy link, download).
* AI challenge started: user clicks "Try AI Challenges."
* AI fallback triggered: AI generation failed, fallback loaded.
* Play again clicked: user starts a new session.
* AI coach loaded: post-game coaching message displayed.

---

## Technical Considerations

### Technical Needs

* Frontend: single-page application using React or Next.js. Component-based architecture with reusable ScenarioCard, FeedbackOverlay, ScoreScreen, and ShareCard components.
* Styling: Tailwind CSS or CSS modules. Dark theme with neon accent color palette defined as CSS variables or Tailwind config.
* Game State: managed entirely in browser using React state or Context. No backend session persistence needed for MVP.
* Scenario Data: JSON file containing 24-30 pre-seeded scenarios. Each scenario follows a strict schema (id, type, difficulty, sender, content, correctAnswer, redFlags, explanation, safetyTip).
* API Route: one server-side route or serverless function for AI scenario generation. Accepts category/difficulty params, calls LLM API, validates response against scenario schema, returns JSON.
* Share Card Generation: HTML/CSS rendered card, exported as PNG using html2canvas or dom-to-image library. Alternatively, a server-side image generation endpoint.

### Integration Points

* LLM API for scenario generation and weakness coaching: Replit AI API (primary), Google Gemini API (secondary fallback).
* Social sharing: Twitter/X intent URL with pre-filled text and link. No OAuth needed.
* Image export: html2canvas or dom-to-image for client-side PNG generation of share cards.
* No database integration needed for MVP. All data is static or session-scoped.

### Data Storage and Privacy

* No user data is collected or stored. No accounts, no cookies for tracking, no PII.
* Game state exists only in browser memory during the session and is discarded on page close.
* Scenario dataset is static and bundled with the application.
* AI API calls do not send user data, only scenario generation prompts.
* No analytics backend for MVP. Tracking plan can be implemented with simple console logs or a lightweight analytics snippet (optional).

### Scalability and Performance

* Static site or lightweight server. Expected load: under 1,000 concurrent users during buildathon judging period.
* Scenario data served from bundled JSON, no database queries.
* AI API calls are optional and user-initiated, so they do not block core gameplay.
* Share card generation is client-side, no server load.
* CDN deployment via Replit handles static asset delivery.

### Potential Challenges

* AI scenario quality: LLM-generated scenarios may be inconsistent, too easy, or contain errors. Mitigation: validate AI output against schema, reject malformed responses, fall back to static dataset.
* AI API latency: LLM calls may take 5-10 seconds. Mitigation: show engaging loading animation, set 5-second timeout, fallback to static scenarios.
* Share card rendering: html2canvas can be inconsistent across browsers. Mitigation: test on Chrome and Safari mobile, keep card design simple and avoid complex CSS.
* Scenario balance: if too many scenarios are scams, users learn to always guess "scam." Mitigation: enforce 2+ safe scenarios per 8-round game in the randomization logic.
* Content sensitivity: scam scenarios should not teach users how to create scams or impersonate real brands. Mitigation: use fictional brand names, focus on red flag education, not scam mechanics.

---

## Milestones and Sequencing

### Project Estimate

Medium: approximately 12-16 hours of focused build time within the 24-hour buildathon window.

### Team Size and Composition

Solo builder (1 person):

* Product, design, frontend, backend, content, and demo video all handled by one person.
* Replit Agent serves as the primary development accelerator.
* LLM APIs serve as the content generation engine.

### Suggested Phases

**Phase 1: Foundation (3-4 hours)**

* Key Deliverables:
  * Solo builder: scaffold project with Replit Agent (React/Next.js + Tailwind).
  * Solo builder: create landing page with hero, tagline, and "Play Now" CTA.
  * Solo builder: define scenario JSON schema and seed 10-12 initial scenarios manually (assisted by LLM).
  * Solo builder: implement basic game loop: load scenario, display card, capture answer, advance to next round.
* Dependencies: Replit Agent environment set up and working.

**Phase 2: Core Game (3-4 hours)**

* Key Deliverables:
  * Solo builder: implement all 6 scenario card types with appropriate visual rendering (email layout, SMS bubble, DM thread, browser mockup, marketplace message, AI transcript).
  * Solo builder: build feedback overlay with correct/incorrect state, red flags, explanation, and safety tip.
  * Solo builder: implement scoring system (points, streak, ScamIQ calculation, badge assignment).
  * Solo builder: build result screen with score display, stats summary, and badge reveal.
  * Solo builder: seed remaining scenarios to reach 24-30 total across all categories.
* Dependencies: Phase 1 game loop working.

**Phase 3: Share Card and Social (2-3 hours)**

* Key Deliverables:
  * Solo builder: design and implement shareable ScamIQ result card (HTML/CSS).
  * Solo builder: implement PNG export using html2canvas or dom-to-image.
  * Solo builder: add share buttons for X/Twitter (intent URL), copy link, and download image.
  * Solo builder: test share flow end-to-end on mobile and desktop.
* Dependencies: Phase 2 result screen complete.

**Phase 4: AI Integration (2-3 hours)**

* Key Deliverables:
  * Solo builder: create API route for AI scenario generation (Replit AI API or Gemini).
  * Solo builder: implement "Try AI Challenges" button on result screen.
  * Solo builder: build loading state, timeout handling, and fallback logic.
  * Solo builder: implement AI Weakness Coach (post-game analysis of wrong answers).
  * Solo builder: validate AI output against scenario schema, reject invalid responses.
* Dependencies: Phase 2 game engine complete, API key configured.

**Phase 5: Polish and Submit (2-3 hours)**

* Key Deliverables:
  * Solo builder: add animations (confetti on correct, shake on wrong, count-up on score, glow on badge reveal).
  * Solo builder: test and fix mobile responsiveness across screen sizes.
  * Solo builder: test full game flow 3-5 times end-to-end, fix bugs.
  * Solo builder: record 3-minute demo video showing: landing page, gameplay (3-4 rounds), feedback, result screen, share card, AI challenge pack, and personal story narration.
  * Solo builder: write and publish social media post with project link.
  * Solo builder: submit to Replit Buildathon.
* Dependencies: Phases 1-4 functionally complete.

---

## Appendix

### Scenario JSON Schema

```json
{
  "id": "string",
  "type": "email | sms | social_dm | marketplace | fake_login | ai_social_engineering",
  "difficulty": "easy | medium | hard",
  "sender": "string",
  "subject": "string (optional, for email type)",
  "content": "string",
  "url": "string (optional, for scenarios containing links)",
  "correctAnswer": "safe | suspicious | scam",
  "acceptableAnswers": \["string array, e.g. \['suspicious', 'scam'\] for borderline cases"\],
  "redFlags": \["string array, 2-4 items"\],
  "explanation": "string, 1-2 sentences",
  "safetyTip": "string, 1 actionable sentence"
}
```

### Example Scenarios

**SMS Scam (Medium)**

* id: sms_001
* type: sms
* sender: FedParcel
* content: "Your package could not be delivered. Confirm your address within 2 hours or it will be returned: fedparcel-track-support.com/verify"
* correctAnswer: scam
* redFlags: Creates urgency with time limit, Uses unofficial domain "fedparcel-track-support.com", Asks user to confirm personal address info, Brand name "FedParcel" mimics real carriers
* explanation: This is a delivery smishing attempt. Real delivery companies do not send urgent address confirmation links through SMS with countdown timers.
* safetyTip: Always check your delivery status directly through the official carrier app or website, never through links in text messages.

**Email Phishing (Easy)**

* id: email_001
* type: email
* sender: [security@paypa1-alerts.com](mailto:security@paypa1-alerts.com)
* subject: Unusual activity detected on your account
* content: "We noticed unusual login activity on your account. For your security, please verify your identity immediately by clicking the link below. Failure to verify within 24 hours will result in account suspension. \[Verify Now\]"
* correctAnswer: scam
* redFlags: Sender domain "paypa1-alerts.com" uses number 1 instead of letter l, Creates urgency with 24-hour deadline, Threatens account suspension, Generic greeting without user name
* explanation: This email impersonates a payment service using a lookalike domain. The real company would address you by name and would not threaten suspension via email.
* safetyTip: Always check the sender email domain carefully. Look for character substitutions like "1" for "l" or "0" for "O."

**Safe Email (Medium)**

* id: email_safe_001
* type: email
* sender: [noreply@accounts.google.com](mailto:noreply@accounts.google.com)
* subject: Your password was changed
* content: "Hi, the password for your Google Account was recently changed. If you made this change, no further action is needed. If you did not change your password, your account may be compromised. Review your account activity at myaccount.google.com."
* correctAnswer: safe
* acceptableAnswers: \["safe", "suspicious"\]
* redFlags: \[\]
* explanation: This is a legitimate security notification from Google. The sender domain is correct (accounts.google.com), it does not ask you to click a suspicious link, and it directs you to the official myaccount.google.com domain.
* safetyTip: Legitimate security emails from major services will use their official domain and direct you to their official website, not a third-party link.

**Social DM Scam (Medium)**

* id: dm_001
* type: social_dm
* sender: "@instagram_help_center"
* content: "Hi, we noticed your account may be violating our community guidelines. To avoid permanent deletion, please verify your account ownership here: instagram-verify-appeals.com/form. You have 12 hours."
* correctAnswer: scam
* redFlags: Unofficial account handle with underscores, External link not on instagram.com domain, Urgency with 12-hour deadline, Threatens permanent account deletion
* explanation: Instagram does not contact users through DMs for account violations. Official communications come through the app's notification system or registered email.
* safetyTip: Social media platforms never send enforcement actions through DMs. Check your account status in the app settings directly.

**AI Social Engineering (Hard)**

* id: ai_001
* type: ai_social_engineering
* sender: "Your Manager (via Teams chat)"
* content: "Hey, I am in a board meeting and cannot talk right now. I need you to purchase three $100 Apple gift cards for a client appreciation event. Send me the codes as soon as you have them. I will reimburse you today. Please do not mention this to anyone else until the event announcement."
* correctAnswer: scam
* redFlags: Requests gift card purchases which is a top scam indicator, Asks you not to tell anyone else, Creates urgency by referencing an ongoing meeting, Promises reimbursement later
* explanation: This is a business email compromise / gift card scam. Scammers impersonate authority figures and use urgency to pressure victims into buying gift cards. No legitimate manager would ask employees to buy gift cards and send codes via chat.
* safetyTip: Any request involving gift card purchases from a manager or executive is almost certainly a scam. Always verify through a separate communication channel.

### ScamIQ Level Badges

| Score Range | Badge Name | Description |
| --- | --- | --- |
| 0-39 | Easy Target | You need serious scam training. Scammers would love you. |
| 40-59 | Cautious Clicker | You catch some scams but miss critical red flags. Keep practicing. |
| 60-79 | Scam Spotter | You have decent instincts but advanced scams can still fool you. |
| 80-94 | Fraud Fighter | You are sharp. Most scams cannot get past you. |
| 95-100 | Human Firewall | Unstoppable. Scammers do not stand a chance against you. |

### AI Prompt Templates

**Scenario Generation Prompt:**

> Generate a realistic scam scenario for a ScamIQ game. The scenario type is \[TYPE\]. Difficulty is \[DIFFICULTY\]. Create a believable message that a scammer would send, with at least 3 identifiable red flags. Use a fictional brand name, not a real company. Output as JSON matching this schema: {id, type, difficulty, sender, content, correctAnswer, redFlags\[\], explanation, safetyTip}. The scenario should be educational, not instructional for committing scams.

**Safe Scenario Generation Prompt:**

> Generate a realistic SAFE (legitimate) scenario for a ScamIQ game. The scenario type is \[TYPE\]. Create a genuine, non-malicious message that looks slightly suspicious but is actually safe. Include 0 red flags. Output as JSON matching this schema: {id, type, difficulty, sender, content, correctAnswer, redFlags\[\], explanation, safetyTip}. The explanation should teach users why this message is actually safe and what distinguishes it from a scam.

**Weakness Coach Prompt:**

> The user just completed a ScamIQ game. They got the following wrong: \[LIST OF WRONG SCENARIOS WITH TYPE AND RED FLAGS\]. Analyze their mistakes and provide: 1) A 1-sentence summary of their biggest weakness pattern. 2) Two specific, actionable tips to improve. 3) An encouraging closing line. Keep the tone fun and supportive, like an arcade coach. Maximum 80 words total.

### Color Palette

| Color | Hex | Usage |
| --- | --- | --- |
| Background | #0a0a0f | Main background |
| Surface | #1a1a2e | Card backgrounds, elevated surfaces |
| Neon Green | #00ff88 | Correct answers, Safe button, positive states |
| Electric Blue | #00d4ff | Accents, links, highlights |
| Warning Orange | #ff6b35 | Suspicious button, caution states |
| Danger Red | #ff3366 | Scam button, incorrect answers, red flags |
| Text Primary | #ffffff | Headings, primary text |
| Text Secondary | #a0a0b0 | Body text, descriptions |
| Streak Gold | #ffd700 | Streak counter, bonus points |

### Demo Video Script Outline (Under 3 Minutes)

1. Hook (15 seconds): "Everyone with a phone faces scams every day. But most people never get trained to spot them. That is why I built ScamIQ."
2. Problem (20 seconds): "Scam training today is locked inside corporate security programs. Everyday people, students, parents, freelancers, are on their own. And scammers are getting smarter with AI."
3. Product demo (90 seconds): Show landing page. Click Play. Play 3-4 rounds showing different scenario types. Get one wrong intentionally to show feedback. Finish game. Show ScamIQ score and badge. Show share card. Show AI Challenge Pack. Show AI Weakness Coach.
4. How it was built (20 seconds): "I built ScamIQ solo in 24 hours using Replit Agent. Agent scaffolded the app, helped generate 30 scam scenarios, built the scoring engine, and polished the arcade UI. AI APIs power dynamic challenge generation and personalized coaching."
5. Close (15 seconds): "ScamIQ: can you spot the scam before it spots you? Try it now."

### Submission Checklist

* [ ] App is deployed and publicly accessible on Replit



* [ ] Quick Play mode works end-to-end (8 rounds, feedback, score, share)



* [ ] Share card generates and exports correctly on mobile and desktop



* [ ] AI Challenge Pack works or falls back gracefully



* [ ] Demo video recorded (under 3 minutes)



* [ ] Social media post published with project link



* [ ] Buildathon submission form completed with project link and social post link



