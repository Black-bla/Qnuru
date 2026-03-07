# Qnuru Website Analysis & Improvement Plan

This document outlines a comprehensive analysis of the current Qnuru pre-launch website compared to industry benchmarks for high-end digital agencies and productized services.

## 1. Executive Summary

Qnuru is positioned as a "Productized Agency" (similar to **Designjoy**) offering high-ticket development and marketing services. The current site has a strong technical foundation (React, Tailwind, GSAP) and a visually distinct "dark mode/noise" aesthetic.

**Current Status:**  
- **Strengths:** Modern tech stack, clear service tiers, transparent pricing (rare for agencies), and a personal touch with the founders' section.
- **Critical Gaps:** Lack of **Social Proof** (testimonials, logos, portfolios) and **outcome-based evidence** makes it hard to build the trust required for KSh 30,000+ monthly retainers or KSh 150,000+ setups.
- **Verdict:** The site feels like a high-quality "SaaS landing page" but needs more "Agency credibility."

---

## 2. Benchmark Comparison

We compared Qnuru against top-tier benchmarks in the productized service and SaaS space:

| Feature | **Qnuru** | **Designjoy** (Gold Standard) | **Stripe/Loom** (SaaS Best Practice) |
| :--- | :--- | :--- | :--- |
| **Pricing** | ✅ Transparent (Bundles) | ✅ Single Tier Subscription | ✅ Tiered (Free/Pro/Enterprise) |
| **Visual Style** | ⚠️ Heavy Noise/Gradients | ✨ Ultra-clean, Minimal | ✨ Clean, bright, enterprise-ready |
| **Social Proof** | ❌ **None** | ✅ "Shark Tank", 75+ logos | ✅ "Used by millions", heavy logos |
| **Portfolio** | ❌ **Missing** | ✅ "Latest Works" Grid | ✅ Interactive Demos |
| **Call to Action** | ⚠️ Mixed (Waitlist vs Sales) | ✅ "See Plans" / "Subscribe" | ✅ "Start for free" |
| **Founder Trust** | ✅ Team listed | ✅ Founder-led personal brand | ❌ Faceless corporate |

---

## 3. Critical Improvements (Must-Haves)

### A. Trust & Social Proof (Highest Priority)
Users need to know you can deliver *before* they book a call or join a waitlist.
1.  **"Trusted By" Section (Even if Pre-launch):**
    *   *Action:* Add a logo strip immediately after the Hero. If you don't have company clients yet, use logos of *technologies you master* (React, AWS, Python, Google Ads) or *previous companies* the founders have worked at.
    *   *File to Edit:* `src/sections/Hero.tsx` (insert at bottom) or new component `src/sections/Logos.tsx`.

2.  **Portfolio / "Recent Work" Section:**
    *   *Observation:* You sell "Website & App" development but show no examples.
    *   *Action:* Create a **Work** section (even just 3-4 distinct projects/screenshots). If these are confidential or don't exist under Qnuru yet, create "Concept Designs" to show quality.
    *   *Placement:* Between `CoreServices` and `TierBundles`.

3.  **Testimonials / Endorsements:**
    *   *Action:* Add a carousel of quotes. If no client quotes exist, get character references from former colleagues or industry peers for the pre-launch phase.

### B. Visual & UX Polish
1.  **Reduce Visual Noise:**
    *   *Observation:* The `.noise-overlay` in `App.tsx` gives a texture, but top agencies (Designjoy, Stripe) often use cleaner, flatter backgrounds to make the *content* pop.
    *   *Recommendation:* Reduce the opacity of the noise or remove it entirely for a more "Enterprise" feel.
    *   *File:* `src/App.tsx` / `src/index.css`.

2.  **Unified CTA Strategy:**
    *   *Observation:* `Navigation` says "Join Waitlist", `Hero` leads to a contact dialog, `TierBundles` has "Get Started" buttons that open a dialog.
    *   *Recommendation:* Since it's **Pre-launch (45 days)**, focus EVERY CTA on **"Secure Early Access Pricing"**.  Change "Contact Sales" to "Lock in Founder Rates".
    *   *File:* `src/sections/Hero.tsx`, `src/sections/TierBundles.tsx`.

### C. Content & Copywriting
1.  **Outcome-Oriented Headlines:**
    *   *Current:* "Core Services", "Tier Bundles".
    *   *Improved:* "Everything you need to scale", "Simple, transparent pricing".
    *   *Reason:* Speak to the *benefit*, not the *feature*.

2.  **Clarify the Offer:**
    *   *Observation:* You mix "CRM Development" (One-off?) with "Social Media" (Retainer).
    *   *Action:* In `TierBundles`, explicitly label items as "One-time Setup" vs "Monthly Recurring" to avoid billing confusion.

---

## 5. Alignment with Company Docs (New Findings)

Based on a review of internal documentation (`Docs/About_Company/`), the following discrepancies need addressing:

### A. Pricing & Service Mismatch
*   **Observation:** The website lists "Website & App" setup starting at **KSh 10,000**, but internal strategy (`Updated service and pricing.md`) places custom builds at **KSh 40,000 - 120,000**.
*   **Risk:** You are drastically undercutting your own strategy on the public site.
*   **Action:** Update `CoreServices.tsx` and `TierBundles.tsx` to reflect the strategic pricing:
    *   *Websites:* From KSh 40,000
    *   *POS Systems:* KSh 50,000 - 180,000
    *   *School Systems:* KSh 100,000+
*   **Bundles:** Ensure the "Starter", "Growth", and "Enterprise" tiers on the site match the internal logic (Starter = Quick Launch, Growth = Scaling Operations with POS/CRM, Enterprise = Full ERP).

### B. Team Representation
*   **Observation:** The website lists 3 founders (Isaac, Mackenzie, Jotham). Internal docs mention a 4th key leader: **Ian (COO/Lead Engineer)**.
*   **Action:** Add Ian to `Team.tsx` to fully represent the leadership capabilities (especially the Engineering strength).
*   **Role Refinement:**
    *   *Isaac:* Align title to "CEO & Commercial Lead" (or similar) to emphasize business growth.
    *   *Jotham:* "CTO & Systems Architect".
    *   *Mackenzie:* "CMO & Brand Strategy".

### C. The "Academy" Differentiator
*   **Observation:** The docs highlight the Academy as a key trust builder ("Learn. Apply. Deliver.") and talent pipeline. This is unique to Qnuru but missing from the landing page.
*   **Action:** Add a "Powered by Qnuru Academy" badge or strict section in `sections/About.tsx` (or `Hero`) to explain *why* your rates are competitive (top-tier youth talent) and *why* clients can trust you (vetted training).

---

## 6. Implementation Plan (Docs)

### **Phase 1: Trust Injection (Day 1)**
- [ ] Create `src/sections/Logos.tsx` with a marquee of tech stack or partner logos.
- [ ] Add a "Founder's Note" or video in the `Team` section to humanize the brand further.

### **Phase 2: Visual Refinement (Day 2)**
- [ ] Tone down the `noise-overlay` in `index.css`.
- [ ] Add screenshots/mockups to `CoreServices.tsx` (e.g., show a phone with an app for "Mobile-first").

### **Phase 3: Conversion Optimization (Day 3)**
- [ ] Rename `FinalCTA` button to "Join Launch Waitlist" to match the urgency of the countdown.
- [ ] Add a "Why Qnuru?" comparison table (Us vs. Traditional Agencies) in `Guarantee.tsx`.
