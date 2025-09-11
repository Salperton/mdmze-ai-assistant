# Webflow API Integration Guide

## 🚀 Complete Guide to Extract Your MDMZE Design Data

### **Why Use Webflow APIs?**
- ✅ **Pixel-perfect accuracy** - Get exact design tokens and styles
- ✅ **Real-time sync** - Changes in Webflow automatically update your app
- ✅ **Design system extraction** - Get all colors, fonts, spacing, components
- ✅ **Component generation** - Auto-generate React components from Webflow
- ✅ **Scalable approach** - Easy to maintain and update

## **Step 1: Get Your Webflow API Credentials**

### **API Key:**
1. Go to [Webflow Dashboard](https://webflow.com/dashboard)
2. Click on your MDMZE project
3. Go to **Project Settings** → **Integrations**
4. Click **"Generate API Key"**
5. Copy the API key

### **Site ID:**
1. In your Webflow project, go to **Project Settings** → **General**
2. Find **"Site ID"** in the project details
3. Copy the Site ID

## **Step 2: Use the Webflow Extractor**

### **Access the Extractor:**
1. Deploy your AI assistant to Vercel
2. Go to `https://your-app.vercel.app/webflow-extractor`
3. Enter your API key and Site ID
4. Click **"Extract Design Data"**

### **What You'll Get:**
- **Design Tokens**: All colors, fonts, spacing, shadows
- **Components**: All reusable components with exact styles
- **Layout Data**: Grid systems, breakpoints, containers
- **Typography**: Font families, sizes, weights, line heights

## **Step 3: Available Webflow APIs**

### **1. Designer API (Recommended)**
```javascript
// Get design tokens
const tokens = await webflowAPI.getDesignTokens()

// Get components
const components = await webflowAPI.getComponents()

// Get typography
const typography = await webflowAPI.getTypography()
```

### **2. CMS API**
```javascript
// Get content
const collections = await webflowAPI.getCollections()
const items = await webflowAPI.getCollectionItems('collection-id')
```

### **3. Assets API**
```javascript
// Get images and media
const assets = await webflowAPI.getAssets()
```

## **Step 4: Auto-Generate Components**

### **From Design Tokens:**
```javascript
// Generate CSS variables
const cssVariables = designTokens.map(token => 
  `--${token.name}: ${token.value};`
).join('\n')

// Apply to your app
document.documentElement.style.setProperty('--primary-color', '#18402e')
```

### **From Components:**
```javascript
// Generate React components
const reactComponent = webflowAPI.generateReactComponent(component)
```

## **Step 5: Integration Examples**

### **Update Your Tailwind Config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Auto-generated from Webflow
        primary: webflowTokens.colors.primary,
        secondary: webflowTokens.colors.secondary,
        // ... all other colors
      },
      fontFamily: {
        // Auto-generated from Webflow
        sans: webflowTokens.typography.sans,
        display: webflowTokens.typography.display,
      }
    }
  }
}
```

### **Create Dynamic Components:**
```jsx
// components/WebflowComponent.jsx
const WebflowComponent = ({ componentId }) => {
  const [component, setComponent] = useState(null)
  
  useEffect(() => {
    webflowAPI.getComponent(componentId)
      .then(setComponent)
  }, [componentId])
  
  if (!component) return <div>Loading...</div>
  
  return (
    <div 
      style={component.styles}
      dangerouslySetInnerHTML={{ __html: component.html }}
    />
  )
}
```

## **Step 6: Real-Time Sync**

### **Webhook Integration:**
```javascript
// Set up webhooks to sync changes
app.post('/webflow-webhook', (req, res) => {
  const { event, data } = req.body
  
  if (event === 'design_tokens_updated') {
    // Update your design system
    updateDesignTokens(data.tokens)
  }
  
  if (event === 'component_updated') {
    // Update specific component
    updateComponent(data.component)
  }
  
  res.status(200).send('OK')
})
```

## **Step 7: Advanced Features**

### **Design System Generator:**
```javascript
// Generate complete design system
const designSystem = {
  colors: extractColors(designTokens),
  typography: extractTypography(designTokens),
  spacing: extractSpacing(designTokens),
  components: generateComponents(components)
}
```

### **Component Library Builder:**
```javascript
// Auto-generate component library
components.forEach(component => {
  const reactCode = generateReactComponent(component)
  writeFile(`src/components/${component.name}.tsx`, reactCode)
})
```

## **Step 8: Best Practices**

### **1. Caching:**
```javascript
// Cache design data
const cache = new Map()
const getDesignData = async () => {
  if (cache.has('design-data')) {
    return cache.get('design-data')
  }
  
  const data = await webflowAPI.getDesignTokens()
  cache.set('design-data', data)
  return data
}
```

### **2. Error Handling:**
```javascript
try {
  const data = await webflowAPI.getDesignTokens()
} catch (error) {
  console.error('Webflow API Error:', error)
  // Fallback to static design tokens
  return fallbackTokens
}
```

### **3. Type Safety:**
```typescript
interface WebflowDesignToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'typography'
}

interface WebflowComponent {
  id: string
  name: string
  styles: Record<string, string>
  html: string
}
```

## **Step 9: Deployment**

### **Environment Variables:**
```bash
# .env.local
WEBFLOW_API_KEY=your_api_key_here
WEBFLOW_SITE_ID=your_site_id_here
```

### **Vercel Configuration:**
```javascript
// vercel.json
{
  "env": {
    "WEBFLOW_API_KEY": "@webflow_api_key",
    "WEBFLOW_SITE_ID": "@webflow_site_id"
  }
}
```

## **Step 10: Testing**

### **Test Your Integration:**
1. Extract design data from your MDMZE site
2. Verify all colors, fonts, and spacing match
3. Test component generation
4. Check responsive behavior
5. Validate type safety

## **Benefits of This Approach:**

✅ **Perfect Accuracy** - Exact pixel-perfect replication
✅ **Maintainable** - Changes in Webflow auto-sync
✅ **Scalable** - Easy to add new components
✅ **Type Safe** - Full TypeScript support
✅ **Real-time** - Live updates from Webflow
✅ **Professional** - Industry-standard approach

## **Next Steps:**

1. **Get your Webflow API credentials**
2. **Use the extractor tool** I created
3. **Generate your design system**
4. **Build components** from Webflow data
5. **Set up real-time sync**

This approach will give you the most accurate and maintainable way to copy your MDMZE design!
