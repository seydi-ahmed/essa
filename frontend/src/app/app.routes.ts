import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Stores } from './pages/stores/stores';
import { StoreDetails } from './pages/store-details/store-details';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'stores', component: Stores },
  { path: 'stores/new', component: StoreDetails },   // 👈 nouvelle route
  { path: 'stores/:id', component: StoreDetails },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetails },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];