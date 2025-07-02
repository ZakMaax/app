import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterableColumn {
  label: string;
  id: string;
  options?: string[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  message: string
  filterableColumns?: FilterableColumn[]
}


export function DataTable<TData, TValue>({
  columns,
  data,
  message,
  filterableColumns = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [filterColumn, setFilterColumn] = React.useState(
    filterableColumns[0]?.id
  )


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters 
    },
  })



  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4 pl-2 gap-2">
  {/* Dropdown for selecting filter column */}
  <Select value={filterColumn} onValueChange={setFilterColumn}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select column" />
    </SelectTrigger>
    <SelectContent>
      {filterableColumns.map(col =>
        <SelectItem key={col.id} value={col.id}>
          {col.label}
        </SelectItem>
      )}
    </SelectContent>
  </Select>
  {/* If options are provided, show dropdown, else show text input */}
  {(() => {
    const selected = filterableColumns.find(col => col.id === filterColumn);
    if (selected?.options) {
      return (
        <Select
        value={
          (table.getColumn(filterColumn)?.getFilterValue() as string) === "" 
            ? "__all__" 
            : (table.getColumn(filterColumn)?.getFilterValue() as string) ?? "__all__"
        }
          onValueChange={value => 
            table.getColumn(filterColumn)?.setFilterValue(value === "__all__" ? "" : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Filter by ${selected.label}...`} />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="__all__">All</SelectItem>
            {selected.options.map(opt =>
              <SelectItem key={opt} value={opt}>
                {opt.replace(/_/g, " ")}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      );
    }
    return (
      <Input
        placeholder={`Filter by ${selected?.label ?? filterColumn}...`}
        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
        onChange={event =>
          table.getColumn(filterColumn)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    );
  })()}
</div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {message}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
