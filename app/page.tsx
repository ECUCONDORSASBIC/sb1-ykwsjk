import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "@/components/registration/RegistrationForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Registro de Transacción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}