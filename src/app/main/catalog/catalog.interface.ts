/** Catalog item */
export interface ICatalogItem {
  id: number;
  name?: string;
  description?: string;
  price: number;
  stock: number;
  count: number;
  image: string;
}
