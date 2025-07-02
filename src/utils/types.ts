export interface Agent {
    id: string
    name: string
    email: string
    phone_number: string
    username: string
    role: string
    avatar_url: string
    date_created: string
}

export enum PropertyType {
  APARTMENT = "apartment",
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  LAND = "land",
}

export enum SaleRent {
  SALE = "sale",
  RENT = "rent",
}

export enum PropertyStatus{
    available = "available",
    sold = "sold",
    rented = "rented"
}

export type Property = {
  id: string; 
  title: string;
  city: string;
  featured: boolean;
  address: string;
  bedrooms: number; 
  bathrooms: number; 
  description: string;
  size: number; 
  price: number; 
  type: PropertyType
  latitude?: number;
  longitude?: number;
  floor?: number;
  agent_id?: string;
  published_date: string;
  sale_or_rent: SaleRent
  status: PropertyStatus
  images: Array<string>

};

export type PropertyWithAgent = Property & {
  agent?: Agent | null;
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

export enum AppointmentStatus {
  scheduled = "scheduled",
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
  no_show_agent = "no_show_agent",
  no_show_customer = "no_show_customer",
}

export type Appointment = {
  id: string;
  customer_name: string;
  customer_phone: string;
  appointment_datetime: string;
  property_id: string;
  property_title: string;
  agent_id: string;
  agent_name: string;
  appointment_status: AppointmentStatus;
};