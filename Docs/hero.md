# Hero Section Plan

**Goal:** Clean, minimalist, high-impact introduction that establishes "Qnuru" as a premium, results-first digital partner.

**Core Design Philosophy:** "Modern European Minimalism". Massive whitespace, soft depth, rounded containers, strong typography hierarchy.

---

## 1. Visual Style & Layout Structure
*   **Page Background:** Soft neutral off-white (`#F4F4F2` or similar) to give a warm paper feel.
*   **Container Strategy:** The Hero Content is not full-bleed. It sits inside a **floating white card** centered on the page.
    *   *Card Style:* White background (`#FFFFFF`), rounded corners (`24px`), soft shadow (`0px 20px 60px rgba(0,0,0,0.05)`), generous padding (`80px - 100px`).
    *   *Width:* Max 1400px, centered with margin.
*   **Grid Layout:** 2-Column Split.
    *   *Left:* Text content (Headline, Subhead, CTA, Countdown).
    *   *Right:* Sculptural Image/Visual (Use `hero_workspace.jpg` from public folder).

## 1.1 Brand Colors & Typography
*   **Brand Colors:**
    *   *Black:* `#000000` (Primary - text, logo, nav)
    *   *Blue:* `#0B3D91` (Accent - CTA backgrounds, highlights)
    *   *Green:* `#00BFA6` (Accent - secondary elements, illustrations)
    *   *White:* `#FFFFFF` (Cards, backgrounds)
    *   *Off-white:* `#F4F4F2` (Page canvas)
    *   *Gray (text):* `#666666` (Body copy)
    *   *Light Gray (borders):* `#E5E5E5`
*   **Typography:**
    *   *Headlines/Titles:* **Lato** (Bold 700 for H1, SemiBold 600 for H2)
    *   *Body/Paragraphs:* **Montserrat** (Regular 400 for body, Medium 500 for labels)
    *   Import from Google Fonts in `index.html`
*   **Logo:** Use `public/images/logo.svg` (navbar) and `public/images/fav.svg` (favicon)

## 2. Navigation (Internal to Hero Card)
*   **Placement:** Inside the hero card at the top, not fixed to the browser window.
*   **Layout:** Flexbox `justify-between`.
*   **Logo:** Use `logo.svg` from `public/images/`. Height ~36-40px.
*   **Links:** "SERVICES", "HOW IT WORKS", "TEAM", "CONTACT".
    *   *Style:* Uppercase, small (`13px`), tracking (`1px`), medium gray (`#777`), **Montserrat Medium**.
    *   *Hover:* Transition to black (`#000`).

## 3. Hero Content Elements
### A. Top Label (Micro-Typography)
*   **Text:** "PRE-LAUNCH ACCESS" or "DIGITAL SYSTEMS & GROWTH"
*   **Style:** Tiny (`12px`), uppercase, wide letter-spacing (`0.2em`), **Green** (`#00BFA6`), **Montserrat Bold**.

### B. Main Headline (H1)
*   **Text:** "Build Better. Scale Faster."
*   **Typography:** **Lato Bold** (primary headline font).
*   **Size:** `64px - 80px` (desktop), `40px` (mobile).
*   **Color:** Black (`#000000`).
*   **Line-Height:** Tight (`1.1`).

### C. Subheadline
*   **Text:** "We replace chaotic freelance hiring with a dedicated product team. Custom Apps, CRM, and Marketing for ambitious Kenyan businesses."
*   **Style:** Gray (`#666666`), readable size (`18px`), max-width `480px`, **Montserrat Regular**, line-height `1.7`.

### D. CTA Buttons (Pill Shape)
*   **Primary:** "Secure Early Access"
    *   *Style:* **Blue** background (`#0B3D91`), white text, fully rounded (`30px`), padding `14px 32px`, **Montserrat Medium**.
    *   *Hover:* Slight lift (`translateY(-2px)`), soft shadow.
*   **Secondary:** "View Solutions"
    *   *Style:* Transparent background, thin border (`#E5E5E5`), black text, fully rounded (`30px`), **Montserrat Medium**.
    *   *Hover:* Border transitions to **Green** (`#00BFA6`).

### E. Hero Image (Right Side)
*   **Image:** Use `hero_workspace.jpg` from the `public/` folder - shows a clean, professional workspace.
*   **Container:** Rounded background (`#F5F5F5`, `border-radius: 20px`), full height to match content column, centered.
*   **Treatment:** Ensure the image is high-contrast and professional. Apply subtle grayscale filter if needed for minimalism.

## 4. Interaction & Animation
*   **Entrance:** Elements fade in and slide up (`y: 30` -> `y: 0`) with staggered delays.
*   **Hover:** Soft lift on buttons (`translateY(-2px)`).
*   **Scroll:** The entire hero card creates a parallax effect against the page background.

## 5. Technical Implementation Specs
*   **Tailwind Config Updates:**
    *   Add logical colors: `bg-canvas` (#F4F4F2), `bg-card` (#FFFFFF).
    *   Add spacing utilities for the large gaps.
*   **CSS:** Ensure `box-shadow` is extremely subtle (5% opacity).
*   **Structure:**
    ```tsx
    <div className="bg-[#F4F4F2] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-[24px] shadow-2xl max-w-[1400px] w-full p-12 lg:p-20 grid lg:grid-cols-2 gap-16 relative overflow-hidden">
        {/* Nav Absolute Top */}
        <nav className="absolute top-10 left-10 right-10 flex justify-between items-center">...</nav>
        
        {/* Left Content */}
        <div className="flex flex-col justify-center mt-20 lg:mt-0">
            <span className="text-xs tracking-[0.2em] text-accent font-bold mb-6 block">PRE-LAUNCH ACCESS</span>
            <h1 className="text-7xl font-bold text-slate-900 leading-[1.1] mb-8">Creative.<br/>Digital.<br/>Growth.</h1>
            <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">...</p>
            <div className="flex gap-4">...Buttons...</div>
        </div>

        {/* Right Image */}
        <div className="bg-gray-50 rounded-2xl h-[500px] w-full flex items-center justify-center relative">
            {/* Sculptural 3D Element */}
        </div>
      </div>
    </div>
    ```

---

## 6. Copy Draft Alignment
**Headline:** Build Better. Scale Faster.
**Sub:** Custom digital systems for Kenyan SMEs.
**Buttons:** [ Secure Founder Rates ]  [ View Solutions ]

---

## 7. Required Elements: Countdown, CTA Accessibility, and Scroll Hint
### A. Countdown (De-emphasized, Visible)
* **Purpose:** Communicate launch urgency without stealing attention from the value proposition.
* **Placement:** Small, subtle row below the subheadline and above the CTA buttons on the left column.
* **Style:** Small rounded cards (`48-56px` square), white background (`#FFFFFF`), thin border (`#E5E5E5`), numbers in **Blue** (`#0B3D91`) bold, **Lato Bold**.
* **Copy/Label:** "Launch Offer Ends In" in small **Montserrat Regular** gray text, followed by [Days : Hours : Minutes].
* **Behavior:** Update every second via JS. If user has reduced-motion preference, do not animate number transitions.

### B. Primary CTA (Easy To Access)
* **Primary Button Text:** "Secure Early Access" (primary action).
* **Placement:** Prominent on the left column, directly below the countdown. Keep a single primary action above the fold.
* **Styling Rules:** Pill shape, `border-radius: 30px`, padding `14px 32px`, **Blue** background (`#0B3D91`), white text, **Montserrat Medium**.
* **Mobile:** Primary CTA stays within the hero card and remains the first tappable control.
* **Accessibility:** Ensure keyboard focus outline using **Green** (`#00BFA6`), focus-visible style, and `aria-describedby` linking to helper text.

### C. Secondary Action
* **Text:** "View Solutions" — low-contrast secondary button beside primary.
* **Function:** Scrolls to the `CoreServices` section (smooth scroll). This satisfies users who want details before signing up.
* **Style:** Border color `#E5E5E5`, hover transition to **Green** border (`#00BFA6`).

### D. Scroll Hint (Indicates More Below)
* **Placement:** Bottom center of the hero card (just inside the card's lower edge) or slightly overlapping the card's shadow to imply continuation.
* **Visual:** Single thin chevron icon (lucide-react `ChevronDown`) in **Green** (`#00BFA6`) with very subtle up/down motion (`translateY: 0-8px`).
* **Behavior:** On click, smooth-scrolls to the next section (`CoreServices`). Add `aria-label="Scroll to services"`.
* **Accessibility/Reduced Motion:** If `prefers-reduced-motion` is set, replace animation with a static chevron and visible text "Scroll down" in small **Montserrat** text.

### E. Implementation Notes
* Use `aria-live` for countdown updates and provide a hidden text alternative for screen readers.
* Ensure the primary CTA sends a `source="hero"` metadata field with form submissions to track conversion.
* Respect `prefers-reduced-motion` user setting for all subtle animations (fade/slide/chevron).
* Test mobile tap targets (min 44x44px) and ensure the hero card padding is not clipped on small screens.


