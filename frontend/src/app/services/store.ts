import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardwareStore } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/api';

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

  getMyStores(): Observable<HardwareStore[]> {
    return this.http.get<HardwareStore[]>(`${this.apiUrl}/stores/my-stores`);
  }

  createStore(store: HardwareStore): Observable<HardwareStore> {
    return this.http.post<HardwareStore>(`${this.apiUrl}/stores`, store);
  }

  updateStore(id: number, store: HardwareStore): Observable<HardwareStore> {
    return this.http.put<HardwareStore>(`${this.apiUrl}/stores/${id}`, store);
  }

  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/stores/${id}`);
  }
}