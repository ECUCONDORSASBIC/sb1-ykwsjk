'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AmountInput } from './AmountInput';
import { SenderInfo } from './SenderInfo';
import { BeneficiaryInfo } from './BeneficiaryInfo';
import { BankSelector } from './BankSelector';
import { FileUpload } from './FileUpload';

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const formSchema = z.object({
  amount: z.number().min(1, 'El monto es requerido'),
  senderName: z.string().min(1, 'El nombre es requerido'),
  senderEmail: z.string().email('Email inválido'),
  beneficiaryName: z.string().min(1, 'El nombre del beneficiario es requerido'),
  beneficiaryDNI: z.string().min(7, 'DNI inválido'),
  beneficiaryCBU: z.string().regex(/^\d{22}$/, 'CBU debe tener 22 dígitos'),
  beneficiaryAlias: z.string().min(6, 'Alias inválido').optional(),
  ecucondorBank: z.string().min(1, 'Seleccione un banco'),
  receipt: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'El archivo no debe superar 1MB')
    .refine(
      (files) => ['application/pdf', 'image/jpeg', 'image/png'].includes(files?.[0]?.type),
      'Solo se permiten archivos PDF, JPEG o PNG'
    ),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [arsAmount, setArsAmount] = useState(0);
  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const amount = watch('amount');

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registro exitoso",
        description: "Sus datos han sido enviados correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar su solicitud.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AmountInput 
        register={register} 
        errors={errors} 
        arsAmount={arsAmount}
        isLoading={isSubmitting} 
      />
      
      <SenderInfo register={register} errors={errors} />
      <BeneficiaryInfo register={register} errors={errors} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <BankSelector
          value={watch('ecucondorBank') || ''}
          onChange={(value) => control._fields.ecucondorBank?._f.onChange(value)}
          error={errors.ecucondorBank?.message}
        />
        <FileUpload register={register} errors={errors} />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          'Enviar Registro'
        )}
      </Button>
    </form>
  );
}