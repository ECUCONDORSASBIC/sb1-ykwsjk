'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { useState, useEffect } from "react"

interface FileUploadProps {
  register: UseFormRegister<any>
  errors: FieldErrors
}

export function FileUpload({ register, errors }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || '');
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <div className="space-y-4">
        <Label htmlFor="receipt" className="text-white">
          Comprobante de Pago
        </Label>
        <div className="relative">
          <Input
            id="receipt"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register('receipt')}
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="receipt"
            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:border-white/40 transition-colors"
          >
            <div className="text-center space-y-2">
              <Upload className="mx-auto h-8 w-8 text-white/60" />
              <div className="text-sm text-white">
                {fileName || 'Arrastre su archivo aquí o haga clic para seleccionar'}
              </div>
              <div className="text-xs text-white/60">
                PDF, JPG o PNG (máx. 1MB)
              </div>
            </div>
          </label>
        </div>
        {errors.receipt && (
          <p className="text-red-500 text-sm">{errors.receipt.message as string}</p>
        )}
      </div>
    </Card>
  )
}