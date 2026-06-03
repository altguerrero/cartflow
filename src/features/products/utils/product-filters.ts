import type {
  ProductFilterState,
  ProductSortOption,
} from "@/features/products/types/product-filters.types";
import type {
  Product,
  ProductCategory,
} from "@/features/products/types/product.types";

export const DEFAULT_PRODUCT_FILTERS: ProductFilterState = {
  searchTerm: "",
  category: "all",
  sort: "featured",
};

const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Electronics",
  jewelery: "Jewelry",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

export function formatProductCategoryLabel(category: ProductCategory): string {
  return CATEGORY_LABELS[category] ?? toTitleCase(category);
}

export function getProductCategories(products: Product[]): ProductCategory[] {
  return Array.from(new Set(products.map((product) => product.category))).sort(
    (firstCategory, secondCategory) =>
      formatProductCategoryLabel(firstCategory).localeCompare(
        formatProductCategoryLabel(secondCategory),
      ),
  );
}

export function filterProductsBySearch(
  products: Product[],
  searchTerm: string,
): Product[] {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

  if (!normalizedSearchTerm) {
    return [...products];
  }

  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.description,
      product.category,
      formatProductCategoryLabel(product.category),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  });
}

export function filterProductsByCategory(
  products: Product[],
  category: ProductFilterState["category"],
): Product[] {
  if (category === "all") {
    return [...products];
  }

  return products.filter((product) => product.category === category);
}

export function sortProducts(
  products: Product[],
  sort: ProductSortOption,
): Product[] {
  const sortableProducts = products.map((product, index) => ({
    product,
    index,
  }));

  sortableProducts.sort((first, second) => {
    const comparedValue = compareProducts(first.product, second.product, sort);

    if (comparedValue !== 0) {
      return comparedValue;
    }

    return first.index - second.index;
  });

  return sortableProducts.map(({ product }) => product);
}

export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilterState,
): Product[] {
  const searchFilteredProducts = filterProductsBySearch(
    products,
    filters.searchTerm,
  );
  const categoryFilteredProducts = filterProductsByCategory(
    searchFilteredProducts,
    filters.category,
  );

  return sortProducts(categoryFilteredProducts, filters.sort);
}

export function hasActiveProductFilters(filters: ProductFilterState): boolean {
  return (
    normalizeSearchTerm(filters.searchTerm) !== "" ||
    filters.category !== DEFAULT_PRODUCT_FILTERS.category ||
    filters.sort !== DEFAULT_PRODUCT_FILTERS.sort
  );
}

function compareProducts(
  firstProduct: Product,
  secondProduct: Product,
  sort: ProductSortOption,
): number {
  switch (sort) {
    case "price-asc":
      return firstProduct.price - secondProduct.price;
    case "price-desc":
      return secondProduct.price - firstProduct.price;
    case "rating-desc":
      return secondProduct.rating.rate - firstProduct.rating.rate;
    case "rating-asc":
      return firstProduct.rating.rate - secondProduct.rating.rate;
    case "featured":
      return 0;
  }
}

function normalizeSearchTerm(searchTerm: string): string {
  return searchTerm.trim().toLowerCase();
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ");
}
