export interface Agent {
    id: string
    name: string
    email: string
    phone_number: string
    username: string
    role: string
    avatar_url: string
}

export enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
  CONDO = "condo",
  LAND = "land",
}

export enum SaleRent {
  SALE = "sale",
  RENT = "rent",
}

export type Property = {
  id: string; 
  title: string;
  city: string;
  description: string;
  address: string;
  bedrooms: number; 
  bathrooms: number; 
  size: number; 
  price: number; 
  published_at: string;

};

export enum Role {
    ADMIN = "admin",
    Agent = "agent",
}


export type UserType = {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    username: string;
    role: Role;
    is_active: boolean
}