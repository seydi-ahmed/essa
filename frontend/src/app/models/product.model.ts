export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  imageUrl: string;
  storeId: number;
  storeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  imageUrl: string;
  storeId: number;
  storeName: string;
  createdAt: string;
  updatedAt: string;
}
