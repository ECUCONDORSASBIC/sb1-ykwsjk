'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface AmountInputProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  arsAmount: number
  isLoading?: boolean
}

export function AmountInput({ register, errors, arsAmount, isLoading = false }: AmountInputProps) {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchRate = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTARS');
        const data = await response.json();
        setExchangeRate(parseFloat(data.price));
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">
            Monto en USD
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            {...register('amount', { valueAsNumber: true })}
            className="bg-white/5 border-white/20 text-white"
            placeholder="0.00"
            autoComplete="off"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white">Monto en ARS (3.5% descuento)</Label>
          {isLoading ? (
            <Skeleton className="h-10 bg-white/5" />
          ) : (
            <div className="bg-white/5 border border-white/20 rounded-md p-3 text-white">
              {arsAmount.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS'
              })}
            </div>
          )}
          {exchangeRate && (
            <p className="text-sm text-white/60">
              Tasa actual: {exchangeRate.toLocaleString('es-AR', { 
                style: 'currency', 
                currency: 'ARS' 
              })} ARS/USD
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}