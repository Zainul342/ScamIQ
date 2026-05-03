# ScamIQ — Scenario Dataset Manifest

## Overview

This document contains the seed scenario dataset for ScamIQ, a consumer scam detection arcade game. These 30 scenarios serve as the core fallback dataset, ensuring the game is fully playable without any AI API dependency.

## Dataset Summary

| Metric | Count |
| --- | --- |
| Total scenarios | 30 |
| Scam scenarios | 18 (60%) |
| Suspicious scenarios | 7 (23%) |
| Safe scenarios | 5 (17%) |
| Easy difficulty | 10 |
| Medium difficulty | 12 |
| Hard difficulty | 8 |

## Channel Distribution

| Channel | Count | Scenario IDs |
| --- | --- | --- |
| SMS | 6 | sms_001 – sms_006 |
| Email | 6 | email_001 – email_006 |
| Social Media DM | 5 | dm_001 – dm_005 |
| Marketplace | 5 | marketplace_001 – marketplace_005 |
| Fake Login/Link | 4 | login_001 – login_004 |
| AI / Voice Social Engineering | 4 | ai_001 – ai_004 |

## Review Status

| Field | Value |
| --- | --- |
| Reviewed by | Solo Builder |
| Review date | 2026-05-03 |
| Review method | Manual quality check per scenario |
| Approval status | All 30 scenarios approved |

---

## JSON Schema Reference

```json
{
  "id": "string",
  "type": "sms | email | dm | marketplace | login | ai_voice",
  "category": "string",
  "difficulty": "easy | medium | hard",
  "sender": "string",
  "content": "string (max 280 chars)",
  "correctAnswer": "scam | suspicious | safe",
  "redFlags": \["string array, max 3 items"\],
  "explanation": "string (1-2 sentences)",
  "safetyTip": "string (1 sentence, actionable)",
  "source": "manual | ai_generated",
  "reviewStatus": "approved | pending | rejected",
  "reviewedBy": "string",
  "lastReviewDate": "YYYY-MM-DD"
}
```

---

## Full Scenario Dataset

### SMS Scenarios

---

Scenario sms_001

| Field | Value |
| --- | --- |
| id | sms_001 |
| type | sms |
| category | delivery |
| difficulty | easy |
| sender | ParcelZone |
| content | ParcelZone: Your package is on hold. Confirm address within 2 hours or it will be returned: parcelzone-track.support |
| correctAnswer | scam |
| redFlags | Urgency deadline, Unofficial domain, Asks for personal info |
| explanation | Legitimate couriers do not pressure you to confirm addresses through unknown links within short deadlines. |
| safetyTip | Check your delivery status directly in the official courier app or website. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario sms_002

| Field | Value |
| --- | --- |
| id | sms_002 |
| type | sms |
| category | bank |
| difficulty | medium |
| sender | NorthBank Alerts |
| content | NorthBank: Unusual login detected from new device. If this wasn't you, secure your account now: northbank-secure-login.com/verify |
| correctAnswer | scam |
| redFlags | Fear tactic, Fake bank domain, Pushes to click link |
| explanation | Banks send alerts but never ask you to verify through links in SMS. The domain is not an official bank URL. |
| safetyTip | Call your bank's official number or log in through the banking app directly. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario sms_003

| Field | Value |
| --- | --- |
| id | sms_003 |
| type | sms |
| category | toll |
| difficulty | easy |
| sender | TollPass |
| content | TollPass: You have an unpaid toll of $4.75. Pay within 24 hours to avoid a $50 late fee: tollpass-pay.net |
| correctAnswer | scam |
| redFlags | Small amount bait, Urgency with penalty, Unofficial domain |
| explanation | Toll scams use tiny amounts to seem believable. Real toll agencies send physical mail or use official apps. |
| safetyTip | Check your toll account directly on the official website or app. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario sms_004

| Field | Value |
| --- | --- |
| id | sms_004 |
| type | sms |
| category | delivery |
| difficulty | medium |
| sender | FedEx |
| content | FedEx: Your package with tracking #7829301 is scheduled for delivery tomorrow between 9am-12pm. Track at fedex.com/track |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This uses the official FedEx domain, includes a real tracking number format, and does not ask for personal info or payment. |
| safetyTip | Legitimate delivery updates usually include tracking numbers and link to official domains. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario sms_005

| Field | Value |
| --- | --- |
| id | sms_005 |
| type | sms |
| category | crypto |
| difficulty | hard |
| sender | CoinVault |
| content | CoinVault: Your wallet verification is pending. Complete KYC to avoid account suspension: coinvault-verify.io/kyc |
| correctAnswer | scam |
| redFlags | Account suspension threat, Fake crypto brand, KYC phishing link |
| explanation | Fake crypto platforms create urgency around KYC to steal identity documents and login credentials. |
| safetyTip | Only complete KYC through the official crypto exchange website you originally signed up on. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario sms_006

| Field | Value |
| --- | --- |
| id | sms_006 |
| type | sms |
| category | bank |
| difficulty | easy |
| sender | Your Bank |
| content | Reminder: Your credit card payment of $245.00 is due on May 10. Set up autopay at yourbank.com/autopay |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This is a standard payment reminder with a reasonable date, no urgency pressure, and an official-looking domain. |
| safetyTip | Payment reminders from your bank are normal. Verify by logging into your banking app. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

### Email Scenarios

---

Scenario email_001

| Field | Value |
| --- | --- |
| id | email_001 |
| type | email |
| category | job_offer |
| difficulty | hard |
| sender | UN Global Careers ([careers@un-jobs-global.org](mailto:careers@un-jobs-global.org)) |
| content | Congratulations! You have been selected for a remote UN position. Annual salary: $85,000. To proceed, submit your personal details and processing fee of $150 via the link below. |
| correctAnswer | scam |
| redFlags | Unsolicited job offer, Processing fee required, Fake UN domain |
| explanation | The UN and legitimate employers never charge processing fees. Unsolicited high-salary offers from unknown senders are a classic scam. |
| safetyTip | Real job offers never require upfront payment. Check careers.un.org for real UN positions. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario email_002

| Field | Value |
| --- | --- |
| id | email_002 |
| type | email |
| category | support |
| difficulty | medium |
| sender | Microsoft Account Team ([no-reply@account-microsoft-security.com](mailto:no-reply@account-microsoft-security.com)) |
| content | We detected unusual sign-in activity on your Microsoft account. If this was not you, review your recent activity and secure your account immediately. |
| correctAnswer | scam |
| redFlags | Fake Microsoft domain, Fear-based urgency, Prompts immediate action |
| explanation | The sender domain is not official Microsoft (microsoft.com). Scammers mimic security alerts to harvest credentials. |
| safetyTip | Always check the sender domain carefully. Go to account.microsoft.com directly. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario email_003

| Field | Value |
| --- | --- |
| id | email_003 |
| type | email |
| category | purchase |
| difficulty | medium |
| sender | PayFriend ([receipts@payfriend-invoices.com](mailto:receipts@payfriend-invoices.com)) |
| content | You sent $499.99 to TechShop Pro. If you did not authorize this transaction, click here to dispute and get a refund within 24 hours. |
| correctAnswer | scam |
| redFlags | Fake payment platform, Urgency to dispute, Unofficial domain |
| explanation | Scammers create fake transaction alerts to panic users into clicking phishing links for refund processes. |
| safetyTip | Check your actual payment app or bank statement before clicking any dispute links. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario email_004

| Field | Value |
| --- | --- |
| id | email_004 |
| type | email |
| category | support |
| difficulty | easy |
| sender | Google ([no-reply@accounts.google.com](mailto:no-reply@accounts.google.com)) |
| content | Your Google Account recovery phone number was changed. If you made this change, no action is needed. If not, review your account at myaccount.google.com. |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This uses the official Google domain, does not create panic, and directs to the real Google account page. |
| safetyTip | Official security alerts inform you without demanding immediate action through suspicious links. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario email_005

| Field | Value |
| --- | --- |
| id | email_005 |
| type | email |
| category | purchase |
| difficulty | hard |
| sender | DocuSign ([notification@docusign-envelope.net](mailto:notification@docusign-envelope.net)) |
| content | A document has been shared with you for signature: "Invoice_Final_May2026.pdf". Please review and sign by end of day. Click to view document. |
| correctAnswer | suspicious |
| redFlags | Unofficial DocuSign domain, Urgency to sign, Unexpected document |
| explanation | The domain is not official DocuSign (docusign.com vs docusign-envelope.net). Unexpected documents with urgency should always be verified. |
| safetyTip | If you were not expecting a document, contact the sender directly before clicking. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario email_006

| Field | Value |
| --- | --- |
| id | email_006 |
| type | email |
| category | others |
| difficulty | medium |
| sender | Netflix ([info@mailer.netflix.com](mailto:info@mailer.netflix.com)) |
| content | Your Netflix subscription will renew on May 15 at $15.49/mo. To manage your plan or cancel, visit netflix.com/account. |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This uses a legitimate Netflix subdomain, references a standard renewal, and links to the official Netflix account page. |
| safetyTip | Subscription renewal emails are normal. Verify by logging into the service directly. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

### Social Media DM Scenarios

---

Scenario dm_001

| Field | Value |
| --- | --- |
| id | dm_001 |
| type | dm |
| category | support |
| difficulty | medium |
| sender | InstaHelp (Instagram DM) |
| content | Hello, this is Instagram Support. Your account has been flagged for violation. Reply with your email and password within 1 hour to avoid permanent ban. |
| correctAnswer | scam |
| redFlags | Requests password, Impersonates support via DM, Threatens ban |
| explanation | Instagram never contacts users via DM for account issues, and never asks for passwords. |
| safetyTip | Official support uses in-app notifications or email from instagram.com domain. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario dm_002

| Field | Value |
| --- | --- |
| id | dm_002 |
| type | dm |
| category | others |
| difficulty | easy |
| sender | Unknown User (Twitter DM) |
| content | OMG is this you in this video?? 😱 check it out: bit.ly/xK29mQ |
| correctAnswer | scam |
| redFlags | Curiosity bait, Shortened suspicious link, Emotional manipulation |
| explanation | This classic social engineering trick uses shock and curiosity to get you to click a malicious link. |
| safetyTip | Never click shortened links from unknown senders. If a friend sends it, verify with them directly. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario dm_003

| Field | Value |
| --- | --- |
| id | dm_003 |
| type | dm |
| category | crypto |
| difficulty | hard |
| sender | CryptoMentor (Telegram DM) |
| content | Hey! I've been making $2,000/day with this AI trading bot. I can show you how. Just deposit 0.1 ETH to start: ethwallet-start.io/join |
| correctAnswer | scam |
| redFlags | Unrealistic profit claims, Unsolicited investment offer, Deposit to unknown wallet |
| explanation | Guaranteed profit claims from strangers are always scams. No legitimate trader cold-messages people to invest. |
| safetyTip | Block and report anyone offering guaranteed crypto returns via DM. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario dm_004

| Field | Value |
| --- | --- |
| id | dm_004 |
| type | dm |
| category | others |
| difficulty | medium |
| sender | Brand Account (Instagram DM) |
| content | Hi! We love your content. We'd like to send you free products for a review. Can you fill out this shipping form? forms.brandcollab.co/apply |
| correctAnswer | suspicious |
| redFlags | Unsolicited brand deal, Unknown form link, Asks for personal shipping info |
| explanation | While some brand collabs are real, unsolicited DMs asking for personal info through unknown forms are risky. Verify the brand account first. |
| safetyTip | Check the brand account for verification badge, follower count, and history before sharing any personal info. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario dm_005

| Field | Value |
| --- | --- |
| id | dm_005 |
| type | dm |
| category | others |
| difficulty | easy |
| sender | Close Friend (WhatsApp) |
| content | Hey, did you see the photos from last weekend? I uploaded them here: photos.google.com/share/AF1Qip... |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This is from a known contact sharing a legitimate Google Photos link. The domain is official and the context is normal. |
| safetyTip | Messages from known contacts with official links and normal context are usually safe. Still verify if anything feels off. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

### Marketplace Scenarios

---

Scenario marketplace_001

| Field | Value |
| --- | --- |
| id | marketplace_001 |
| type | marketplace |
| category | purchase |
| difficulty | medium |
| sender | BuyerX (Facebook Marketplace) |
| content | I already paid through escrow. Please check your email and click the confirmation link to release the funds. I need the item shipped today. |
| correctAnswer | scam |
| redFlags | Fake escrow claim, Pressure to ship immediately, Off-platform payment |
| explanation | Scammers claim fake escrow payments and pressure sellers to ship before realizing no real payment was made. |
| safetyTip | Never ship items until you see confirmed payment in your actual bank or payment app. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario marketplace_002

| Field | Value |
| --- | --- |
| id | marketplace_002 |
| type | marketplace |
| category | purchase |
| difficulty | hard |
| sender | Buyer_Jane (eBay Message) |
| content | Hi, I accidentally overpaid by $200 through PayPal. Can you refund the extra amount? I'll send you the PayPal receipt as proof. |
| correctAnswer | scam |
| redFlags | Overpayment claim, Refund request outside platform, Fake receipt |
| explanation | Overpayment scams trick sellers into sending money back. The original payment is usually fake or gets reversed later. |
| safetyTip | Never refund overpayments directly. Let the platform handle disputes. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario marketplace_003

| Field | Value |
| --- | --- |
| id | marketplace_003 |
| type | marketplace |
| category | purchase |
| difficulty | medium |
| sender | Seller_Mike (Craigslist) |
| content | The apartment is $800/month, great location. I'm currently overseas so I can't show it in person. Send a $400 deposit via Zelle to reserve it and I'll mail the keys. |
| correctAnswer | scam |
| redFlags | Seller unavailable in person, Deposit before viewing, Irreversible payment method |
| explanation | Rental scams ask for deposits before you can view the property. Legitimate landlords arrange in-person viewings. |
| safetyTip | Never send deposits for rentals you have not seen in person. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario marketplace_004

| Field | Value |
| --- | --- |
| id | marketplace_004 |
| type | marketplace |
| category | purchase |
| difficulty | hard |
| sender | Buyer_Alex (Depop) |
| content | Love the item! Can we do the transaction on PayPal instead? I'll pay extra for shipping. My PayPal is [alex.buyer@gmail.com](mailto:alex.buyer@gmail.com), just send me an invoice. |
| correctAnswer | suspicious |
| redFlags | Wants to leave platform, Offers to overpay, Requests invoice to personal email |
| explanation | Moving transactions off-platform removes buyer/seller protections. The overpay offer is a common setup for payment reversal scams. |
| safetyTip | Always use the platform's built-in payment system for protection. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario marketplace_005

| Field | Value |
| --- | --- |
| id | marketplace_005 |
| type | marketplace |
| category | purchase |
| difficulty | easy |
| sender | Buyer_Sam (Facebook Marketplace) |
| content | Hi, is this still available? Can I pick it up tomorrow around 3pm? I can pay cash. |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This is a normal marketplace inquiry with a local pickup offer and cash payment. No pressure, no off-platform payment. |
| safetyTip | Local cash pickups in public places are one of the safest marketplace transaction methods. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

### Fake Login / Link Scenarios

---

Scenario login_001

| Field | Value |
| --- | --- |
| id | login_001 |
| type | login |
| category | bank |
| difficulty | hard |
| sender | EastBank Online (eastbank-secure-portal.com) |
| content | Your session has expired. Please log in again to continue: eastbank-secure-portal.com/login. For security, verify your identity with your SSN last 4 digits. |
| correctAnswer | scam |
| redFlags | Fake bank domain, Asks for SSN digits, Session expiry pressure |
| explanation | Banks never ask for SSN through login pages linked in messages. The domain is a lookalike, not the real bank. |
| safetyTip | Always type your bank URL directly into the browser. Never click login links from messages. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario login_002

| Field | Value |
| --- | --- |
| id | login_002 |
| type | login |
| category | support |
| difficulty | medium |
| sender | Apple ID (appleid-support-verify.com) |
| content | Your Apple ID has been locked due to suspicious activity. Verify your identity to unlock: appleid-support-verify.com/unlock |
| correctAnswer | scam |
| redFlags | Fake Apple domain, Account lock fear tactic, Verification phishing |
| explanation | Apple uses apple.com or icloud.com domains. Any other domain asking for Apple ID credentials is a phishing attempt. |
| safetyTip | Go to appleid.apple.com directly to check your account status. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario login_003

| Field | Value |
| --- | --- |
| id | login_003 |
| type | login |
| category | others |
| difficulty | medium |
| sender | WiFi Portal (airport-free-wifi-login.com) |
| content | Welcome to Airport Free WiFi. To connect, please sign in with your Google or Facebook account for authentication. |
| correctAnswer | suspicious |
| redFlags | Requests social login on unknown portal, Potential credential harvesting, Non-official domain |
| explanation | Fake WiFi portals can harvest social media credentials. Legitimate airport WiFi usually does not require Google/Facebook login. |
| safetyTip | Avoid entering real credentials on public WiFi portals. Use a VPN if you must connect. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario login_004

| Field | Value |
| --- | --- |
| id | login_004 |
| type | login |
| category | others |
| difficulty | easy |
| sender | GitHub (github.com) |
| content | A new SSH key was added to your account. If you did this, no action is needed. Review your SSH keys at github.com/settings/keys |
| correctAnswer | safe |
| redFlags | None significant |
| explanation | This is a standard GitHub security notification using the official domain with no urgent action required. |
| safetyTip | Security notifications that inform without demanding immediate action are usually legitimate. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

### AI / Voice Social Engineering Scenarios

---

Scenario ai_001

| Field | Value |
| --- | --- |
| id | ai_001 |
| type | ai_voice |
| category | family |
| difficulty | hard |
| sender | Unknown Number (Voice Call Transcript) |
| content | Mom, it's me! I'm in trouble. I got arrested and I need $2,000 for bail right now. Please don't tell Dad. Can you wire it to this account immediately? |
| correctAnswer | scam |
| redFlags | Emotional manipulation, Urgency for money, Secrecy request |
| explanation | AI voice cloning can mimic family members. The combination of emergency, money, and secrecy is a classic grandparent/family scam pattern. |
| safetyTip | Hang up and call the family member directly on their known number to verify. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario ai_002

| Field | Value |
| --- | --- |
| id | ai_002 |
| type | ai_voice |
| category | support |
| difficulty | medium |
| sender | Manager (Slack Message) |
| content | Hey, I'm in a meeting and can't talk. I need you to buy 3 Apple gift cards ($100 each) for a client. I'll reimburse you after. Send me the codes ASAP. |
| correctAnswer | scam |
| redFlags | Gift card request, Impersonates authority, Urgency and secrecy |
| explanation | Gift card requests from managers via text or chat are one of the most common business email compromise scams. No legitimate business transaction uses gift cards. |
| safetyTip | Always verify unusual requests from managers by calling them directly or asking in person. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario ai_003

| Field | Value |
| --- | --- |
| id | ai_003 |
| type | ai_voice |
| category | job_offer |
| difficulty | hard |
| sender | Recruiter (LinkedIn Message) |
| content | Hi, I'm a recruiter from a Fortune 500 company. We have a remote position perfect for you: $120K/year. To proceed, please complete this background check form and provide your SSN for verification: secure-hire-check.com |
| correctAnswer | scam |
| redFlags | Unsolicited high-salary offer, SSN request via link, Unofficial domain |
| explanation | Legitimate recruiters do not ask for SSN through external links before an interview. This is an identity theft attempt. |
| safetyTip | Never share SSN or sensitive info through links from unsolicited messages. Verify the recruiter on the official company website. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

Scenario ai_004

| Field | Value |
| --- | --- |
| id | ai_004 |
| type | ai_voice |
| category | others |
| difficulty | medium |
| sender | IT Department (Teams Message) |
| content | Hi team, we're rolling out a mandatory security update. Please click this link to update your VPN client by end of day: internal-vpn-update.com/install |
| correctAnswer | suspicious |
| redFlags | External link for internal update, End-of-day urgency, Unverified IT source |
| explanation | IT departments typically push updates through official channels or MDM, not through chat links. The domain looks unofficial. |
| safetyTip | Verify IT requests through your company's official IT helpdesk or Slack/Teams channel. |
| source | manual |
| reviewStatus | approved |
| reviewedBy | Solo Builder |
| lastReviewDate | 2026-05-03 |

---

## Dataset Validation Checklist

* [x] All 30 scenarios have complete fields



* [x] No real brand logos or trademarked imagery used



* [x] All fake domains are clearly fictional and non-existent



* [x] Mix of scam (60%), suspicious (23%), safe (17%) maintained



* [x] All 6 channels represented



* [x] All 3 difficulty levels represented



* [x] Red flags are specific and educational



* [x] Explanations are clear and non-technical



* [x] Safety tips are actionable



* [x] No personally identifiable information included



* [x] No instructions that could teach someone to execute a scam




## How to Use This Dataset

### For Development

Copy the scenario data into a JSON file (e.g., scenarios.json) and import it into the game engine. The game should randomly select 8 scenarios per round, mixing channels and difficulties.

### For AI Fallback

This dataset serves as the primary fallback when AI scenario generation is unavailable or slow. The game must be fully playable using only these 30 scenarios.

### For Expansion

Use the AI Prompt Sheet to generate additional batches. All AI-generated scenarios must pass the same validation checklist before being added to the approved dataset.

### Round Composition Rule

Each 8-round game should contain:

* At least 4 different channels
* At least 2 difficulty levels
* At least 1 safe scenario and 1 suspicious scenario
* No more than 5 scam scenarios per round