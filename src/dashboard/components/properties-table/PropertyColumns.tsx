import { ColumnDef } from '@tanstack/react-table'
import { Property, PropertyType, SaleRent } from '@/utils/types'
import { StatusDropdown } from '@/dashboard/components/PropertyStatusDropdown';
import FeaturedCell from '@/dashboard/components/FeaturedToggle'
import { PropertyActions } from '@/dashboard/components/PropertyActions';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface ColumnProps {
  onDelete: (propertyId: string) => void,
  onEdit: (property: Property) => void,
}

export const propertyColumns = (
  { onDelete, onEdit }: ColumnProps, 
  role: string
): ColumnDef<Property>[] => {
  const baseColumns: ColumnDef<Property>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => {
        const id = row.original.id;
        return (typeof id === 'string' && id.length >= 4)
          ? `${id.substring(0, 2)}${id.slice(-2)}`
          : id;
      },
    },
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'city', header: 'City' },
    { accessorKey: 'address', header: 'Address' },
    { accessorKey: 'bedrooms', header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           Bedrooms
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    }, },
    { accessorKey: 'bathrooms', header: 'Bathrooms' },
    { accessorKey: 'size', header: 'Size (sqft)' },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             Price
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             For
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const saleOrRent: SaleRent = row.getValue('sale_or_rent');
        return saleOrRent.charAt(0).toUpperCase() + saleOrRent.slice(1);
      },
    },
    {
      accessorKey: 'published_date',
      header: 'Published Date',
      cell: ({ row }) => {
        const dateString = row.getValue('published_date');
        if (typeof dateString !== 'string' || dateString.trim() === '') {
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
  ];

  // Only admin sees these columns
  if (role === "admin") {
    baseColumns.push(
      {
        accessorKey: 'featured',
        header: 'Featured',
        cell: ({ row }) => (
          <FeaturedCell
            initialValue={row.getValue('featured')}
            propertyId={row.original.id}
          />
        )
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusDropdown
            propertyId={row.original.id}
            initialStatus={row.getValue('status')}
          />
        ),
      },
      {
        id: "actions",
        header: "Property Actions",
        cell: ({ row }) => {
          const property = row.original;
          return (
            <PropertyActions property={property} onDelete={onDelete} onEdit={onEdit} />
          );
        },
      }
    );
  }

  return baseColumns;
};