# Theme Switching Implementation Plan

## Overview
Implement a light/dark theme toggle for the Qnuru pre-launch website with consistent design patterns and user preference persistence.

---

## 1. Technical Architecture

### 1.1 Theme Context (React Context API)
**File**: `src/contexts/ThemeContext.tsx`

```tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('qnuru-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('qnuru-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

---

## 2. Color Scheme Definition

### 2.1 Tailwind Configuration Update
**File**: `tailwind.config.js`

Add dark mode color tokens to maintain brand consistency:

```js
colors: {
  // Brand Colors (light mode defaults)
  brand: {
    black: '#000000',
    blue: '#0B3D91',
    green: '#00BFA6',
  },
  canvas: {
    light: '#F4F4F2',
    dark: '#0A0A0A',
  },
  
  // Semantic dark mode tokens
  text: {
    primary: '#000000',     // light mode
    secondary: '#666666',
    muted: '#777777',
    'primary-dark': '#FFFFFF',    // dark mode
    'secondary-dark': '#B3B3B3',
    'muted-dark': '#8C8C8C',
  },
  
  bg: {
    primary: '#FFFFFF',     // light mode
    secondary: '#F4F4F2',
    'primary-dark': '#0F0F0F',    // dark mode
    'secondary-dark': '#1A1A1A',
  },
}
```

### 2.2 Dark Mode Color Mapping
| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Backgrounds** | | |
| Primary | `#FFFFFF` | `#0F0F0F` |
| Secondary | `#F4F4F2` | `#1A1A1A` |
| Cards | `#FFFFFF` | `#171717` |
| **Text** | | |
| Headings | `#000000` | `#FFFFFF` |
| Body | `#666666` | `#B3B3B3` |
| Muted | `#777777` | `#8C8C8C` |
| **Brand Colors** | | |
| Blue | `#0B3D91` | `#2563EB` (brighter for dark bg) |
| Green | `#00BFA6` | `#10D9C1` (brighter for dark bg) |
| **Borders** | | |
| Default | `#E5E5E5` | `#2A2A2A` |
| Subtle | `#F0F0F0` | `#222222` |

---

## 3. Theme Toggle Component

### 3.1 Toggle Button Component
**File**: `src/components/ThemeToggle.tsx`

```tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon className="w-4 h-4 text-blue-400" />
        )}
      </span>
    </button>
  );
};
```

### 3.2 Placement Strategy
**Primary Location**: Navigation bar (Hero section)
- Desktop: Next to navigation links (right side before nav items)
- Mobile: In mobile menu or as fixed position icon

**Alternative Locations**:
- Footer (for redundancy)
- Fixed bottom-right corner (always accessible)

---

## 4. Implementation Across Sections

### 4.1 Utility Class Pattern
Use Tailwind's `dark:` modifier for consistent theming:

```tsx
// Before (light mode only)
<div className="bg-white text-black">

// After (responsive to theme)
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

### 4.2 Section-by-Section Breakdown

#### Hero Section
```tsx
<section className="bg-white dark:bg-gray-900 transition-colors duration-300">
  <h1 className="text-black dark:text-white">Build Better. Scale Faster.</h1>
  <p className="text-gray-600 dark:text-gray-300">...</p>
  <div className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
    {/* Countdown boxes */}
  </div>
</section>
```

#### CoreServices Section
```tsx
// Service cards with dark mode
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <h3 className="text-black dark:text-white">Service Name</h3>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

#### Buttons
```tsx
// Primary CTA (brand green)
<button className="bg-brand-green dark:bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400">
  Get Started
</button>

// Secondary CTA
<button className="bg-transparent border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
  Learn More
</button>
```

---

## 5. Special Considerations

### 5.1 Logo Handling
**Option A**: SVG with CSS color control
```tsx
<img 
  src="/images/logo.svg" 
  alt="Qnuru Logo"
  className="h-16 brightness-0 dark:brightness-100 transition-all duration-300"
/>
```

**Option B**: Separate logo files
```tsx
const { theme } = useTheme();
<img 
  src={theme === 'light' ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
  alt="Qnuru Logo"
/>
```

### 5.2 Brand Color Adjustments
Brand colors need slight modification in dark mode for better contrast:

```js
// In components
<span className="text-brand-blue dark:text-blue-400">
<span className="text-brand-green dark:text-green-400">
```

### 5.3 Image/Media Handling
Photos and images may need opacity adjustment:

```tsx
<img 
  className="dark:opacity-90 dark:brightness-95 transition-all"
  src="..."
/>
```

### 5.4 Shadows in Dark Mode
Shadows need to be more subtle or removed:

```tsx
<div className="shadow-lg dark:shadow-gray-900/50">
```

---

## 6. Implementation Checklist

### Phase 1: Foundation
- [ ] Create `ThemeContext.tsx` with provider and hook
- [ ] Wrap `App.tsx` with `<ThemeProvider>`
- [ ] Update `tailwind.config.js` with dark mode color tokens
- [ ] Verify `darkMode: ["class"]` is set in Tailwind config

### Phase 2: UI Components
- [ ] Create `ThemeToggle.tsx` component
- [ ] Add toggle to Hero navigation bar
- [ ] Test toggle functionality and localStorage persistence
- [ ] Add smooth transitions (`transition-colors duration-300`)

### Phase 3: Section Updates
- [ ] **Hero**: Background, text, countdown boxes, CTAs
- [ ] **CoreServices**: Card backgrounds, borders, text, icons
- [ ] **TierBundles**: Pricing cards, highlights, badges
- [ ] **HowItWorks**: Timeline elements, step cards
- [ ] **Guarantee**: Background section, icon/badge colors
- [ ] **Team**: Photo frames, card backgrounds, social icons
- [ ] **WhatYouGet**: List items, checkmarks, backgrounds
- [ ] **FinalCTA**: Form inputs, button states
- [ ] **Ecosystem**: Partner logos (opacity adjustments)

### Phase 4: Testing
- [ ] Test all sections in light mode
- [ ] Test all sections in dark mode
- [ ] Verify smooth transitions
- [ ] Check contrast ratios (WCAG AA compliance)
- [ ] Test on mobile and desktop
- [ ] Verify localStorage persistence across sessions
- [ ] Test with system preference changes

### Phase 5: Polish
- [ ] Add focus states for accessibility
- [ ] Optimize image brightness in dark mode
- [ ] Add meta tag for color-scheme: `<meta name="color-scheme" content="light dark">`
- [ ] Consider adding CSS variables in `:root` for easier maintenance
- [ ] Document dark mode patterns in codebase

---

## 7. CSS Variables Approach (Alternative/Complement)

For maximum maintainability, consider using CSS custom properties:

**File**: `src/index.css`

```css
@layer base {
  :root {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f4f4f2;
    --color-text-primary: #000000;
    --color-text-secondary: #666666;
    --color-border: #e5e5e5;
  }

  .dark {
    --color-bg-primary: #0f0f0f;
    --color-bg-secondary: #1a1a1a;
    --color-text-primary: #ffffff;
    --color-text-secondary: #b3b3b3;
    --color-border: #2a2a2a;
  }
}
```

Then in Tailwind config:
```js
colors: {
  'bg-primary': 'var(--color-bg-primary)',
  'bg-secondary': 'var(--color-bg-secondary)',
  // ...
}
```

---

## 8. Accessibility Guidelines

### WCAG Compliance
- **Contrast Ratio**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible on toggle button and interactive elements
- **Motion**: Respect `prefers-reduced-motion` for transitions

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
```tsx
<button
  onClick={toggleTheme}
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
  aria-pressed={theme === 'dark'}
>
```

---

## 9. Performance Optimizations

1. **Transition Duration**: Keep under 300ms for smooth UX
2. **Class Changes**: Use single `dark` class on root element (not individual elements)
3. **LocalStorage**: Write to storage only after theme change (already in context)
4. **Initial Load**: Prevent flash of wrong theme by loading preference synchronously

Add to `index.html` before app loads:
```html
<script>
  // Prevent flash of wrong theme
  const theme = localStorage.getItem('qnuru-theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

---

## 10. Recommended Implementation Order

1. **Day 1**: Set up ThemeContext and ThemeToggle, test basic functionality
2. **Day 2**: Update Hero, CoreServices, and TierBundles sections
3. **Day 3**: Update remaining sections (HowItWorks, Team, etc.)
4. **Day 4**: Polish transitions, test accessibility, optimize performance
5. **Day 5**: Final testing across devices and user acceptance

---

## 11. Maintenance Strategy

### Coding Standards
- **Always use Tailwind's `dark:` modifier** for new components
- **Test both themes** when adding new sections
- **Document custom dark mode decisions** in code comments
- **Keep brand color adjustments consistent** across all sections

### Future-Proofing
- Consider adding a third "auto" theme option (follows system preference)
- Plan for potential brand color evolution
- Document any hard-coded colors for easier theme updates

---

## Summary

This implementation provides:
✅ **Consistent**: Same design language in both light and dark modes  
✅ **Performant**: Minimal re-renders, smooth transitions  
✅ **Accessible**: WCAG compliant, screen reader friendly  
✅ **Persistent**: User preference saved across sessions  
✅ **Maintainable**: Clear patterns, well-documented approach  

**Estimated Development Time**: 2-3 days for full implementation and testing.
