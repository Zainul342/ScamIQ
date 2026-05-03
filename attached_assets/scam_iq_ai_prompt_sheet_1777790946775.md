# ScamIQ — AI Prompt Sheet

A structured reference for all prompts used to generate scenarios and coaching within ScamIQ. This document is designed for reproducibility, internal QA, and buildathon evaluation, demonstrating deliberate, system-level use of AI and agent workflows rather than ad hoc prompting.

## Objectives

This prompt system is designed to be:
- **Repeatable** — consistent quality across runs
- **Debuggable** — clear failure points and fixes
- **Scalable** — easy to expand the dataset
- **Explainable** — transparent to judges and collaborators

---

## 1) Primary Scenario Generation Prompt

**Purpose:** Generate realistic, balanced scenarios across channels for core gameplay.

```
You are an expert in internet security and social engineering education.

TASK:
Generate a batch of {N} JSON scenarios for a "scam detection game" (ScamIQ).

Schema:
{
  "id": "",
  "type": "[sms/email/dm/marketplace/login/ai_voice]",
  "category": "[delivery/bank/job_offer/support/family/crypto/purchase/others]",
  "difficulty": "[easy/medium/hard]",
  "sender": "Realistic but fictional sender",
  "content": "Message (max 240 chars)",
  "correctAnswer": "[scam/safe/suspicious]",
  "redFlags": ["max 3 concise flags"],
  "explanation": "1–2 sentences explaining why",
  "safetyTip": "1 actionable tip"
}

Constraints:
- 60% scam, 30% suspicious, 10% safe
- Even distribution across channels and difficulties
- Use modern (2025–2026) scam patterns
- Avoid real brand domains; use believable fictional names
- No PII or harmful instructions
- Avoid obvious grammar errors or unrealistic phrasing
- Output JSON array only (no markdown, no commentary)
```

**Notes:**
- Optimized for realism and diversity, not just correctness
- Distribution constraint prevents gameplay bias
- Ideal batch size: 10–30 scenarios

---

## 2) Safe Scenario Prompt (Hard Mode)

**Purpose:** Generate legitimate messages that appear slightly suspicious to improve decision-making accuracy.

```
Generate {N} SAFE scenarios that may look suspicious but are legitimate.
Follow the same schema.

Constraints:
- 0 red flags
- Include a clear explanation of why the message is safe
- Use realistic, non-malicious language
- Include subtle ambiguity (medium–hard difficulty)
- Avoid obvious signals that make it clearly safe
- Output JSON array only
```

**Notes:**
- Essential for balanced gameplay
- Prevents "always choose scam" behavior
- Typically ~10% of dataset

---

## 3) Weakness Coach Prompt

**Purpose:** Generate concise, personalized feedback after each game.

```
The user finished a ScamIQ game.

Wrong answers:
{LIST OF WRONG SCENARIOS WITH TYPE + RED FLAGS}

Provide:
1) One-sentence summary of main weakness
2) Two actionable tips
3) Encouraging closing line

Constraints:
- Max 80 words
- Friendly, arcade-style tone
- Avoid technical jargon
- Focus on behavior patterns, not just individual mistakes
```

**Notes:**
- Transforms the experience from quiz to learning tool
- Keeps feedback engaging and accessible

---

## 4) Validation Prompt (QA Filter)

**Purpose:** Ensure AI-generated scenarios meet quality and schema requirements.

```
You are a strict QA reviewer.

Check the following scenario JSON:
{SCENARIO}

Return:
- valid: true/false
- issues: list of problems (schema, realism, clarity)
- suggested_fix (if needed)

Rules:
- Must match schema exactly
- Must be realistic and not overly obvious
- No real domains or sensitive information
- Explanation must align with label
- Red flags must match content
```

**Notes:**
- Prevents low-quality outputs from entering the dataset
- Can be used manually or automated

---

## 5) Example Outputs

### Example 1 — Scam

```
{
  "type": "sms",
  "category": "delivery",
  "difficulty": "medium",
  "sender": "ParcelFlow",
  "content": "Delivery failed. Update your address within 2 hours: parcelflow-track.help",
  "correctAnswer": "scam",
  "redFlags": ["urgency", "fake domain", "info request"],
  "explanation": "Fake delivery scams use urgency and unofficial links to steal data.",
  "safetyTip": "Use official courier apps to track deliveries."
}
```

### Example 2 — Safe

```
{
  "type": "email",
  "category": "bank",
  "difficulty": "hard",
  "sender": "NorthCity Bank",
  "content": "We noticed a login from a new device. Review activity at your official banking app.",
  "correctAnswer": "safe",
  "redFlags": [],
  "explanation": "This is a standard alert directing users to official channels.",
  "safetyTip": "Verify alerts via official apps, not links."
}
```

### Example 3 — Suspicious

```
{
  "type": "dm",
  "category": "support",
  "difficulty": "medium",
  "sender": "ShopAssist",
  "content": "We noticed unusual activity. Please confirm your email to continue using your account.",
  "correctAnswer": "suspicious",
  "redFlags": ["unsolicited contact", "information request"],
  "explanation": "This message is not clearly malicious, but requesting information via DM is unusual.",
  "safetyTip": "Verify support requests through official channels before responding."
}
```

---

## 6) Common Failure Modes & Fixes

- **Too obvious (poor grammar, unrealistic tone)**  
  → Add constraint: "avoid obvious grammar mistakes"

- **Unrealistic sender names**  
  → Require: "believable brand-style names"

- **Missing fields**  
  → Apply validation prompt before acceptance

- **Imbalanced dataset (too many scams)**  
  → Enforce 60/30/10 distribution

- **Weak explanations**  
  → Require clear alignment between content and red flags

- **AI timeout or API failure**  
  → Fallback to static, pre-reviewed dataset (20–30 scenarios)

---

## 7) System Design Notes

- AI is used for **content generation**, not core gameplay logic
- Static dataset ensures reliability and fallback availability
- Validation layer enforces consistency and quality
- Prompt system is modular (generation, validation, coaching)
- Enables scalable expansion without redesign

---

## 8) Notes for Judges

- Scenarios are generated via structured prompts, not random outputs
- All outputs follow a strict schema and QA process
- Static dataset guarantees reliability during demo
- AI enables dynamic replayability and personalization
- Weakness Coach demonstrates adaptive, user-specific learning

---

**End of Prompt Sheet**

