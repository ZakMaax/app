import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input'
export enum PropertyType {
  RESIDENTIAL = "residential",
  APARTMENT = "apartment",
  COMMERCIAL = "commercial",
  LAND = "land"
}

export interface FilesWithPreview extends File {
  preview: string
}

export enum SaleOrRent {
  SALE = "sale",
  RENT = "rent"
}

export enum Roles {
  admin = "admin",
  agent = "agent"
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const propertySchema = z.object({
  title: z.string({
    required_error: 'Property title is required.',
    invalid_type_error: 'Property title must be a valid string.',
  }).min(3, {
    message: 'Property title must be at least 3 characters long.',
  }),

  city: z.string({
    required_error: 'City is required.',
    invalid_type_error: 'City must be a valid string.',
  }).min(2, {
    message: 'City must be at least 2 characters long.',
  }),

  address: z.string({
    required_error: 'Property address is required.',
    invalid_type_error: 'Property address must be a valid string.',
  }).min(5, {
    message: 'Property address must be at least 5 characters long.',
  }),

  bedrooms: z.number({
    required_error: 'Number of bedrooms is required.',
    invalid_type_error: 'Number of bedrooms must be a valid number.',
  }).min(0, {
    message: 'Number of bedrooms cannot be less than 0.',
  }),

  bathrooms: z.number({
    required_error: 'Number of bathrooms is required.',
    invalid_type_error: 'Number of bathrooms must be a valid number.',
  }).min(0, {
    message: 'Number of bathrooms cannot be less than 0.',
  }),

  price: z.number({
    required_error: 'Property price is required.',
    invalid_type_error: 'Price must be a valid number.',
  }).min(0, {
    message: 'Property price must be at least 0.',
  }),

  size: z.number({
    required_error: 'Property size is required.',
    invalid_type_error: 'Property size must be a valid number.',
  }).min(0, {
    message: 'Property size must be at least 0.',
  }),

  latitude: z.number({
    required_error: 'Latitude is required',
  })
  .min(-90, 'Invalid latitude')
  .max(90, 'Invalid latitude'),

  longitude: z.number({
    required_error: 'Longitude is required',
  })
  .min(-180, 'Invalid longitude')
  .max(180, 'Invalid longitude'),

  floor: z.number({
    invalid_type_error: 'Floor number must be a valid number.',
  }).min(0, {
    message: 'Floor number must be at least 0.',
  }).optional(),

  type: z.enum([PropertyType.RESIDENTIAL, PropertyType.APARTMENT, PropertyType.COMMERCIAL, PropertyType.LAND], {
    required_error: 'Property type is required.',
  }),

  sale_or_rent: z.enum([SaleOrRent.SALE, SaleOrRent.RENT], {
    required_error: 'Sale or Rent option is required.',
  }),

  agent: z.string({
    required_error: 'Agent name is required.',
    invalid_type_error: 'Agent name must be a valid string.',
  }),

  description: z.string({
    required_error: 'Description is required.',
    invalid_type_error: 'Description must be a valid string.',
  }).min(10, {
    message: 'Description must be at least 10 characters long.',
  }),

  files: z.array(
    z.instanceof(File, { message: "At least one image is required" })
      .refine(file => file.size > 0, "File cannot be empty")
      .refine(file => file.size <= MAX_FILE_SIZE, `Max file size is ${MAX_FILE_SIZE/1024/1024}MB`)
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), 
        `Only ${ACCEPTED_IMAGE_TYPES.map(t => t.split('/')[1]).join(', ')} images are allowed`)
  )
  .min(1, "At least one image is required")
  .max(10, "Maximum 10 images allowed"),
});



export const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .refine(val => val.trim().length > 0, {
      message: "Name cannot be just whitespace"
    })
    .refine(val => isNaN(Number(val)), {
      message: "Name cannot be a number"
    }),

  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Username must be at least 5 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores"
    })
    .refine(val => isNaN(Number(val)), {
      message: "Username cannot be just numbers"
    })
    .refine(val => isNaN(Number(val[0])), {
      message: "Username cannot start with a number"
    }),

  email: z
    .string({ 
      required_error: "Email is required", 
      invalid_type_error: "Email must be a string" 
    })
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { 
      message: "Password must be at least 8 characters long" 
    })
    .max(50, { message: "Password must be less than 50 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number"
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character"
    }),

  role: z.nativeEnum(Roles, {
    required_error: "User role is required",
    invalid_type_error: `Role must be one of: ${Object.values(Roles).join(', ')}`
  }),

  avatar: z
    .instanceof(File).optional()
    .refine((file) => !file || file.size > 0, {
      message: "Avatar file cannot be empty"
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Image must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: `Only ${ACCEPTED_IMAGE_TYPES.map(t => t.split('/')[1]).join(', ')} images are allowed`
    })
})


export const userEditSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .refine(val => val.trim().length > 0, {
      message: "Name cannot be just whitespace"
    })
    .refine(val => isNaN(Number(val)), {
      message: "Name cannot be a number"
    }),

  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Username must be at least 5 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores"
    })
    .refine(val => isNaN(Number(val)), {
      message: "Username cannot be just numbers"
    })
    .refine(val => isNaN(Number(val[0])), {
      message: "Username cannot start with a number"
    }),

  email: z
    .string({ 
      required_error: "Email is required", 
      invalid_type_error: "Email must be a string" 
    })
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

  role: z.nativeEnum(Roles, {
    required_error: "User role is required",
    invalid_type_error: `Role must be one of: ${Object.values(Roles).join(', ')}`
  }),

  avatar: z
    .instanceof(File).optional()
    .refine((file) => !file || file.size > 0, {
      message: "Avatar file cannot be empty"
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Image must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: `Only ${ACCEPTED_IMAGE_TYPES.map(t => t.split('/')[1]).join(', ')} images are allowed`
    })
})


export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" }),
  password: z.string({
    required_error: "Password is required"
  })
})

