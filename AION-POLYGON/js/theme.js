// AION Polygon Theme System
// Supports Dark Mode (default) and Light Mode

const polygonThemes = {
    aura: {
        name: "aura",
        colors: {
            primary: "#00FF9D",           // Neon green accent
            secondary: "#C9B6FF",         // Soft purple
            accent: "#00FFC3",            // Bright cyan
            background: "#0C0524",        // Deep purple-black
            surface: "#1A093E",           // Dark purple surface
            text: "#EDEBFF",              // Soft white-purple
            textMuted: "#B3A6D3",         // Muted purple
            success: "#00FF9D",
            error: "#FF6B9D",
            warning: "#FFD93D",
            cardBg: "rgba(255, 255, 255, 0.04)",
            headerGradient: "linear-gradient(135deg, #3E2D7D 0%, #00FF9D 100%)",
            glassEffect: "rgba(26, 9, 62, 0.6)",
        },
        gradients: {
            primary: "linear-gradient(135deg, #3E2D7D 0%, #00FF9D 100%)",
            secondary: "linear-gradient(135deg, #1A093E 0%, #2E1E63 100%)",
            glass: "rgba(26, 9, 62, 0.6)",
            card: "linear-gradient(135deg, rgba(0, 255, 157, 0.1) 0%, rgba(201, 182, 255, 0.1) 100%)",
            animated: "linear-gradient(135deg, #3E2D7D, #1A093E, #2E1E63, #3E2D7D, #1A093E)",
        },
        shadows: {
            glow: "0 0 15px rgba(0, 255, 157, 0.3)",
            soft: "0 0 30px rgba(0, 255, 157, 0.6)",
            card: "0 0 20px rgba(0, 255, 157, 0.15)",
            text: "0 0 10px rgba(0, 255, 157, 0.4)",
        },
        effects: {
            backdrop: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            glowBorder: "1px solid rgba(0, 255, 157, 0.5)",
        }
    },
    
    dark: {
        name: "dark",
        colors: {
            primary: "#9D5CFF",           // More vibrant Polygon purple
            secondary: "#00C8FF",         // Glowing cyan-blue
            accent: "#C084FC",            // Bright lavender accent
            background: "#0C0118",        // Deep purple-black
            surface: "#1B0A30",           // Darker glowing layer
            text: "#F1E9FF",              // Soft white (not harsh)
            textMuted: "#BDA6E8",         // Subtle violet-gray
            success: "#2DD4BF",
            error: "#F87171",
            warning: "#FBBF24",
            cardBg: "rgba(27, 10, 48, 0.65)",
            headerGradient: "linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%)",
            glassEffect: "rgba(27, 10, 48, 0.65)",
        },
        gradients: {
            primary: "linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%)",
            secondary: "linear-gradient(135deg, #1B0A30 0%, #0C0118 100%)",
            glass: "rgba(27, 10, 48, 0.65)",
            card: "linear-gradient(135deg, rgba(157, 92, 255, 0.15) 0%, rgba(0, 200, 255, 0.15) 100%)",
            glow: "linear-gradient(135deg, rgba(157, 92, 255, 0.3) 0%, rgba(0, 200, 255, 0.3) 100%)",
        },
        shadows: {
            glow: "0 0 20px rgba(157, 92, 255, 0.5)",
            soft: "0 0 15px rgba(0, 200, 255, 0.4)",
            card: "0 4px 20px rgba(157, 92, 255, 0.2)",
            text: "0 0 8px rgba(157, 92, 255, 0.6)",
        },
        effects: {
            backdrop: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            glowBorder: "1px solid rgba(157, 92, 255, 0.4)",
        }
    }
};

// Current theme state (default to Aura mode)
let currentTheme = polygonThemes.aura;

// Initialize theme from localStorage or default to dark
function initTheme() {
    const savedTheme = localStorage.getItem('aion-theme');
    if (savedTheme && polygonThemes[savedTheme]) {
        currentTheme = polygonThemes[savedTheme];
    }
    applyTheme();
    updateThemeToggleIcon();
}

// Apply theme to document
function applyTheme() {
    const root = document.documentElement;
    const theme = currentTheme;
    
    // Set CSS variables
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-muted', theme.colors.textMuted);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-error', theme.colors.error);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--gradient-primary', theme.gradients.primary);
    root.style.setProperty('--gradient-glass', theme.gradients.glass);
    root.style.setProperty('--shadow-glow', theme.shadows.glow);
    root.style.setProperty('--shadow-soft', theme.shadows.soft);
    
    // Update body background
    if (theme.name === 'aura') {
        // Animated gradient for Aura mode
        document.body.style.background = 'radial-gradient(circle at top left, #1A093E, #0C0524 60%)';
        
        // Add animated gradient overlay
        let animatedBg = document.getElementById('animated-bg');
        if (!animatedBg) {
            animatedBg = document.createElement('div');
            animatedBg.id = 'animated-bg';
            animatedBg.style.cssText = `
                position: fixed;
                inset: 0;
                background: ${theme.gradients.animated};
                background-size: 400% 400%;
                animation: gradientMove 15s ease infinite;
                z-index: -1;
                pointer-events: none;
            `;
            document.body.appendChild(animatedBg);
        }
    } else {
        // Remove animated background if exists
        const animatedBg = document.getElementById('animated-bg');
        if (animatedBg) {
            animatedBg.remove();
        }
        
        // Static dark background
        document.body.style.background = 'linear-gradient(to bottom right, #111, #1a0000, #000)';
    }
    
    document.body.style.color = theme.colors.text;
    
    // Update header (keep purple gradient for all themes)
    const header = document.querySelector('header');
    if (header) {
        header.style.background = 'linear-gradient(135deg, #0f052b 0%, #1b0045 50%, #320066 100%)';
    }
    
    // Update all cards
    updateCards();
    
    // Update stats cards
    updateStatsCards();
    
    // Update buttons
    updateButtons();
    
    // Add theme class to body
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme.name}`);
}

// Update cards styling
function updateCards() {
    const theme = currentTheme;
    
    // Battle cards with glass effect
    document.querySelectorAll('.battle-card, .prediction-card, .proposal-card').forEach(card => {
        card.style.background = theme.colors.cardBg;
        card.style.backdropFilter = theme.effects.backdrop;
        card.style.border = theme.effects.border;
        card.style.boxShadow = theme.shadows.card;
        card.style.color = theme.colors.text;
        
        // Add hover glow effect
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = theme.shadows.glow;
            this.style.border = theme.effects.glowBorder;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = theme.shadows.card;
            this.style.border = theme.effects.border;
        });
    });
    
    // Glass effect cards
    document.querySelectorAll('.bg-gradient-to-br').forEach(card => {
        card.style.background = theme.colors.cardBg;
        card.style.backdropFilter = theme.effects.backdrop;
        card.style.color = theme.colors.text;
    });
}

// Update stats cards
function updateStatsCards() {
    const theme = currentTheme;
    
    document.querySelectorAll('.bg-gradient-to-br.from-gray-900').forEach(card => {
        card.style.background = 'linear-gradient(to bottom right, #111827, #000000)';
        card.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    });
}

// Update buttons
function updateButtons() {
    const theme = currentTheme;
    
    // Primary buttons
    document.querySelectorAll('.bg-red-600, .bg-gradient-to-r.from-red-600').forEach(btn => {
        btn.style.background = 'linear-gradient(to right, #DC2626, #991B1B)';
    });
}

// Toggle theme (cycles through: aura -> dark -> aura)
function toggleTheme() {
    if (currentTheme.name === 'aura') {
        currentTheme = polygonThemes.dark;
    } else {
        currentTheme = polygonThemes.aura;
    }
    
    localStorage.setItem('aion-theme', currentTheme.name);
    applyTheme();
    updateThemeToggleIcon();
    
    // Show notification with theme name
    const themeName = currentTheme.name === 'aura' ? 'Aura' : 'Dark';
    showNotification(`Switched to ${themeName} Mode 🌌`, 'info');
}

// Update theme toggle icon
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        // Aura: sparkles, Dark: moon
        const iconName = currentTheme.name === 'aura' ? 'sparkles' : 'moon';
        icon.setAttribute('data-lucide', iconName);
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    
    // Update tooltip
    const tooltipText = currentTheme.name === 'aura' ? 'Aura Mode 🌌' : 'Dark Mode 🌑';
    themeToggle.setAttribute('title', `Current: ${tooltipText}. Click to switch.`);
}

// Get current theme
function getCurrentTheme() {
    return currentTheme;
}

// Export functions
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.getCurrentTheme = getCurrentTheme;
window.polygonThemes = polygonThemes;

// Auto-initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}
