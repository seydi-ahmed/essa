import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public';
import { StoreService } from '../../services/store';
import { HardwareStore } from '../../models/store.model';
import { ProductDto } from '../../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-details',
  imports: [NgIf, NgFor, CurrencyPipe, FormsModule],
  templateUrl: './store-details.html',
  styleUrls: ['./store-details.scss'],
})
export class StoreDetails implements OnInit {
  store: HardwareStore | null = null;
  products: ProductDto[] = [];
  loading = true;
  storeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicService: PublicService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === 'new') {
      // Mode création
      this.store = { id: 0, name: '', address: '', city: '', phone: '', description: '' };
      this.loading = false;
    } else if (idParam) {
      this.storeId = Number(idParam);
      this.loadStoreDetails();
      this.loadStoreProducts();
    }
  }

  loadStoreDetails(): void {
    this.publicService.getStoreById(this.storeId).subscribe({
      next: (store) => {
        this.store = store;
      },
      error: (error) => {
        console.error('Error loading store:', error);
        this.loading = false;
      },
    });
  }

  loadStoreProducts(): void {
    this.publicService.getProductsByStore(this.storeId).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      },
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  goBack(): void {
    this.router.navigate(['/stores']);
  }

  saveStore(): void {
    if (this.store) {
      this.storeService.createStore(this.store).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Erreur création magasin:', err),
      });
    }
  }
}
