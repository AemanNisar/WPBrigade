// announcement bar
export function getEl(selector, context = document) {
  const el = context.querySelector(selector);
  if (!el) console.warn(`[UI] Element not found: "${selector}"`);
  return el;
}
