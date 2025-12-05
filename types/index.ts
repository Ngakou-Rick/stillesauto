export interface Vehicle {
    id: number;
    brand: string;
    name: string;
    category: string;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    price: number;
    dailyRate: number;
    forSale: boolean;
    forRent: boolean;
    availability: boolean;
    description: string;
    imageUrl: string;
    color: string;
    state: string;
    images: string[];
}

export interface Accessory {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
}

export type VehicleCategory = 'berline' | 'suv' | 'pickup' | 'van' | 'sport' | 'luxury';
export type FuelType = 'essence' | 'diesel' | 'hybrid' | 'electric';
export type Transmission = 'manual' | 'automatic';

export interface LoginRequest {
    username?: string;
    password?: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterRequest {
    username?: string;
    email?: string;
    password?: string;
}
