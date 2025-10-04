import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public';
import { ProductDto } from '../../models/product.model';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-products',
  imports: [NgIf, NgForOf, CurrencyPipe, FormsModule, TruncatePipe],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  products: ProductDto[] = [];
  filteredProducts: ProductDto[] = [];
  loading = true;
  searchTerm = '';
  selectedCategory = '';
  selectedCity = '';

  constructor(
    private publicService: PublicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.publicService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.brand?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesCity = !this.selectedCity || product.storeName?.includes(this.selectedCity);
      return matchesSearch && matchesCategory && matchesCity;
    });
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(product => product.category).filter(Boolean))];
  }

  getCities(): string[] {
    return [...new Set(this.products.map(product => product.storeName).filter(Boolean))];
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}