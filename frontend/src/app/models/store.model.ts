export interface HardwareStore {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  owner?: any;
}

export interface StoreResponse {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  ownerId: number;
  ownerName: string;
}