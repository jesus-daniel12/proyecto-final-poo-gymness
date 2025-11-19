"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  searchable?: boolean
  searchPlaceholder?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")

  const filtered = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key]
      return String(value).toLowerCase().includes(search.toLowerCase())
    }),
  )

  return (
    <div className="space-y-4">
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-8">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render ? col.render(item[col.key], item) : String(item[col.key])}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button size="sm" variant="destructive" onClick={() => onDelete(item)}>
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
