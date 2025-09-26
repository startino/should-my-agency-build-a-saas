# SaaS for Agencies - Slide Deck

A beautiful slide deck presentation for SaaS development services targeting digital agencies generating $1M+/year.

## 🚀 Features

- 14 engaging slides covering the SaaS transformation journey
- Smooth navigation (arrow keys, mouse clicks, touch swipes)
- Beautiful dark theme with animated gradient backgrounds
- Responsive design for all devices
- Built with Svelte + Vite + TailwindCSS

## 📋 Slides Overview

1. **Transform Your Agency** - Introduction and value proposition
2. **The $75k+ Agency Dilemma** - Common challenges agencies face
3. **The Million-Dollar Opportunity** - What SaaS can achieve
4. **Why Agencies Choose Us** - Our competitive advantages
5. **Case Study - MarketFlow Digital** - $120k/month agency success
6. **Case Study - GrowthLab Agency** - $95k/month agency success
7. **Your SaaS Investment** - Pricing and what's included
8. **Why You + Why Us** - Partnership value proposition
9. **Your ROI Projection** - 12-month financial forecast
10. **Beyond Year 1** - Long-term benefits
11. **Your Proven Path to SaaS** - 3-phase implementation
12. **Secure Your SaaS Development** - Limited availability
13. **Ready to Transform?** - Call-to-action
14. **About Your Team** - Our expertise and approach

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Cloudflare Pages

This site is optimized for Cloudflare Pages deployment:

1. **Build Command:** `npm run build`
2. **Build Output Directory:** `dist`
3. **Framework Preset:** Vite (Static)

### Manual Deployment Steps

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** > **Create application** > **Pages**
3. Connect to Git and select this repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Framework preset:** Vite
5. Save and Deploy

## 📱 Navigation

- **Arrow Keys:** Left/Right to navigate slides
- **Mouse:** Click left/right sides of the screen
- **Touch:** Swipe left/right on mobile devices
- **Dots:** Click slide indicators at the bottom

## 🎨 Customization

The slide content is hardcoded in `src/lib/components/Slider.svelte`. Each slide is defined in a `{#if index === X}` block with its own content and styling.

## 📄 License

This project is for demonstration purposes.
