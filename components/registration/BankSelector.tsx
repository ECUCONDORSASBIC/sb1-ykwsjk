'use client';

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BankSelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const BANKS = [
  { id: 'banco1', name: 'Banco de la Nación Argentina' },
  { id: 'banco2', name: 'Banco Santander' },
  { id: 'banco3', name: 'Banco Galicia' },
  { id: 'banco4', name: 'BBVA' },
  { id: 'banco5', name: 'Banco Macro' },
  { id: 'banco6', name: 'Banco Ciudad' },
  { id: 'banco7', name: 'Banco Provincia' },
  { id: 'banco8', name: 'Banco Credicoop' },
]

export function BankSelector({ value, onChange, error }: BankSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="ecucondorBank" className="text-white">
        Banco
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="ecucondorBank" className="bg-white/5 border-white/20 text-white">
          <SelectValue placeholder="Seleccione un banco" />
        </SelectTrigger>
        <SelectContent>
          {BANKS.map((bank) => (
            <SelectItem key={bank.id} value={bank.id}>
              {bank.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}