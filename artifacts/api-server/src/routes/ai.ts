import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { GenerateScenariosBody, GenerateCoachingBody } from "@workspace/api-zod";

const router = Router();

const STATIC_SCENARIOS = [
  {
    id: "sms_001",
    type: "sms",
    category: "delivery",
    difficulty: "easy",
    sender: "ParcelZone",
    content: "ParcelZone: Your package is on hold. Confirm address within 2 hours or it will be returned: parcelzone-track.support",
    correctAnswer: "scam",
    redFlags: ["Urgency deadline", "Unofficial domain", "Asks for personal info"],
    explanation: "Legitimate couriers do not pressure you to confirm addresses through unknown links within short deadlines.",
    safetyTip: "Check your delivery status directly in the official courier app or website.",
  },
  {
    id: "sms_002",
    type: "sms",
    category: "bank",
    difficulty: "medium",
    sender: "NorthBank Alerts",
    content: "NorthBank: Unusual login detected from new device. If this wasn't you, secure your account now: northbank-secure-login.com/verify",
    correctAnswer: "scam",
    redFlags: ["Fear tactic", "Fake bank domain", "Pushes to click link"],
    explanation: "Banks send alerts but never ask you to verify through links in SMS. The domain is not an official bank URL.",
    safetyTip: "Call your bank's official number or log in through the banking app directly.",
  },
  {
    id: "sms_003",
    type: "sms",
    category: "toll",
    difficulty: "easy",
    sender: "TollPass",
    content: "TollPass: You have an unpaid toll of $4.75. Pay within 24 hours to avoid a $50 late fee: tollpass-pay.net",
    correctAnswer: "scam",
    redFlags: ["Small amount bait", "Urgency with penalty", "Unofficial domain"],
    explanation: "Toll scams use tiny amounts to seem believable. Real toll agencies send physical mail or use official apps.",
    safetyTip: "Check your toll account directly on the official website or app.",
  },
  {
    id: "sms_004",
    type: "sms",
    category: "delivery",
    difficulty: "medium",
    sender: "FedEx",
    content: "FedEx: Your package with tracking #7829301 is scheduled for delivery tomorrow between 9am-12pm. Track at fedex.com/track",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This uses the official FedEx domain, includes a real tracking number format, and does not ask for personal info or payment.",
    safetyTip: "Legitimate delivery updates usually include tracking numbers and link to official domains.",
  },
  {
    id: "sms_005",
    type: "sms",
    category: "crypto",
    difficulty: "hard",
    sender: "CoinVault",
    content: "CoinVault: Your wallet verification is pending. Complete KYC to avoid account suspension: coinvault-verify.io/kyc",
    correctAnswer: "scam",
    redFlags: ["Account suspension threat", "Fake crypto brand", "KYC phishing link"],
    explanation: "Fake crypto platforms create urgency around KYC to steal identity documents and login credentials.",
    safetyTip: "Only complete KYC through the official crypto exchange website you originally signed up on.",
  },
  {
    id: "sms_006",
    type: "sms",
    category: "bank",
    difficulty: "easy",
    sender: "Your Bank",
    content: "Reminder: Your credit card payment of $245.00 is due on May 10. Set up autopay at yourbank.com/autopay",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This is a standard payment reminder with a reasonable date, no urgency pressure, and an official-looking domain.",
    safetyTip: "Payment reminders from your bank are normal. Verify by logging into your banking app.",
  },
  {
    id: "email_001",
    type: "email",
    category: "job_offer",
    difficulty: "hard",
    sender: "UN Global Careers (careers@un-jobs-global.org)",
    content: "Congratulations! You have been selected for a remote UN position. Annual salary: $85,000. To proceed, submit your personal details and processing fee of $150 via the link below.",
    correctAnswer: "scam",
    redFlags: ["Unsolicited job offer", "Processing fee required", "Fake UN domain"],
    explanation: "The UN and legitimate employers never charge processing fees. Unsolicited high-salary offers from unknown senders are a classic scam.",
    safetyTip: "Real job offers never require upfront payment. Check careers.un.org for real UN positions.",
  },
  {
    id: "email_002",
    type: "email",
    category: "support",
    difficulty: "medium",
    sender: "Microsoft Account Team (no-reply@account-microsoft-security.com)",
    content: "We detected unusual sign-in activity on your Microsoft account. If this was not you, review your recent activity and secure your account immediately.",
    correctAnswer: "scam",
    redFlags: ["Fake Microsoft domain", "Fear-based urgency", "Prompts immediate action"],
    explanation: "The sender domain is not official Microsoft (microsoft.com). Scammers mimic security alerts to harvest credentials.",
    safetyTip: "Always check the sender domain carefully. Go to account.microsoft.com directly.",
  },
  {
    id: "email_003",
    type: "email",
    category: "purchase",
    difficulty: "medium",
    sender: "PayFriend (receipts@payfriend-invoices.com)",
    content: "You sent $499.99 to TechShop Pro. If you did not authorize this transaction, click here to dispute and get a refund within 24 hours.",
    correctAnswer: "scam",
    redFlags: ["Fake payment platform", "Urgency to dispute", "Unofficial domain"],
    explanation: "Scammers create fake transaction alerts to panic users into clicking phishing links for refund processes.",
    safetyTip: "Check your actual payment app or bank statement before clicking any dispute links.",
  },
  {
    id: "email_004",
    type: "email",
    category: "support",
    difficulty: "easy",
    sender: "Google (no-reply@accounts.google.com)",
    content: "Your Google Account recovery phone number was changed. If you made this change, no action is needed. Review your account at myaccount.google.com.",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This uses the official Google domain, does not create panic, and directs to the real Google account page.",
    safetyTip: "Official security alerts inform you without demanding immediate action through suspicious links.",
  },
  {
    id: "email_005",
    type: "email",
    category: "purchase",
    difficulty: "hard",
    sender: "DocuSign (notification@docusign-envelope.net)",
    content: "A document has been shared with you for signature: \"Invoice_Final_May2026.pdf\". Please review and sign by end of day. Click to view document.",
    correctAnswer: "suspicious",
    redFlags: ["Unofficial DocuSign domain", "Urgency to sign", "Unexpected document"],
    explanation: "The domain is not official DocuSign (docusign.com vs docusign-envelope.net). Unexpected documents with urgency should always be verified.",
    safetyTip: "If you were not expecting a document, contact the sender directly before clicking.",
  },
  {
    id: "email_006",
    type: "email",
    category: "others",
    difficulty: "medium",
    sender: "Netflix (info@mailer.netflix.com)",
    content: "Your Netflix subscription will renew on May 15 at $15.49/mo. To manage your plan or cancel, visit netflix.com/account.",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This uses a legitimate Netflix subdomain, references a standard renewal, and links to the official Netflix account page.",
    safetyTip: "Subscription renewal emails are normal. Verify by logging into the service directly.",
  },
  {
    id: "dm_001",
    type: "dm",
    category: "support",
    difficulty: "medium",
    sender: "InstaHelp (Instagram DM)",
    content: "Hello, this is Instagram Support. Your account has been flagged for violation. Reply with your email and password within 1 hour to avoid permanent ban.",
    correctAnswer: "scam",
    redFlags: ["Requests password", "Impersonates support via DM", "Threatens ban"],
    explanation: "Instagram never contacts users via DM for account issues, and never asks for passwords.",
    safetyTip: "Official support uses in-app notifications or email from instagram.com domain.",
  },
  {
    id: "dm_002",
    type: "dm",
    category: "others",
    difficulty: "easy",
    sender: "Unknown User (Twitter DM)",
    content: "OMG is this you in this video?? check it out: bit.ly/xK29mQ",
    correctAnswer: "scam",
    redFlags: ["Curiosity bait", "Shortened suspicious link", "Emotional manipulation"],
    explanation: "This classic social engineering trick uses shock and curiosity to get you to click a malicious link.",
    safetyTip: "Never click shortened links from unknown senders. If a friend sends it, verify with them directly.",
  },
  {
    id: "dm_003",
    type: "dm",
    category: "crypto",
    difficulty: "hard",
    sender: "CryptoMentor (Telegram DM)",
    content: "Hey! I've been making $2,000/day with this AI trading bot. I can show you how. Just deposit 0.1 ETH to start: ethwallet-start.io/join",
    correctAnswer: "scam",
    redFlags: ["Unrealistic profit claims", "Unsolicited investment offer", "Deposit to unknown wallet"],
    explanation: "Guaranteed profit claims from strangers are always scams. No legitimate trader cold-messages people to invest.",
    safetyTip: "Block and report anyone offering guaranteed crypto returns via DM.",
  },
  {
    id: "dm_004",
    type: "dm",
    category: "others",
    difficulty: "medium",
    sender: "Brand Account (Instagram DM)",
    content: "Hi! We love your content. We'd like to send you free products for a review. Can you fill out this shipping form? forms.brandcollab.co/apply",
    correctAnswer: "suspicious",
    redFlags: ["Unsolicited brand deal", "Unknown form link", "Asks for personal shipping info"],
    explanation: "While some brand collabs are real, unsolicited DMs asking for personal info through unknown forms are risky. Verify the brand account first.",
    safetyTip: "Check the brand account for verification badge, follower count, and history before sharing any personal info.",
  },
  {
    id: "dm_005",
    type: "dm",
    category: "others",
    difficulty: "easy",
    sender: "Close Friend (WhatsApp)",
    content: "Hey, did you see the photos from last weekend? I uploaded them here: photos.google.com/share/AF1Qip...",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This is from a known contact sharing a legitimate Google Photos link. The domain is official and the context is normal.",
    safetyTip: "Messages from known contacts with official links and normal context are usually safe. Still verify if anything feels off.",
  },
  {
    id: "marketplace_001",
    type: "marketplace",
    category: "purchase",
    difficulty: "medium",
    sender: "BuyerX (Facebook Marketplace)",
    content: "I already paid through escrow. Please check your email and click the confirmation link to release the funds. I need the item shipped today.",
    correctAnswer: "scam",
    redFlags: ["Fake escrow claim", "Pressure to ship immediately", "Off-platform payment"],
    explanation: "Scammers claim fake escrow payments and pressure sellers to ship before realizing no real payment was made.",
    safetyTip: "Never ship items until you see confirmed payment in your actual bank or payment app.",
  },
  {
    id: "marketplace_002",
    type: "marketplace",
    category: "purchase",
    difficulty: "hard",
    sender: "Buyer_Jane (eBay Message)",
    content: "Hi, I accidentally overpaid by $200 through PayPal. Can you refund the extra amount? I'll send you the PayPal receipt as proof.",
    correctAnswer: "scam",
    redFlags: ["Overpayment claim", "Refund request outside platform", "Fake receipt"],
    explanation: "Overpayment scams trick sellers into sending money back. The original payment is usually fake or gets reversed later.",
    safetyTip: "Never refund overpayments directly. Let the platform handle disputes.",
  },
  {
    id: "marketplace_003",
    type: "marketplace",
    category: "purchase",
    difficulty: "medium",
    sender: "Seller_Mike (Craigslist)",
    content: "The apartment is $800/month, great location. I'm currently overseas so I can't show it in person. Send a $400 deposit via Zelle to reserve it and I'll mail the keys.",
    correctAnswer: "scam",
    redFlags: ["Seller unavailable in person", "Deposit before viewing", "Irreversible payment method"],
    explanation: "Rental scams ask for deposits before you can view the property. Legitimate landlords arrange in-person viewings.",
    safetyTip: "Never send deposits for rentals you have not seen in person.",
  },
  {
    id: "marketplace_004",
    type: "marketplace",
    category: "purchase",
    difficulty: "hard",
    sender: "Buyer_Alex (Depop)",
    content: "Love the item! Can we do the transaction on PayPal instead? I'll pay extra for shipping. My PayPal is alex.buyer@gmail.com, just send me an invoice.",
    correctAnswer: "suspicious",
    redFlags: ["Wants to leave platform", "Offers to overpay", "Requests invoice to personal email"],
    explanation: "Moving transactions off-platform removes buyer/seller protections. The overpay offer is a common setup for payment reversal scams.",
    safetyTip: "Always use the platform's built-in payment system for protection.",
  },
  {
    id: "marketplace_005",
    type: "marketplace",
    category: "purchase",
    difficulty: "easy",
    sender: "Buyer_Sam (Facebook Marketplace)",
    content: "Hi, is this still available? Can I pick it up tomorrow around 3pm? I can pay cash.",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This is a normal marketplace inquiry with a local pickup offer and cash payment. No pressure, no off-platform payment.",
    safetyTip: "Local cash pickups in public places are one of the safest marketplace transaction methods.",
  },
  {
    id: "login_001",
    type: "login",
    category: "bank",
    difficulty: "hard",
    sender: "EastBank Online (eastbank-secure-portal.com)",
    content: "Your session has expired. Please log in again to continue: eastbank-secure-portal.com/login. For security, verify your identity with your SSN last 4 digits.",
    correctAnswer: "scam",
    redFlags: ["Fake bank domain", "Asks for SSN digits", "Session expiry pressure"],
    explanation: "Banks never ask for SSN through login pages linked in messages. The domain is a lookalike, not the real bank.",
    safetyTip: "Always type your bank URL directly into the browser. Never click login links from messages.",
  },
  {
    id: "login_002",
    type: "login",
    category: "support",
    difficulty: "medium",
    sender: "Apple ID (appleid-support-verify.com)",
    content: "Your Apple ID has been locked due to suspicious activity. Verify your identity to unlock: appleid-support-verify.com/unlock",
    correctAnswer: "scam",
    redFlags: ["Fake Apple domain", "Account lock fear tactic", "Verification phishing"],
    explanation: "Apple uses apple.com or icloud.com domains. Any other domain asking for Apple ID credentials is a phishing attempt.",
    safetyTip: "Go to appleid.apple.com directly to check your account status.",
  },
  {
    id: "login_003",
    type: "login",
    category: "others",
    difficulty: "medium",
    sender: "WiFi Portal (airport-free-wifi-login.com)",
    content: "Welcome to Airport Free WiFi. To connect, please sign in with your Google or Facebook account for authentication.",
    correctAnswer: "suspicious",
    redFlags: ["Requests social login on unknown portal", "Potential credential harvesting", "Non-official domain"],
    explanation: "Fake WiFi portals can harvest social media credentials. Legitimate airport WiFi usually does not require Google/Facebook login.",
    safetyTip: "Avoid entering real credentials on public WiFi portals. Use a VPN if you must connect.",
  },
  {
    id: "login_004",
    type: "login",
    category: "others",
    difficulty: "easy",
    sender: "GitHub (github.com)",
    content: "A new SSH key was added to your account. If you did this, no action is needed. Review your SSH keys at github.com/settings/keys",
    correctAnswer: "safe",
    redFlags: [],
    explanation: "This is a standard GitHub security notification using the official domain with no urgent action required.",
    safetyTip: "Security notifications that inform without demanding immediate action are usually legitimate.",
  },
  {
    id: "ai_001",
    type: "ai_voice",
    category: "family",
    difficulty: "hard",
    sender: "Unknown Number (Voice Call Transcript)",
    content: "Mom, it's me! I'm in trouble. I got arrested and I need $2,000 for bail right now. Please don't tell Dad. Can you wire it to this account immediately?",
    correctAnswer: "scam",
    redFlags: ["Emotional manipulation", "Urgency for money", "Secrecy request"],
    explanation: "AI voice cloning can mimic family members. The combination of emergency, money, and secrecy is a classic grandparent/family scam pattern.",
    safetyTip: "Hang up and call the family member directly on their known number to verify.",
  },
  {
    id: "ai_002",
    type: "ai_voice",
    category: "support",
    difficulty: "medium",
    sender: "Manager (Slack Message)",
    content: "Hey, I'm in a meeting and can't talk. I need you to buy 3 Apple gift cards ($100 each) for a client. I'll reimburse you after. Send me the codes ASAP.",
    correctAnswer: "scam",
    redFlags: ["Gift card request", "Impersonates authority", "Urgency and secrecy"],
    explanation: "Gift card requests from managers via text or chat are one of the most common business email compromise scams. No legitimate business transaction uses gift cards.",
    safetyTip: "Always verify unusual requests from managers by calling them directly or asking in person.",
  },
  {
    id: "ai_003",
    type: "ai_voice",
    category: "job_offer",
    difficulty: "hard",
    sender: "Recruiter (LinkedIn Message)",
    content: "Hi, I'm a recruiter from a Fortune 500 company. We have a remote position perfect for you: $120K/year. To proceed, please complete this background check form and provide your SSN for verification: secure-hire-check.com",
    correctAnswer: "scam",
    redFlags: ["Unsolicited high-salary offer", "SSN request via link", "Unofficial domain"],
    explanation: "Legitimate recruiters do not ask for SSN through external links before an interview. This is an identity theft attempt.",
    safetyTip: "Never share SSN or sensitive info through links from unsolicited messages. Verify the recruiter on the official company website.",
  },
  {
    id: "ai_004",
    type: "ai_voice",
    category: "others",
    difficulty: "medium",
    sender: "IT Department (Teams Message)",
    content: "Hi team, we're rolling out a mandatory security update. Please click this link to update your VPN client by end of day: internal-vpn-update.com/install",
    correctAnswer: "suspicious",
    redFlags: ["External link for internal update", "End-of-day urgency", "Unverified IT source"],
    explanation: "IT departments typically push updates through official channels or MDM, not through chat links. The domain looks unofficial.",
    safetyTip: "Verify IT requests through your company's official IT helpdesk or Slack/Teams channel.",
  },
];

function selectRoundScenarios(scenarios: typeof STATIC_SCENARIOS, count: number = 8) {
  const byType: Record<string, typeof STATIC_SCENARIOS> = {};
  for (const s of scenarios) {
    if (!byType[s.type]) byType[s.type] = [];
    byType[s.type].push(s);
  }

  const shuffled = [...scenarios].sort(() => Math.random() - 0.5);

  const selected: typeof STATIC_SCENARIOS = [];
  const usedIds = new Set<string>();

  const types = ["sms", "email", "dm", "marketplace", "login", "ai_voice"];
  for (const type of types) {
    const pool = (byType[type] || []).filter((s) => !usedIds.has(s.id));
    if (pool.length > 0) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      selected.push(pick);
      usedIds.add(pick.id);
      if (selected.length >= count) break;
    }
  }

  for (const s of shuffled) {
    if (selected.length >= count) break;
    if (!usedIds.has(s.id)) {
      selected.push(s);
      usedIds.add(s.id);
    }
  }

  const hasSafe = selected.some((s) => s.correctAnswer === "safe");
  if (!hasSafe) {
    const safePick = shuffled.find((s) => s.correctAnswer === "safe" && !usedIds.has(s.id));
    if (safePick && selected.length > 0) {
      selected[selected.length - 1] = safePick;
    }
  }

  return selected.sort(() => Math.random() - 0.5);
}

// ─── STAGE 1: Primary Generation Prompt ────────────────────────────────────
function buildGenerationPrompt(count: number): string {
  return `You are an expert in internet security and social engineering education.

TASK:
Generate a batch of ${count} JSON scenarios for a "scam detection game" (ScamIQ).

Schema:
{
  "id": "unique string e.g. ai_gen_001",
  "type": "sms | email | dm | marketplace | login | ai_voice",
  "category": "delivery | bank | job_offer | support | family | crypto | purchase | toll | others",
  "difficulty": "easy | medium | hard",
  "sender": "Realistic but fictional sender name",
  "content": "Message content (max 240 chars)",
  "correctAnswer": "scam | suspicious | safe",
  "redFlags": ["max 3 concise red flag labels"],
  "explanation": "1-2 sentences explaining why",
  "safetyTip": "1 actionable tip"
}

Constraints:
- Generate exactly ${count} scenarios
- 60% scam, 30% suspicious, 10% safe
- Include at least one of each type: sms, email, dm, marketplace, login, ai_voice
- Even mix of easy, medium, and hard difficulty
- Use modern (2025-2026) scam patterns
- Avoid real brand domains; use believable fictional brand names only
- No PII or harmful instructions
- Avoid obvious grammar errors or unrealistic phrasing
- Output JSON array ONLY (no markdown, no commentary, no code fences)`;
}

// ─── STAGE 2: Validation / QA Filter Prompt ────────────────────────────────
function buildValidationPrompt(scenarios: unknown[]): string {
  return `You are a strict QA reviewer for a scam detection educational game.

Check each scenario in the JSON array below. Return a JSON object with this exact structure:
{
  "results": [
    { "index": 0, "valid": true, "issues": [] },
    { "index": 1, "valid": false, "issues": ["uses real domain example.com", "too obvious"] }
  ]
}

Rules — mark valid: false if ANY apply:
- Missing required fields (id, type, sender, content, correctAnswer, redFlags, explanation, safetyTip)
- Uses real official brand domains as the scam URL (e.g., apple.com, google.com, paypal.com used as scam link)
- Unrealistically obvious scam (e.g., broken grammar, "Congratulations YOU WON!!!")
- Explanation label does not align with correctAnswer
- Red flags list does not match the content
- Content exceeds 280 characters
- Contains actual PII or harmful instructions

Scenarios to review:
${JSON.stringify(scenarios)}

Return JSON only, no markdown, no code fences.`;
}

// ─── Scenarios Route ────────────────────────────────────────────────────────
router.post("/scenarios", async (req, res) => {
  const parsed = GenerateScenariosBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { count } = parsed.data;
  const generateCount = count + 4; // buffer for validation failures

  try {
    // ── STAGE 1: Primary Generation ──────────────────────────────────────
    req.log.info({ count: generateCount }, "Stage 1: generating AI scenarios");

    const stage1 = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 4096,
      messages: [{ role: "user", content: buildGenerationPrompt(generateCount) }],
    });

    const raw1 = stage1.choices[0]?.message?.content ?? "[]";
    const cleaned1 = raw1.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const generated: Record<string, unknown>[] = JSON.parse(cleaned1);

    if (!Array.isArray(generated) || generated.length < Math.ceil(count * 0.5)) {
      throw new Error("Stage 1: insufficient scenarios generated");
    }

    // Schema pre-filter
    const schemaValid = generated.filter(
      (s) =>
        s.id && s.type && s.difficulty && s.sender && s.content &&
        s.correctAnswer && Array.isArray(s.redFlags) && s.explanation && s.safetyTip,
    );

    req.log.info({ total: generated.length, schemaValid: schemaValid.length }, "Stage 1 complete");

    // ── STAGE 2: QA Validation ────────────────────────────────────────────
    let finalScenarios: Record<string, unknown>[] = schemaValid;

    try {
      req.log.info({ count: schemaValid.length }, "Stage 2: running QA validation filter");

      const stage2 = await openai.chat.completions.create({
        model: "gpt-5-mini",
        max_completion_tokens: 1024,
        messages: [{ role: "user", content: buildValidationPrompt(schemaValid) }],
      });

      const raw2 = stage2.choices[0]?.message?.content ?? "{}";
      const cleaned2 = raw2.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const validation: { results: { index: number; valid: boolean; issues: string[] }[] } =
        JSON.parse(cleaned2);

      const passedIndices = new Set<number>(
        (validation.results ?? [])
          .filter((r) => r.valid !== false)
          .map((r) => r.index),
      );

      const failedCount = schemaValid.length - passedIndices.size;
      req.log.info(
        { passed: passedIndices.size, failed: failedCount },
        "Stage 2 validation complete",
      );

      // Keep only QA-passed scenarios
      const qaFiltered = schemaValid.filter((_, i) => passedIndices.has(i));
      if (qaFiltered.length >= Math.ceil(count * 0.5)) {
        finalScenarios = qaFiltered;
      } else {
        req.log.warn(
          { qaFiltered: qaFiltered.length, count },
          "Too few passed QA — using full Stage 1 output",
        );
      }
    } catch (validationErr) {
      req.log.warn({ validationErr }, "Stage 2 validation failed — using Stage 1 output as-is");
    }

    // ── Gap Fill: supplement with static if needed ────────────────────────
    const needed = count - finalScenarios.length;
    if (needed > 0) {
      req.log.info({ needed }, "Supplementing with static scenarios");
      const staticFill = selectRoundScenarios(STATIC_SCENARIOS, needed + 2).slice(0, needed);
      finalScenarios = [...finalScenarios, ...staticFill];
    }

    if (finalScenarios.length < Math.ceil(count * 0.5)) {
      throw new Error("Insufficient valid scenarios after two-stage pipeline");
    }

    res.json({ scenarios: finalScenarios.slice(0, count), source: "ai" });
  } catch (err) {
    req.log.warn({ err }, "AI scenario pipeline failed, falling back to static dataset");
    const fallback = selectRoundScenarios(STATIC_SCENARIOS, count);
    res.json({ scenarios: fallback, source: "fallback" });
  }
});

// ─── Coach Route ─────────────────────────────────────────────────────────────
router.post("/coach", async (req, res) => {
  const parsed = GenerateCoachingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { wrongAnswers, score, badge } = parsed.data;

  const FALLBACK_TIPS: Record<string, string[]> = {
    sms: [
      "Always verify SMS senders by calling the company's official number directly.",
      "Never click links in text messages — go to the official website manually.",
    ],
    email: [
      "Check the sender's email domain carefully for subtle misspellings.",
      "Legitimate companies never threaten account closure via email links.",
    ],
    dm: [
      "Platforms never ask for passwords or sensitive info via DM.",
      "Verify brand accounts by looking for official verification badges.",
    ],
    marketplace: [
      "Never send payment outside the platform's official checkout system.",
      "If a buyer or seller adds urgency pressure, it's a red flag.",
    ],
    login: [
      "Always type website URLs directly into your browser — never click login links.",
      "Check that the URL uses the exact official domain before entering credentials.",
    ],
    ai_voice: [
      "Hang up and call back on a known number if someone asks for money urgently.",
      "Gift card requests from 'authority figures' are almost always scams.",
    ],
  };

  if (wrongAnswers.length === 0) {
    res.json({
      message: "You nailed it — a perfect score! You have sharp scam detection instincts.",
      tips: [
        "Keep testing yourself with new scenarios to stay sharp.",
        "Share ScamIQ with friends and family to help them protect themselves too.",
      ],
      source: "fallback",
    });
    return;
  }

  try {
    // Weakness Coach Prompt — from ScamIQ AI Prompt Sheet
    const wrongList = wrongAnswers
      .map(
        (w) =>
          `Type: ${w.type}, Correct: ${w.correctAnswer}, You answered: ${w.userAnswer}, Red flags: ${w.redFlags.join(", ")}`,
      )
      .join("\n");

    const coachPrompt = `The user finished a ScamIQ game. Score: ${score}/100. Badge: ${badge}.

Wrong answers:
${wrongList}

Provide:
1) One-sentence summary of main weakness
2) Two actionable tips
3) Encouraging closing line

Constraints:
- Max 80 words total
- Friendly, arcade-style tone
- Avoid technical jargon
- Focus on behavior patterns, not just individual mistakes
- Output JSON: { "message": "...", "tips": ["tip1", "tip2"] }
- JSON only, no markdown, no code fences`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 512,
      messages: [{ role: "user", content: coachPrompt }],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    res.json({
      message: result.message ?? "Keep practicing — every round makes you sharper!",
      tips: Array.isArray(result.tips) ? result.tips.slice(0, 3) : [],
      source: "ai",
    });
  } catch (err) {
    req.log.warn({ err }, "AI coaching failed, using fallback");

    const typeCounts: Record<string, number> = {};
    for (const w of wrongAnswers) {
      typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
    }
    const weakestType =
      Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "sms";
    const tips = FALLBACK_TIPS[weakestType] ?? FALLBACK_TIPS.sms;

    res.json({
      message: `You tend to struggle most with ${weakestType.replace("_", " ")} scams — but awareness is the first step to protection!`,
      tips,
      source: "fallback",
    });
  }
});

export { STATIC_SCENARIOS, selectRoundScenarios };
export default router;
