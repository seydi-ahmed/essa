import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardwareStore } from '../models/store.model';
import { ProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = 'http://localhost:8080/api/public';

  constructor(private http: HttpClient) { }

  getAllStores(): Observable<HardwareStore[]> {
    return this.http.get<HardwareStore[]>(`${this.apiUrl}/stores`);
  }

  getStoreById(id: number): Observable<HardwareStore> {
    return this.http.get<HardwareStore>(`${this.apiUrl}/stores/${id}`);
  }

  getStoresByCity(city: string): Observable<HardwareStore[]> {
    return this.http.get<HardwareStore[]>(`${this.apiUrl}/stores/city/${city}`);
  }

  getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByStore(storeId: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/products/store/${storeId}`);
  }

  searchProductsByName(name: string): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/products/search/name/${name}`);
  }

  searchProductsByCategory(category: string): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/products/search/category/${category}`);
  }

  getProductsByCity(city: string): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/products/city/${city}`);
  }
}