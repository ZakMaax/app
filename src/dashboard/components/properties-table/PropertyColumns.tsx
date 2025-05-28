import { ColumnDef } from '@tanstack/react-table'
import {Property, PropertyType, SaleRent} from '@/utils/types'

export const propertyColumns: ColumnDef<Property>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id = row.original.id;
      return (typeof id === 'string' && id.length >= 4) 
        ? `${id.substring(0, 2)}...${id.slice(-2)}` 
        : id;
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'bedrooms',
    header: 'Bedrooms',
  },
  {
    accessorKey: 'bathrooms',
    header: 'Bathrooms',
  },
  {
    accessorKey: 'size',
    header: 'Size (sqft)',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type: PropertyType = row.getValue('type');
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
  {
    accessorKey: 'sale_or_rent',
    header: 'For',
    cell: ({ row }) => {
      const saleOrRent: SaleRent = row.getValue('sale_or_rent');
      return saleOrRent.charAt(0).toUpperCase() + saleOrRent.slice(1);
    },
  },
  {
    accessorKey: 'published_at',
    header: 'Published Date',
    cell: ({ row }) => {
      const dateString = row.getValue('published_at'); 
      
      if (typeof dateString !== 'string' || dateString.trim() === '') {
        console.warn("published_date is not a valid string or is empty:", dateString);
        return 'N/A'; 
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
      }).format(date);

      return formattedDate;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];