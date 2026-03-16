// ─────────────────────────────────────────────
// API LAYER — All data fetching lives here.
// Components NEVER call fetch() directly.
// Swap the simulated delay for a real fetch() call later without touching any component.
// ─────────────────────────────────────────────

import { PRODUCTS } from '../data';
import { GALLERY_ITEMS } from '../constants';

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

/**
 * getGalleryItems — Returns all color-variant gallery entries.
 * Used by: GallerySection inside HomePage
 */
export async function getGalleryItems() {
  await delay(600);
  return GALLERY_ITEMS;
}
