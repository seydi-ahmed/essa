import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { StoreService } from '../../services/store';
import { ProductService } from '../../services/product';
import { HardwareStore } from '../../models/store.model';
import { ProductDto } from '../../models/product.model';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgForOf, CurrencyPipe, TruncatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  stores: HardwareStore[] = [];
  products: ProductDto[] = [];
  loading = true;
  stats = {
    totalStores: 0,
    totalProducts: 0,
    lowStockProducts: 0
  };

  constructor(
    public authService: AuthService,
    private storeService: StoreService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.storeService.getMyStores().subscribe({
      next: (stores) => {
        this.stores = stores;
        this.stats.totalStores = stores.length;
      },
      error: (error) => {
        console.error('Error loading stores:', error);
      }
    });

    this.productService.getMyProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.stats.totalProducts = products.length;
        this.stats.lowStockProducts = products.filter(p => p.quantity < 10).length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  createStore(): void {
    this.router.navigate(['/stores/new']);
  }

  createProduct(): void {
    this.router.navigate(['/dashboard/products/new']);
  }

  viewStore(storeId: number): void {
    this.router.navigate(['/stores', storeId]);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}