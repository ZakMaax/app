import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userSchema, Roles, FilesWithPreview} from '@/utils/schemas'
import { PhoneInput } from '@/components/Phone-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ImageUploader from '@/dashboard/components/ImageUploader'

export default function CreateUser() {
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState<FilesWithPreview[]>([])
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      phone_number: '',
      role: Roles.agent,
      avatar: new File([], "")
    }
  })


  useEffect(() => {
    if (files.length > 0) {
      form.setValue('avatar', files[0], { shouldValidate: true });
    } else {
      form.setValue('avatar', undefined, { shouldValidate: true });
      form.clearErrors('avatar'); 
    }
  }, [files, form])

  async function onSubmit(userData: z.infer<typeof userSchema>) {
    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('username', userData.username)
    formData.append('email', userData.email)
    formData.append('phone_number', userData.phone_number)
    formData.append('password', userData.password)
    formData.append('role', userData.role)

    if (userData.avatar) {
      formData.append('avatar', userData.avatar)
    }

    try {
      setSubmitting(true)
      const response = await fetch('http://127.0.0.1:8000/api/v1/users', {
        method: 'POST',
        body: formData
      })

      const res = await response.json()
      if (response.ok) {
        toast.success('User created successfully')
        console.log(res)
        setTimeout(() => {
          navigate('/dashboard/users')
        }, 2000)
      } else {
        toast.error(res.detail || 'Something happened while creating user')
      }
    } catch (error) {
      console.error(error)
      toast.error('Network error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-6">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="phone_number" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter phone number" international defaultCountry="SO" {...field} />
              </FormControl>
              <FormDescription>
                E.g. (63-444-4444)-Telesom<br />
                &emsp;&emsp;(65-999-9999)-Somtel<br />
                &emsp;&emsp;(67-777-7777)-Soltelco
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="role" render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="agent">agent</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="lg:col-span-3 bg-primary-foreground p-4 rounded-lg">
           <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                <ImageUploader maximumFiles={1} files={files} setFiles={setFiles} />
                </FormControl>
                <FormMessage />
            </FormItem>
        </div>

        <Button type="submit" disabled={submitting} className="cursor-pointer lg:col-span-3 place-self-center rounded-lg w-[80%] py-4 hover:opacity-80">
          {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Submitting
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  )
}
