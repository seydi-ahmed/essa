// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PublicService } from '../../services/public';
// import { ProductDto } from '../../models/product.model';
// import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-product-details',
//   imports: [NgIf, CurrencyPipe, DatePipe],
//   templateUrl: './product-details.html',
//   styleUrls: ['./product-details.scss']
// })
// export class ProductDetails implements OnInit {
//   product: ProductDto | null = null;
//   loading = true;
//   productId!: number;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private publicService: PublicService
//   ) {}

//   ngOnInit(): void {
//     this.productId = Number(this.route.snapshot.paramMap.get('id'));
//     this.loadProductDetails();
//   }

//   loadProductDetails(): void {
//     this.publicService.getProductById(this.productId).subscribe({
//       next: (product) => {
//         this.product = product;
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading product:', error);
//         this.loading = false;
//       }
//     });
//   }

//   viewStore(storeId: number): void {
//     this.router.navigate(['/stores', storeId]);
//   }

//   goBack(): void {
//     this.router.navigate(['/products']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../services/public';
import { ProductDto } from '../../models/product.model';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {
  product: ProductDto | null = null;
  loading = true;
  isNew = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'new') {
      this.isNew = true;
      this.loading = false;
      // Produit vide (formulaire vierge)
      this.product = {
        id: 0,
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        brand: '',
        imageUrl: '',
        storeId: 0,       // tu pourras injecter l'id du store courant si dispo
        storeName: '',
        createdAt: '',
        updatedAt: ''
      };
    } else {
      const productId = Number(id);
      this.loadProductDetails(productId);
    }
  }

  loadProductDetails(id: number): void {
    this.publicService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  viewStore(storeId: number): void {
    this.router.navigate(['/stores', storeId]);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
