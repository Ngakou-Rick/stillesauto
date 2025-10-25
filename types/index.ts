export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  price: number;
  dailyRate?: number;
  image: string;
  images: string[];
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  status: VehicleStatus;
  features: string[];
  description: string;
  location: string;
  rating: number;
  reviews: Review[];
  forSale: boolean;
  forRent: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  category: AccessoryCategory;
  price: number;
  image: string;
  images: string[];
  description: string;
  stock: number;
  rating: number;
  reviews: Review[];
  brand: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

export interface CartItem {
  id: string;
  type: 'vehicle' | 'accessory';
  item: Vehicle | Accessory;
  quantity: number;
  rentalDates?: {
    startDate: Date;
    endDate: Date;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface ImportExportRequest {
  id: string;
  userId: string;
  vehicleDetails: {
    brand: string;
    model: string;
    year: number;
    origin: string;
  };
  type: 'import' | 'export';
  status: ImportExportStatus;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export type VehicleCategory = 
  | 'berline'
  | 'suv'
  | 'pickup'
  | 'van'
  | 'sport'
  | 'luxury'
  | 'electric';

export type AccessoryCategory = 
  | 'interior'
  | 'exterior'
  | 'electronics'
  | 'maintenance'
  | 'safety'
  | 'performance';

export type FuelType = 'essence' | 'diesel' | 'hybrid' | 'electric';

export type Transmission = 'manual' | 'automatic';

export type VehicleStatus = 
  | 'available'
  | 'rented'
  | 'sold'
  | 'maintenance'
  | 'reserved';

export type UserRole = 'client' | 'admin' | 'employee';

export type ImportExportStatus = 
  | 'pending'
  | 'in_progress'
  | 'documents_required'
  | 'customs_clearance'
  | 'completed'
  | 'cancelled';
