import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { z } from 'zod'
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
import { Loader2, Eye, EyeClosed } from 'lucide-react'

type loginData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passVisiblity, setPassVisibility] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (values: loginData) => {
    console.log("Submitting, VALUSE:", values)
    setLoading(true)
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: values.username, password: values.password }),
      });
      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      navigate("/dashboard");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  function handlePasswordVisiblity(){
    setPassVisibility(!passVisiblity)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-[#18181b]">
      {/* Header Title */}
      <h1 className="mb-8 text-3xl font-bold text-center text-primary">
        GuryaSamo Administration Dashboard
      </h1>
      <Card className="w-full max-w-md shadow-lg bg-card dark:bg-[#23232a]">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Username' autoComplete="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative">
                          <Input
                            type={passVisiblity ? "text" : "password"}
                            placeholder='Password'
                            autoComplete="current-password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={handlePasswordVisiblity}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                            tabIndex={-1}
                          >
                            {passVisiblity ? <Eye className="w-5 h-5" /> : <EyeClosed className="w-5 h-5" />}
                          </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Logging In
                  </>
                ) : "Login"}
              </Button>
              {/* Optional: Add Google login or other buttons here */}
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Link to public home page */}
      <Link
        to="/"
        className="mt-6 text-primary underline hover:opacity-80 transition"
      >
        Go to the website home page
      </Link>
    </div>
  )
}