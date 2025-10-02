// Converts category name to URL-friendly format
export function formatCategoryForUrl(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Converts URL back to category display name (optional)
export function formatUrlToCategory(url) {
  return url.replace(/-/g, " ");
}
