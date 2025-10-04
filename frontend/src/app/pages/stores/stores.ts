import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../../services/public';
import { HardwareStore } from '../../models/store.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stores',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './stores.html',
  styleUrls: ['./stores.scss']
})
export class Stores implements OnInit {
  stores: HardwareStore[] = [];
  filteredStores: HardwareStore[] = [];
  loading = true;
  searchTerm = '';
  selectedCity = '';

  constructor(
    private publicService: PublicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.publicService.getAllStores().subscribe({
      next: (stores) => {
        this.stores = stores;
        this.filteredStores = stores;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stores:', error);
        this.loading = false;
      }
    });
  }

  filterStores(): void {
    this.filteredStores = this.stores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           store.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           store.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCity = !this.selectedCity || store.city === this.selectedCity;
      return matchesSearch && matchesCity;
    });
  }

  getCities(): string[] {
    return [...new Set(this.stores.map(store => store.city))];
  }

  viewStore(storeId: number): void {
    this.router.navigate(['/stores', storeId]);
  }
}