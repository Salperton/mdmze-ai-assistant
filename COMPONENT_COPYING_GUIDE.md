# Component Copying Guide

## Method 1: Browser Dev Tools Extraction

### Step 1: Extract Component Styles
1. Go to your MDMZE website
2. Right-click on any component you want to copy
3. Select "Inspect Element"
4. In the Elements tab, right-click on the element
5. Select "Copy" → "Copy styles"

### Step 2: Use the Component Extractor Script
1. Open browser console (F12)
2. Copy and paste the content from `component-extractor.js`
3. Run it to get detailed component information
4. Use the output to recreate components exactly

## Method 2: Manual Component Recreation

### For Buttons:
```jsx
// Extract from your website:
// 1. Right-click button → Inspect
// 2. Copy all CSS properties
// 3. Create component with exact styles

<button 
  style={{
    backgroundColor: 'rgb(24, 64, 46)', // Your exact color
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'Figtree, sans-serif',
    // ... all other properties
  }}
>
  Button Text
</button>
```

### For Cards:
```jsx
<div 
  style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgb(229, 231, 235)',
    // ... other properties
  }}
>
  Card Content
</div>
```

## Method 3: Using Component Libraries

### Install Popular Libraries:
```bash
# Shadcn/ui (Recommended)
npx shadcn-ui@latest init

# Headless UI
npm install @headlessui/react @heroicons/react

# Material UI
npm install @mui/material @emotion/react @emotion/styled

# Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled
```

### Copy from Design Systems:
1. **Shadcn/ui**: Visit https://ui.shadcn.com/
2. **Tailwind UI**: Visit https://tailwindui.com/
3. **Headless UI**: Visit https://headlessui.com/

## Method 4: Screenshot to Code Tools

### Online Tools:
- **Figma to Code**: Upload Figma designs
- **Zeplin**: Design handoff tool
- **Avocode**: Design to code conversion

### Browser Extensions:
- **CSS Peeper**: Extract styles from any website
- **ColorZilla**: Get exact colors
- **WhatFont**: Identify fonts

## Method 5: AI-Powered Component Generation

### Using AI Tools:
1. **v0.dev**: Describe component, get React code
2. **GPT-4 Vision**: Upload screenshot, get code
3. **Claude**: Describe design, get implementation

## Best Practices

### 1. Always Extract Exact Values:
- Colors: Use `rgb()` or `hex` values
- Spacing: Use exact `px` values
- Fonts: Include fallback fonts
- Shadows: Copy exact `box-shadow` values

### 2. Create Reusable Components:
```jsx
// Create base component
const MDMZEButton = ({ children, variant }) => (
  <button className={`base-styles ${variant}`}>
    {children}
  </button>
)

// Use everywhere
<MDMZEButton variant="primary">Click me</MDMZEButton>
```

### 3. Use CSS Variables:
```css
:root {
  --mdmze-primary: #18402e;
  --mdmze-secondary: #da816c;
  --mdmze-background: #f9f5ea;
}
```

### 4. Test Responsiveness:
- Check mobile, tablet, desktop
- Use browser dev tools
- Test different screen sizes

## Quick Start

1. **Extract one component** from your MDMZE website
2. **Create the component** using the extracted styles
3. **Test it** in your AI assistant
4. **Repeat** for other components
5. **Build a library** of reusable components

## Example: Copying Your Header

```jsx
// 1. Inspect your MDMZE header
// 2. Copy all styles
// 3. Create component:

const MDMZEHeader = () => (
  <header style={{
    backgroundColor: 'rgb(249, 245, 234)',
    padding: '16px 32px',
    borderBottom: '1px solid rgb(229, 231, 235)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Logo and navigation */}
    </div>
  </header>
)
```

This approach ensures pixel-perfect replication of your designs!
