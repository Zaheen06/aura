import { PRODUCTS } from '../data';

// Simulate network latency (replace with real fetch when backend exists)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * getProducts — Returns the full product list.
 * Used by: HomePage
 */
export async function getProducts() {
  await delay(900);
  return PRODUCTS;
}

/**
 * getProductById — Returns a single product by its id string.
 * Used by: ShowcasePage
 */
export async function getProductById(id) {
  await delay(300);
  return PRODUCTS.find((p) => p.id === id) ?? null;
}


