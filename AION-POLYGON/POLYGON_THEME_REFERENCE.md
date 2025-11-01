# 🎨 Polygon Theme Quick Reference

## Color Palette

### 🌑 Dark Mode (Vibrant & Futuristic)

```css
/* Primary Colors */
--primary: #9D5CFF;        /* Vibrant Polygon Purple */
--secondary: #00C8FF;      /* Glowing Cyan-Blue */
--accent: #C084FC;         /* Bright Lavender */

/* Backgrounds */
--background: #0C0118;     /* Deep Purple-Black */
--surface: #1B0A30;        /* Dark Glowing Layer */
--card-bg: rgba(27, 10, 48, 0.65);

/* Text */
--text: #F1E9FF;           /* Soft White */
--text-muted: #BDA6E8;     /* Violet-Gray */

/* Status */
--success: #2DD4BF;
--error: #F87171;
--warning: #FBBF24;
```

### ☀️ Light Mode (Clean & Professional)

```css
/* Primary Colors */
--primary: #8247E5;        /* Polygon Main Purple */
--secondary: #A066FF;      /* Brighter Purple */
--accent: #00B8FF;         /* Energetic Neon Blue */

/* Backgrounds */
--background: #F8F7FF;     /* Soft Off-White */
--surface: #FFFFFF;        /* Pure White */
--card-bg: rgba(255, 255, 255, 0.95);

/* Text */
--text: #1A103D;           /* Dark Violet */
--text-muted: #6B5BA3;     /* Soft Violet-Gray */

/* Status */
--success: #22C55E;
--error: #EF4444;
--warning: #FACC15;
```

## Gradients

### Dark Mode
```css
/* Primary Gradient */
background: linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%);

/* Card Gradient */
background: linear-gradient(135deg, 
    rgba(157, 92, 255, 0.15) 0%, 
    rgba(0, 200, 255, 0.15) 100%
);

/* Glow Gradient */
background: linear-gradient(135deg, 
    rgba(157, 92, 255, 0.3) 0%, 
    rgba(0, 200, 255, 0.3) 100%
);
```

### Light Mode
```css
/* Primary Gradient */
background: linear-gradient(135deg, #8247E5 0%, #00B8FF 100%);

/* Card Gradient */
background: linear-gradient(135deg, 
    rgba(130, 71, 229, 0.08) 0%, 
    rgba(0, 184, 255, 0.08) 100%
);
```

## Shadows & Effects

### Dark Mode
```css
/* Glow Shadow */
box-shadow: 0 0 20px rgba(157, 92, 255, 0.5);

/* Soft Shadow */
box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);

/* Card Shadow */
box-shadow: 0 4px 20px rgba(157, 92, 255, 0.2);

/* Text Glow */
text-shadow: 0 0 8px rgba(157, 92, 255, 0.6);

/* Glass Effect */
background: rgba(27, 10, 48, 0.65);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

### Light Mode
```css
/* Soft Shadow */
box-shadow: 0 4px 12px rgba(130, 71, 229, 0.15);

/* Card Shadow */
box-shadow: 0 4px 12px rgba(130, 71, 229, 0.12);

/* Glass Effect */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: 1px solid #E0D7FA;
```

## Component Styles

### Glass Card (Dark)
```css
.glass-card {
    background: rgba(27, 10, 48, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(130, 71, 229, 0.2);
    transition: all 0.3s ease;
}

.glass-card:hover {
    box-shadow: 0 0 30px rgba(157, 92, 255, 0.4);
    border: 1px solid rgba(157, 92, 255, 0.4);
    transform: translateY(-2px);
}
```

### Glass Card (Light)
```css
.glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #E0D7FA;
    box-shadow: 0 4px 12px rgba(130, 71, 229, 0.15);
}

.glass-card:hover {
    box-shadow: 0 8px 20px rgba(130, 71, 229, 0.25);
    border: 1px solid rgba(130, 71, 229, 0.3);
}
```

### Glow Text (Dark Only)
```css
.glow-text {
    text-shadow: 0 0 8px rgba(157, 92, 255, 0.6);
}
```

### Button Primary
```css
/* Dark Mode */
.btn-primary {
    background: linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%);
    color: #F1E9FF;
    box-shadow: 0 0 20px rgba(157, 92, 255, 0.5);
}

/* Light Mode */
.btn-primary {
    background: linear-gradient(135deg, #8247E5 0%, #00B8FF 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(130, 71, 229, 0.15);
}
```

## Animations

### Polygon Glow
```css
@keyframes polygon-glow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(157, 92, 255, 0.3);
    }
    50% {
        box-shadow: 0 0 30px rgba(157, 92, 255, 0.6);
    }
}

.animate-glow {
    animation: polygon-glow 3s ease-in-out infinite;
}
```

### Float Animation
```css
@keyframes float {
    0%, 100% {
        transform: translateY(0px) translateX(0px);
    }
    50% {
        transform: translateY(-20px) translateX(20px);
    }
}
```

## Usage Examples

### Hero Section (Dark)
```html
<div class="glass-card animate-glow">
    <h1 class="glow-text">AION Protocol</h1>
    <p>Decentralized AI Prediction Market</p>
</div>
```

### Stats Card (Dark)
```html
<div class="glass-card">
    <div class="text-muted">Total Value Locked</div>
    <div class="text-primary glow-text">$2.4M</div>
</div>
```

### Button (Both Modes)
```html
<button class="btn-primary">
    Connect Wallet
</button>
```

## Tailwind Config

Add to `tailwind.config.js`:

```javascript
module.exports = {
    theme: {
        extend: {
            colors: {
                // Dark Mode
                'poly-primary': '#9D5CFF',
                'poly-secondary': '#00C8FF',
                'poly-accent': '#C084FC',
                'poly-bg-dark': '#0C0118',
                'poly-surface-dark': '#1B0A30',
                'poly-text-dark': '#F1E9FF',
                'poly-muted-dark': '#BDA6E8',
                
                // Light Mode
                'poly-primary-light': '#8247E5',
                'poly-secondary-light': '#A066FF',
                'poly-accent-light': '#00B8FF',
                'poly-bg-light': '#F8F7FF',
                'poly-surface-light': '#FFFFFF',
                'poly-text-light': '#1A103D',
                'poly-muted-light': '#6B5BA3',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(157, 92, 255, 0.5)',
                'glow-soft': '0 0 15px rgba(0, 200, 255, 0.4)',
                'poly': '0 4px 12px rgba(130, 71, 229, 0.15)',
            },
            backdropBlur: {
                'glass': '12px',
            }
        }
    }
}
```

## JavaScript Theme Toggle

```javascript
// Get current theme
const theme = getCurrentTheme();

// Toggle theme
toggleTheme();

// Check theme name
if (theme.name === 'dark') {
    // Dark mode specific code
}

// Access theme colors
console.log(theme.colors.primary); // '#9D5CFF' or '#8247E5'
```

## Best Practices

### Dark Mode
- ✅ Use glow effects for emphasis
- ✅ Add text-shadow on headings
- ✅ Use glass morphism for cards
- ✅ Animate glow on hover
- ✅ Keep contrast high (WCAG AAA)

### Light Mode
- ✅ Use subtle shadows
- ✅ Keep backgrounds clean
- ✅ Use borders for definition
- ✅ Avoid harsh contrasts
- ✅ Maintain readability

### Both Modes
- ✅ Smooth transitions (0.3s)
- ✅ Consistent spacing
- ✅ Polygon purple always primary
- ✅ Accessible contrast ratios
- ✅ Mobile-optimized

## Quick Copy-Paste

### Dark Mode Card
```html
<div style="
    background: rgba(27, 10, 48, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(157, 92, 255, 0.2);
    padding: 1.5rem;
    border-radius: 1rem;
">
    Your content here
</div>
```

### Light Mode Card
```html
<div style="
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #E0D7FA;
    box-shadow: 0 4px 12px rgba(130, 71, 229, 0.15);
    padding: 1.5rem;
    border-radius: 1rem;
">
    Your content here
</div>
```

### Gradient Button
```html
<button style="
    background: linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%);
    color: #F1E9FF;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 20px rgba(157, 92, 255, 0.5);
    cursor: pointer;
">
    Click Me
</button>
```

---

**Pro Tip**: Dark mode uses more vibrant colors (#9D5CFF) while light mode uses slightly muted versions (#8247E5) for better readability!
