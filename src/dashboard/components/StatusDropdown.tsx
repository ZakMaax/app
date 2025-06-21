import { PropertyStatus } from '@/utils/types'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function StatusDropdown({ propertyId, initialStatus }: { propertyId: string, initialStatus: PropertyStatus }) {
  const [status, setStatus] = useState<PropertyStatus>(initialStatus)
  const [loading, setLoading] = useState(false)

  const handleChange = async (newStatus: PropertyStatus) => {
    if (newStatus === status) return
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/properties/property/${propertyId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) setStatus(newStatus)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Set Status</DropdownMenuLabel>
        {Object.values(PropertyStatus).map(s => (
          <DropdownMenuItem
            key={s}
            onClick={() => handleChange(s)}
            disabled={loading || s === status}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}