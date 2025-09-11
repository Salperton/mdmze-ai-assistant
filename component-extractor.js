// Component Extractor Script
// Run this in your browser console on your MDMZE website

function extractComponent(element, componentName) {
  const styles = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  
  return {
    name: componentName,
    element: element.tagName.toLowerCase(),
    classes: element.className,
    styles: {
      width: rect.width + 'px',
      height: rect.height + 'px',
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontSize: styles.fontSize,
      fontFamily: styles.fontFamily,
      padding: styles.padding,
      margin: styles.margin,
      borderRadius: styles.borderRadius,
      boxShadow: styles.boxShadow,
      border: styles.border,
      display: styles.display,
      flexDirection: styles.flexDirection,
      alignItems: styles.alignItems,
      justifyContent: styles.justifyContent,
    },
    children: Array.from(element.children).map((child, index) => 
      extractComponent(child, `${componentName}_child_${index}`)
    )
  };
}

// Extract specific components
const header = document.querySelector('header');
const cards = document.querySelectorAll('.card, [class*="card"]');
const buttons = document.querySelectorAll('button, .btn, [class*="button"]');

console.log('=== HEADER COMPONENT ===');
if (header) console.log(extractComponent(header, 'Header'));

console.log('=== CARD COMPONENTS ===');
cards.forEach((card, i) => {
  console.log(extractComponent(card, `Card_${i}`));
});

console.log('=== BUTTON COMPONENTS ===');
buttons.forEach((btn, i) => {
  console.log(extractComponent(btn, `Button_${i}`));
});
