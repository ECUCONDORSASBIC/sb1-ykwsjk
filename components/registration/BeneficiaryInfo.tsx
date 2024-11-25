'use client';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface BeneficiaryInfoProps {
  register: UseFormRegister<any>
  errors: FieldErrors
}

export function BeneficiaryInfo({ register, errors }: BeneficiaryInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Información del Beneficiario</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="beneficiaryName" className="text-white">
            Nombre Completo
          </Label>
          <Input
            id="beneficiaryName"
            {...register('beneficiaryName')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="María González"
          />
          {errors.beneficiaryName && (
            <p className="text-red-500 text-sm">{errors.beneficiaryName.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="beneficiaryDNI" className="text-white">
            DNI
          </Label>
          <Input
            id="beneficiaryDNI"
            {...register('beneficiaryDNI')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="12345678"
          />
          {errors.beneficiaryDNI && (
            <p className="text-red-500 text-sm">{errors.beneficiaryDNI.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="beneficiaryCBU" className="text-white">
            CBU
          </Label>
          <Input
            id="beneficiaryCBU"
            {...register('beneficiaryCBU')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="0000000000000000000000"
          />
          {errors.beneficiaryCBU && (
            <p className="text-red-500 text-sm">{errors.beneficiaryCBU.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="beneficiaryAlias" className="text-white">
            Alias (Opcional)
          </Label>
          <Input
            id="beneficiaryAlias"
            {...register('beneficiaryAlias')}
            className="bg-white/5 border-white/20 text-white"
            placeholder="EJEMPLO.ALIAS.CUENTA"
          />
          {errors.beneficiaryAlias && (
            <p className="text-red-500 text-sm">{errors.beneficiaryAlias.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}