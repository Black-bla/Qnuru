# Navigation Bar Upgrade Specification

## Overview
Modernize the navigation bar with glassmorphism effects, sticky behavior, and responsive mobile design to match the minimalist Hero section aesthetic.

---

## Design Principles

### Glassmorphism Effect
**Core Characteristics:**
- **Backdrop Blur**: `backdrop-filter: blur(12px)` for frosted glass effect
- **Semi-transparency**: `background: rgba(255, 255, 255, 0.8)` (light) / `rgba(15, 15, 15, 0.8)` (dark)
- **Subtle Border**: 1px border with semi-transparent white/gray
- **Shadow**: Soft shadow for depth without overwhelming
- **Smooth Transitions**: 300ms for scroll state changes

### Visual Hierarchy
1. **Logo**: Left-aligned, h-12 lg:h-16 (already implemented)
2. **Navigation Links**: Center/right-aligned, uppercase, letter-spaced
3. **Theme Toggle**: Right-most position
4. **Mobile Menu**: Hamburger icon, slide-in drawer

---

## Behavior Specifications

### Sticky Scroll Behavior
**Initial State (Top of Page):**
- Transparent background
- No blur effect
- Larger padding (py-6)
- No shadow

**Scrolled State (After 50px scroll):**
- Glassmorphism background with blur
- Reduced padding (py-4)
- Subtle shadow
- Smooth transform animation

**Implementation:**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Sticky Positioning
- `position: fixed` for always-visible nav
- `top: 0` with `left: 0`, `right: 0`
- `z-index: 50` to stay above content
- `transform: translateY(0)` for GPU acceleration

---

## Responsive Design

### Desktop (lg: 1024px+)
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]          Services  How It Works  Team  Contact  [🌓] │
└─────────────────────────────────────────────────────────┘
```
- Horizontal layout
- All links visible
- Theme toggle inline

### Tablet (md: 768px - 1023px)
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]                                         [🌓] [☰] │
└─────────────────────────────────────────────────────────┘
```
- Hamburger menu for navigation
- Theme toggle + hamburger on right

### Mobile (< 768px)
```
┌───────────────────────────┐
│ [Logo]            [🌓] [☰] │
└───────────────────────────┘

[Slide-in Menu when open]
┌───────────────────────────┐
│  Services                 │
│  How It Works             │
│  Team                     │
│  Contact                  │
└───────────────────────────┘
```
- Compact logo
- Mobile drawer menu
- Full-screen overlay when open

---

## Mobile Menu Implementation

### Drawer/Slide-in Menu
**Component**: Use shadcn/ui `Sheet` component (already available)

**Features:**
- Slides in from right
- Full-height overlay
- Glassmorphism background
- Close button or tap outside to dismiss
- Smooth animations

**Menu Structure:**
```tsx
<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
  <SheetContent side="right" className="glassmorphism">
    <nav className="flex flex-col gap-6 mt-12">
      {navItems.map(item => (
        <a 
          href={`#${item.id}`}
          onClick={() => {
            scrollToSection(item.id);
            setMobileMenuOpen(false);
          }}
          className="text-lg font-medium"
        >
          {item.label}
        </a>
      ))}
    </nav>
  </SheetContent>
</Sheet>
```

### Hamburger Icon
- 3-line menu icon (use lucide-react `Menu` icon)
- Animated to X when menu open (use `X` icon)
- Touch-friendly size (min 44px tap target)

---

## CSS Classes & Styles

### Glassmorphism Utility Class
**Add to `index.css`:**
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.dark .glassmorphism {
  background: rgba(15, 15, 15, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glassmorphism-strong {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
}

.dark .glassmorphism-strong {
  background: rgba(15, 15, 15, 0.95);
}
```

### Navbar States
**Top of Page:**
```tsx
className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6"
```

**Scrolled:**
```tsx
className="fixed top-0 left-0 right-0 z-50 glassmorphism shadow-lg transition-all duration-300 py-4"
```

---

## Dark Mode Considerations

### Light Mode
- Background: `rgba(255, 255, 255, 0.8)`
- Border: `rgba(255, 255, 255, 0.3)`
- Text: Black/gray
- Blur: 12px

### Dark Mode
- Background: `rgba(15, 15, 15, 0.85)`
- Border: `rgba(255, 255, 255, 0.1)`
- Text: White/light gray
- Blur: 12px
- Higher opacity for better readability

---

## Accessibility

### Keyboard Navigation
- All links and buttons keyboard accessible
- Tab order: Logo → Nav Links → Theme Toggle → Mobile Menu
- Focus indicators visible with ring

### Screen Readers
- Semantic HTML: `<nav>`, `<button>`, `<a>`
- ARIA labels: `aria-label="Main navigation"`
- Mobile menu: `aria-expanded` state
- Skip to content link (optional)

### Touch Targets
- Minimum 44x44px for mobile buttons
- Adequate spacing between links (min 8px gap)

---

## Performance Optimizations

### CSS Transforms
Use `transform` instead of `top/left` for animations:
```css
transform: translateY(0);
transition: transform 300ms ease;
```

### Scroll Listener Debouncing
Throttle scroll events to avoid excessive re-renders:
```tsx
const handleScroll = throttle(() => {
  setIsScrolled(window.scrollY > 50);
}, 100);
```

### Backdrop-Filter Support Detection
Fallback for browsers without support:
```css
@supports not (backdrop-filter: blur(12px)) {
  .glassmorphism {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

---

## Animation Specifications

### Logo & Links Fade-in
- Already implemented via GSAP in Hero

### Scroll State Transition
```css
transition-property: background, padding, shadow, backdrop-filter;
transition-duration: 300ms;
transition-timing-function: ease-in-out;
```

### Mobile Menu Animation
- Slide-in: 250ms ease-out
- Fade overlay: 200ms ease
- Menu items stagger: 50ms delay each

---

## Component Structure

### New Navbar Component
**File**: `src/components/Navigation.tsx` (separate from Hero)

**OR**

**Update**: Keep navigation in Hero but extract logic for reusability

**Recommended Approach**: Keep in Hero for single-page design consistency

---

## Implementation Checklist

### Phase 1: Core Glassmorphism
- [ ] Add glassmorphism CSS classes to `index.css`
- [ ] Add scroll listener to Hero component
- [ ] Implement conditional className based on scroll state
- [ ] Test blur effect in both light and dark modes

### Phase 2: Sticky Behavior
- [ ] Change nav from `absolute` to `fixed` positioning
- [ ] Add scroll state management (useState + useEffect)
- [ ] Apply dynamic padding and shadow based on scroll
- [ ] Verify z-index stacking (must be above all content)

### Phase 3: Mobile Menu
- [ ] Import `Sheet` component from shadcn/ui
- [ ] Add hamburger menu button (Menu/X icons from lucide-react)
- [ ] Implement mobile menu state management
- [ ] Style mobile sheet with glassmorphism
- [ ] Add smooth close on link click

### Phase 4: Responsive Breakpoints
- [ ] Hide desktop nav links on mobile (`hidden lg:flex`)
- [ ] Show hamburger only on mobile (`lg:hidden`)
- [ ] Test all breakpoints: mobile, tablet, desktop
- [ ] Verify touch targets (min 44px)

### Phase 5: Polish
- [ ] Add focus styles for keyboard navigation
- [ ] Test dark mode transitions
- [ ] Verify glassmorphism fallback for unsupported browsers
- [ ] Performance test scroll listener
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

---

## Dependencies Required

### Already Available
- ✅ shadcn/ui Sheet component
- ✅ lucide-react icons
- ✅ Tailwind CSS
- ✅ GSAP (for animations)

### To Install (if needed)
- **None required** - all features achievable with existing stack

### Browser Support
- Backdrop-filter: Chrome 76+, Safari 9+, Firefox 103+
- Fallback: Solid background for older browsers

---

## Testing Scenarios

### Visual Testing
1. **Desktop**: Navigate to site, scroll down, verify glass effect appears
2. **Mobile**: Open hamburger menu, verify drawer opens smoothly
3. **Dark Mode**: Toggle theme, verify nav adapts correctly
4. **Scroll**: Scroll up/down rapidly, check for jank or lag

### Functional Testing
1. Click all nav links, verify smooth scroll to sections
2. Mobile menu closes when link clicked
3. Theme toggle works in all states
4. Keyboard navigation functional
5. Logo click scrolls to top

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Design Reference

### Color Palette (Match Hero)
- **Black**: #000000
- **Blue**: #0B3D91 (light), #2563EB (dark)
- **Green**: #00BFA6 (light), #10D9C1 (dark)
- **Canvas**: #F4F4F2 (light), #0A0A0A (dark)
- **Text**: #000000 (light), #FFFFFF (dark)
- **Secondary Text**: #777777 (light), #B3B3B3 (dark)

### Typography (Match Hero)
- **Nav Links**: Montserrat, uppercase, tracking-wider, text-xs
- **Logo**: (SVG - no font change)

### Spacing
- **Desktop**: px-6 lg:px-12 (match Hero)
- **Mobile**: px-6
- **Vertical**: py-6 (top) → py-4 (scrolled)

---

## Expected Outcome

### User Experience
- **Desktop**: Seamless navigation that feels premium and modern
- **Mobile**: Intuitive hamburger menu that's easy to use
- **All Devices**: Smooth scroll behavior, no jank, professional polish

### Visual Quality
- Clean, minimalist aesthetic matching Hero section
- Subtle glassmorphism that enhances without distracting
- Consistent branding across light and dark modes
- Accessible and legible in all states

### Performance
- < 5ms scroll handler execution
- No layout shift when nav becomes sticky
- Smooth 60fps animations
- Minimal JavaScript overhead
