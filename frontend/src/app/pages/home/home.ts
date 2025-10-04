import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public';
import { HardwareStore } from '../../models/store.model';
import { ProductDto } from '../../models/product.model';
import { NgIf, NgForOf, CurrencyPipe } from "@angular/common";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [NgIf, NgForOf, RouterModule, CurrencyPipe]
})
export class Home implements OnInit {
  featuredStores: HardwareStore[] = [];
  featuredProducts: ProductDto[] = [];
  loading = true;

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.loadFeaturedData();
  }

  loadFeaturedData(): void {
    this.publicService.getAllStores().subscribe({
      next: (stores) => {
        this.featuredStores = stores.slice(0, 3);
      },
      error: (error) => {
        console.error('Error loading stores:', error);
      }
    });

    this.publicService.getAllProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 6);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }
}