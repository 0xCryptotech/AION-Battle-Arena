# 🌌 Aura Mode - React Integration Guide

## Overview

Panduan lengkap untuk mengintegrasikan Aura Mode ke React frontend AION dengan Tailwind CSS.

## ✅ Setup Complete

### 1. Tailwind Configuration ✅
- ✅ Aura colors added
- ✅ Polygon colors added
- ✅ Custom shadows (aura-glow, aura-neon, poly-glow)
- ✅ Background gradients
- ✅ Animations (aura-gradient, poly-glow)

### 2. CSS Styles ✅
- ✅ `.bg-aura` - Static gradient background
- ✅ `.aura-dynamic` - Animated gradient
- ✅ `.aura-card` - Glass morphism card
- ✅ `.neon` - Neon text effect
- ✅ `.btn-aura` - Aura button style
- ✅ `.glass-card` - Polygon glass card

## 🎨 Available Tailwind Classes

### Colors

```jsx
// Aura Mode
className="bg-aura-bg-1"        // #0e001b
className="bg-aura-bg-2"        // #1a0040
className="bg-aura-bg-3"        // #29005e
className="text-aura-primary"   // #7b3fe4
className="text-aura-accent"    // #4effa1
className="text-aura-heading"   // #c3b6ff
className="text-aura-muted"     // #b8aeea

// Polygon Mode
className="bg-poly-primary"     // #9D5CFF
className="bg-poly-secondary"   // #00C8FF
className="bg-poly-accent"      // #C084FC
```

### Backgrounds

```jsx
className="bg-aura-gradient"    // Static gradient
className="aura-dynamic"        // Animated gradient
className="bg-poly-gradient"    // Polygon gradient
```

### Shadows

```jsx
className="shadow-aura-glow"    // Purple glow
className="shadow-aura-neon"    // Green neon glow
className="shadow-poly-glow"    // Polygon purple glow
```

### Animations

```jsx
className="animate-aura-gradient"  // Gradient movement
className="animate-poly-glow"      // Pulsing glow
```

## 📦 Component Examples

### Aura Card

```jsx
function AuraCard({ title, children }) {
  return (
    <div className="aura-card p-6 rounded-2xl hover:shadow-aura-neon transition-all">
      <h3 className="text-aura-heading font-semibold mb-2">{title}</h3>
      <div className="text-aura-muted">{children}</div>
    </div>
  );
}
```

### Aura Button

```jsx
function AuraButton({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="btn-aura px-6 py-3 rounded-xl font-semibold"
    >
      {children}
    </button>
  );
}
```

### Neon Stats

```jsx
function NeonStat({ label, value }) {
  return (
    <div className="aura-card p-4 rounded-xl">
      <div className="text-sm text-aura-muted">{label}</div>
      <div className="text-2xl font-bold neon">{value}</div>
    </div>
  );
}
```

### Glass Card (Polygon Style)

```jsx
function GlassCard({ children }) {
  return (
    <div className="glass-card p-6 rounded-2xl transition-all">
      {children}
    </div>
  );
}
```

## 🎯 Page Layout Example

### Aura Dashboard

```jsx
import React from 'react';

export default function AuraDashboard() {
  return (
    <div className="min-h-screen aura-dynamic">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-poly-gradient flex items-center justify-center shadow-poly-glow">
              <span className="font-bold text-white">A</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-aura-heading">
                AION Polygon
              </h1>
              <p className="text-sm text-aura-muted">
                Aura Mode Dashboard
              </p>
            </div>
          </div>
          
          <button className="btn-aura px-4 py-2 rounded-lg">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-aura-heading mb-4">
            AION on Polygon
          </h2>
          <p className="text-lg text-aura-muted max-w-2xl mx-auto">
            Experience prediction markets with Polygon scalability
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="aura-card p-6 rounded-xl">
            <div className="text-sm text-aura-muted">Total Value Locked</div>
            <div className="text-3xl font-bold neon">$2.4M</div>
          </div>
          <div className="aura-card p-6 rounded-xl">
            <div className="text-sm text-aura-muted">Active Markets</div>
            <div className="text-3xl font-bold neon">156</div>
          </div>
          <div className="aura-card p-6 rounded-xl">
            <div className="text-sm text-aura-muted">Participants</div>
            <div className="text-3xl font-bold neon">1.9K</div>
          </div>
        </div>

        {/* Market Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-aura-heading mb-4">
              Live Market
            </h3>
            <p className="text-aura-muted mb-4">BTC / USD — Next outcome</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition">
                Bullish
              </button>
              <button className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition">
                Bearish
              </button>
            </div>
          </div>

          <div className="aura-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-aura-heading mb-4">
              Recent Activity
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-aura-muted">0xA1...c3</span>
                <span className="neon">Join</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-aura-muted">0xB4...d9</span>
                <span className="text-aura-muted">Create</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-aura-muted">0xF2...e1</span>
                <span className="neon">Settle</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-aura-muted">
        © 2025 AION on Polygon — Aura Mode
      </footer>
    </div>
  );
}
```

## 🎨 Styling Patterns

### Gradient Text

```jsx
<h1 className="text-5xl font-bold bg-poly-gradient bg-clip-text text-transparent">
  AION Protocol
</h1>
```

### Hover Glow Effect

```jsx
<div className="aura-card hover:shadow-aura-neon hover:border-aura-accent transition-all duration-300">
  Content
</div>
```

### Animated Background

```jsx
<div className="min-h-screen aura-dynamic">
  {/* Your content */}
</div>
```

### Neon Badge

```jsx
<span className="neon text-sm font-semibold px-3 py-1 rounded-full bg-aura-surface">
  Live
</span>
```

## 🔧 Customization

### Adjust Animation Speed

In `tailwind.config.js`:

```javascript
animation: {
  'aura-gradient': 'aura-gradient-move 18s ease infinite',
  // Change 18s to your preferred duration
}
```

### Custom Aura Colors

In `tailwind.config.js`:

```javascript
colors: {
  'aura-primary': '#7b3fe4',  // Change to your color
  'aura-accent': '#4effa1',   // Change to your color
}
```

### Add New Glow Effect

In `index.css`:

```css
.custom-glow {
  box-shadow: 0 0 20px rgba(123, 63, 228, 0.5);
}
```

## 📱 Responsive Design

### Mobile-First Approach

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Hide on Mobile

```jsx
<div className="hidden md:block">
  {/* Desktop only content */}
</div>
```

### Mobile Menu

```jsx
<nav className="md:hidden">
  {/* Mobile navigation */}
</nav>
```

## 🎯 Best Practices

### Performance
- ✅ Use `will-change` for animated elements
- ✅ Limit backdrop-filter usage
- ✅ Optimize gradient animations
- ✅ Use CSS transforms for smooth animations

### Accessibility
- ✅ Maintain high contrast ratios
- ✅ Provide text alternatives
- ✅ Support keyboard navigation
- ✅ Test with screen readers

### Code Organization
- ✅ Create reusable components
- ✅ Use Tailwind @apply for common patterns
- ✅ Keep styles consistent
- ✅ Document custom classes

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. View Aura Mode

Open http://localhost:3002 and see the Aura-styled components!

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev/)
- [Polygon Branding](https://polygon.technology/brand-resources)

## ✅ Checklist

- [x] Tailwind config updated
- [x] CSS styles added
- [x] Color palette defined
- [x] Animations configured
- [x] Component examples provided
- [x] Documentation complete

## 🎉 Ready to Use!

Aura Mode is now fully integrated into your React frontend. Start building beautiful, futuristic interfaces with Polygon branding! 🌌✨
