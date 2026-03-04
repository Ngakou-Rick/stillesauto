// ===== AUTH =====
export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

// ===== VEHICLES =====
export type VehicleType = 'CAR' | 'SUV' | 'TRUCK' | 'VAN' | 'MOTORCYCLE';
export type ListingMode = 'RENTAL' | 'SALE' | 'BOTH';
export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  listingMode: ListingMode;
  fuelType: FuelType;
  transmission: TransmissionType;
  seats: number;
  dailyRentalPrice?: number;
  salePrice?: number;
  available: boolean;
  features: string[];
  images: string[];
  description?: string;
  averageRating?: number;
  reviewCount?: number;
}

// ===== ACCESSORIES =====
export interface Accessory {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  description?: string;
  features: string[];
  averageRating?: number;
  reviewCount?: number;
}

// ===== CART =====
export type ItemType = 'VEHICLE' | 'ACCESSORY';
export type TransactionType = 'PURCHASE' | 'RENTAL';

export interface CartItem {
  id: string;
  itemType: ItemType;
  transactionType: TransactionType;
  itemId: string;
  itemName: string;
  itemImage?: string;
  quantity: number;
  unitPrice: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

// ===== REVIEWS =====
export type EntityType = 'VEHICLE' | 'ACCESSORY';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Review {
  id: string;
  entityType: EntityType;
  entityId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}

// ===== ORDERS =====
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Order {
  id: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}

// ===== IMPORT/EXPORT =====
export type ImportExportStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'QUOTE_SENT'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED';

export interface ImportExportRequest {
  id: string;
  type: 'IMPORT' | 'EXPORT';
  description: string;
  status: ImportExportStatus;
  documents?: string[];
  createdAt: string;
}

// ===== PAGINATION =====
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

// ===== FILTERS =====
export interface VehicleFilters {
  type?: VehicleType;
  listingMode?: ListingMode;
  brand?: string;
  fuelType?: FuelType;
  minPrice?: number;
  maxPrice?: number;
  availableFrom?: string;
  availableTo?: string;
  page?: number;
  limit?: number;
}

export interface AccessoryFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}