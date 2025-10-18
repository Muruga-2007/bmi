# AI-Enhanced BMI Calculator - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Apple Health's clean minimalism and Calm App's soothing aesthetic, combined with health-tech precision. The design balances medical credibility with approachable wellness aesthetics.

**Core Principle**: Transform clinical BMI calculation into an empowering health insight experience through intelligent visual design and AI-driven personalization.

---

## Color Palette

### Light Mode
- **Primary Brand**: 200 85% 45% (Vibrant Blue-Teal)
- **Secondary**: 160 75% 50% (Fresh Green)
- **Background**: 0 0% 98% (Soft White)
- **Surface**: 0 0% 100% (Pure White)
- **Text Primary**: 220 20% 15% (Deep Navy)
- **Text Secondary**: 220 15% 45% (Muted Blue-Gray)

### Dark Mode
- **Primary Brand**: 200 85% 55% (Brighter Blue-Teal)
- **Secondary**: 160 75% 55% (Vibrant Green)
- **Background**: 220 25% 8% (Rich Dark Blue)
- **Surface**: 220 20% 12% (Elevated Dark)
- **Text Primary**: 0 0% 95% (Bright White)
- **Text Secondary**: 220 10% 70% (Soft Gray)

### Gradient System
- **Hero Gradient**: Blue (200 85% 45%) → Green (160 75% 50%) at 135deg
- **Card Hover**: Subtle gradient overlays using primary at 10% opacity
- **Category Indicators**:
  - Underweight: 30 90% 60% (Warm Orange)
  - Normal: 120 70% 50% (Healthy Green)
  - Overweight: 40 95% 55% (Alert Yellow)
  - Obese: 0 85% 55% (Warning Red)

---

## Typography

**Font Stack**: 'Poppins' for headings, 'Inter' for body text (both from Google Fonts)

### Hierarchy
- **Hero Headline**: text-6xl font-bold (Poppins) - "Know Your Body. Master Your Health."
- **Section Headers**: text-4xl font-semibold (Poppins)
- **Subsection Headers**: text-2xl font-medium (Poppins)
- **Body Text**: text-base font-normal (Inter)
- **Micro Copy**: text-sm font-medium (Inter)
- **Button Text**: text-lg font-semibold (Poppins)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Element margins: mb-4, mb-6, mb-8

**Container Strategy**:
- Max width: max-w-7xl for content sections
- Hero: Full width with inner max-w-6xl
- Forms: max-w-2xl centered
- Cards: Grid with gap-6 (1 column mobile, 2-3 desktop)

---

## Component Library

### Landing Page Hero
- Full viewport height (min-h-screen) with gradient background
- Animated floating health icons (Framer Motion subtle float)
- Large centered headline with gradient text effect
- Primary CTA: Large rounded button with glow effect
- Dark mode toggle: Floating top-right with moon/sun icon

### BMI Calculator Interface
- Clean card-based layout (rounded-2xl with soft shadow)
- Input fields: Segmented controls for gender, dropdowns for age/activity, dual sliders for height/weight
- Unit toggles: cm/ft, kg/lbs with smooth transitions
- Real-time calculation display: Large BMI number with animated ring chart
- Results card: Color-coded category badge, ideal range bar, AI tips section

### Charts & Visualizations
- BMI Trend Chart: Recharts line chart with gradient fill
- Category Scale: Horizontal bar showing user position
- Color coding matches category indicators
- Smooth animations on data updates

### Navigation
- Sticky header with logo, nav links, dark mode toggle
- Mobile: Hamburger menu with slide-in drawer
- Active state: Underline with primary color

### Cards
- Elevated cards: bg-surface with shadow-lg
- Hover: Lift effect (transform scale-105) + shadow increase
- Border: Subtle gradient border on hover

### Buttons
- Primary: Gradient background, white text, rounded-full, px-8 py-4
- Secondary: Outline style with primary border
- On images: Backdrop-blur-md with semi-transparent background
- Icons: Heroicons for consistency

### Forms
- Floating labels for inputs
- Focus states: Primary color ring
- Validation: Inline error messages in red
- Submit: Disabled state with opacity and cursor changes

### Insights Page
- Dashboard layout: 2-column grid (chart + AI summary)
- AI Summary Card: Gradient border, icon header, formatted text
- Weekly Tips: Numbered list with check icons
- Data visualization: Full-width chart with legend

### About Page
- Centered single-column layout (max-w-4xl)
- Developer story: Large profile image, bio text, achievement highlights
- Technology stack: Icon grid showing React, FastAPI, AI technologies
- Call-to-action: Contact or GitHub link

### Footer
- Full-width dark background (surface color in dark mode)
- Centered text: "Designed by Fina | Empowered by AI | Built for the Future."
- Social links: Icons with hover effects
- Copyright notice

---

## Animation Guidelines

**Framer Motion Patterns** (use sparingly for polish, not distraction):
- Page transitions: Fade + slide (duration: 0.3s)
- Hero elements: Subtle float/pulse on mount
- Cards: Hover lift (scale-105, duration: 0.2s)
- Results: Number count-up animation
- Chart: Fade-in with stagger for data points
- No aggressive animations - maintain Apple Health calmness

---

## Images

### Hero Section
**Large Hero Image**: Yes - Health/wellness themed abstract imagery
- Image description: Modern, clean health technology visualization with soft gradients (blue-green tones), showing abstract body metrics or wellness icons in minimalist style
- Placement: Background with 50% opacity gradient overlay
- Treatment: Subtle blur or pattern overlay to maintain text readability

### Additional Images
- Calculator Page: Icon illustrations for gender, activity level (inline SVG preferred)
- Insights: Small accent images for health tips (vegetables, exercise, sleep icons)
- About Page: Developer photo or avatar (circular, centered above bio)

---

## Accessibility & Dark Mode
- Consistent dark mode across ALL components including inputs
- Focus indicators: 3px primary color ring
- Sufficient contrast ratios (WCAG AA minimum)
- Touch targets: Minimum 44x44px for mobile
- Alt text for all images and icons
- Semantic HTML with proper heading hierarchy

---

## Responsive Breakpoints
- Mobile: < 640px (single column, stacked layout)
- Tablet: 640px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)
- All text scales down one size on mobile

This design creates a premium health-tech experience that feels both medically credible and personally empowering.