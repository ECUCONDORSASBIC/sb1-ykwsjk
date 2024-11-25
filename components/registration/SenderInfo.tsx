'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface SenderInfoProps {
  register: UseFormRegister<any>
  errors: FieldErrors
}

export function SenderInfo({ register, errors }: SenderInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Información del Remitente</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="senderName" className="text-white">
            Nombre Completo
          </Label>
          <Input
            id="senderName"
            {...register('senderName')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="Juan Pérez"
          />
          {errors.senderName && (
            <p className="text-red-500 text-sm">{errors.senderName.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="senderEmail" className="text-white">
            Correo Electrónico
          </Label>
          <Input
            id="senderEmail"
            type="email"
            {...register('senderEmail')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="juan@ejemplo.com"
          />
          {errors.senderEmail && (
            <p className="text-red-500 text-sm">{errors.senderEmail.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}