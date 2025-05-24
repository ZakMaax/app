import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginSchema } from '@/utils/schemas'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

type loginData = z.infer<typeof loginSchema>

export function LoginForm() {
  const form = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        username: '',
        password: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 async function handleSubmit(loginData){
    try {
        setLoading(true)
        const res = await fetch()
        
    } catch (error) {
        
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
          <form>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name='username'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder='Username' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
              
              <FormField
                    control={form.control}
                    name='password'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder='Password' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
              
              <Button type="submit" className="w-full">
                {
                    loading
                    ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Loging In
                        </>
                    )
                    : "Log In"
                }
              </Button>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
