import { User } from './user.model';
import { HardwareStore } from './store.model';
import { ProductDto } from './product.model';

export interface UserDashboard {
  user: User;
  stores: HardwareStore[];
  products: ProductDto[];
  totalStores: number;
  totalProducts: number;
}