'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { useState } from "react"
import { loginUser } from "../login-api"
import { useRouter } from "next/navigation"
import { toast } from '@/hooks/use-toast'

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [cin, setCin] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await loginUser(cin, cardNumber)
    if (result.success) {
      // console.log('Login successful:', result.data)
      toast({ title: "Logged in successfully!", description: "Welcome back to your account!", })
      router.push('/home')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account!</h1>
          <p className="text-muted-foreground text-sm text-balance"> Enter your CIN and card number to continue </p>
        </div>
        
        {/* CIN */}
        <Field>
          <FieldLabel htmlFor="cin">CIN</FieldLabel>
          <Input id="cin" type="text" placeholder="12345678" required 
            value={cin} onChange={(e) => setCin(e.target.value)} disabled={loading}
          />
        </Field>
        
        {/* card number */}
        <Field>
          <FieldLabel htmlFor="cardnumber">Card Number</FieldLabel>
          <Input id="cardnumber" type="text" placeholder="0000 0000 0000 0000" required 
            value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} disabled={loading}
          />
        </Field>
        
        {/* login button */}
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Field>

        {/* error message */}
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}
        
        {/* extra info */}
        <FieldSeparator className="mt-0.5"><Info className="w-5 h-5 text-muted-foreground" /></FieldSeparator>
        <Field>
          <div className="flex items-center justify-center gap-2">
            <FieldDescription className="text-sm text-muted-foreground text-center">
              Make sure your phone is on standby to receive the OTP and complete the login process.
            </FieldDescription>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}