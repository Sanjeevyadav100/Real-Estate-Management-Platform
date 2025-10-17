# Real Estate Management Application - Design Guidelines

## Design Approach: Reference-Based
**Primary Inspiration:** Zillow, Redfin, and Airbnb for property presentation; Linear for dashboard interfaces
**Rationale:** Real estate applications require emotional engagement through visual appeal while maintaining professional management capabilities

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 85% 25% (Deep Professional Blue)
- Secondary: 220 15% 96% (Light Gray Background)
- Accent: 145 65% 45% (Trust Green for CTAs and success states)
- Text Primary: 220 20% 15%
- Text Secondary: 220 10% 45%
- Border: 220 15% 88%

**Dark Mode:**
- Primary: 220 85% 65% (Lighter Blue)
- Secondary: 220 20% 12% (Dark Background)
- Accent: 145 55% 55% (Softer Green)
- Text Primary: 220 10% 95%
- Text Secondary: 220 5% 65%
- Border: 220 15% 25%

### B. Typography
- **Headings:** Inter or DM Sans (600-700 weight)
- **Body:** Inter (400-500 weight)
- **Size Scale:** text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px), text-4xl (36px)

### C. Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, p-6, gap-4
- Section spacing: py-12, py-16, py-24

### D. Component Library

**Navigation:**
- Top navigation bar with logo, search, user menu (sticky on scroll)
- Admin: Sidebar navigation (260px width) with icon + label pattern
- Breadcrumbs for deep navigation

**Property Cards:**
- Large image (aspect-ratio-4/3) with hover scale effect
- Overlay gradient for price and quick actions
- Badge system for property status (For Sale, Sold, Pending)
- Grid layout: 1 col mobile, 2 cols tablet, 3-4 cols desktop

**Dashboard Components:**
- Stats cards with icons, values, and trend indicators
- Data tables with sortable columns, filters, row actions
- Property management cards with thumbnail, details, action menu

**Forms:**
- Multi-step property creation form with progress indicator
- Image upload with drag-drop and preview grid
- Rich text editor for property descriptions
- Form sections with clear visual separation

**Authentication:**
- Split-screen layout: Form on left, brand imagery on right
- Clean, minimal forms with social login options
- Floating labels for inputs

**Modals & Overlays:**
- Property detail modal (full-screen on mobile, centered on desktop)
- Confirmation dialogs with clear action hierarchy
- Image lightbox gallery for property photos

### E. Images

**Hero Section (Public Landing):**
- Full-width hero image (1920x800px) showing luxury property exterior
- Overlay: Dark gradient (opacity 40%) for text readability
- Centered search bar with location, property type, price range filters
- Headline: "Find Your Dream Property" (text-5xl, bold, white)

**Property Listings:**
- High-quality property photos (minimum 1200x800px)
- First image: Exterior/main view
- Gallery: 6-12 images (interior, exterior, amenities)
- Thumbnail grid below main image

**Dashboard:**
- Empty state illustrations for no properties
- Small property thumbnails (200x150px) in management lists
- User avatars (circular, 40px diameter)

**Additional Images:**
- Login/Register pages: Modern building/skyline background (right side, 50% width)
- About section: Team photos or office imagery (if applicable)
- Trust badges/partner logos in footer

## Page-Specific Designs

**Public Homepage:**
- Hero with search (described above)
- Featured properties grid (3-4 columns)
- Property type categories with image cards
- Stats section (properties sold, happy clients) - 4 columns
- Recent listings carousel
- CTA section with agent contact

**Property Detail Page:**
- Image gallery with main image + thumbnail strip
- Property info card (fixed on scroll): price, beds, baths, sqft, actions
- Tabbed content: Overview, Features, Location (map), Virtual Tour
- Similar properties section
- Contact agent form

**User Dashboard:**
- Welcome header with user stats
- Saved properties grid
- Recent searches/alerts
- Profile settings access

**Admin Dashboard:**
- Analytics overview (4 stat cards: total properties, active listings, users, revenue)
- Recent activity timeline
- Property management table with quick actions
- User management section

## Interaction Patterns
- Smooth hover transitions (duration-200)
- Image zoom on property card hover (scale-105)
- Skeleton loaders for data fetching
- Toast notifications for actions (top-right)
- Infinite scroll for property listings (with "Load More" fallback)