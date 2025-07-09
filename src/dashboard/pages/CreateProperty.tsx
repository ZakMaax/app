import {z} from 'zod'
import { toast } from 'react-hot-toast'
import {useNavigate, useLoaderData} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { propertySchema, PropertyType, FilesWithPreview } from '@/utils/schemas'
import { SaleRent} from '@/utils/types'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ImageUploader from '../components/ImageUploader'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import {Agent} from "@/utils/types"
import { authFetch } from "@/utils/auth"

type propertyFormType = z.infer<typeof propertySchema>

export default function CreateProperty() {
const [files, setFiles] = useState<FilesWithPreview[]>([])

const [submitting, setSubmitting] = useState(false)
const navigate = useNavigate()
const agents: Agent[] = useLoaderData()

  const form = useForm<propertyFormType>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
        title: '',
        city: '',
        address: '',
        bathrooms: 0,
        bedrooms: 0,
        description: '',
        floor: 0,
        price: 0,
        latitude: 0,
        longitude: 0,
        sale_or_rent: SaleRent.SALE,
        size: 0,
        type: PropertyType.RESIDENTIAL,
        files: []
    },
    mode: 'onBlur'
  })

  useEffect(() => {
    form.setValue('files', files, { shouldValidate: true, shouldDirty: true });
  }, [files, form]);

  async function onSubmit(propertyData: propertyFormType){
        console.log("onSubmit function triggered!")
        console.log(propertyData)
        const formData = new FormData()
        formData.append('title', propertyData.title)
        formData.append('city', propertyData.city)
        formData.append('address', propertyData.address)
        formData.append('description', propertyData.description)
        formData.append('bedrooms', propertyData.bedrooms.toString())
        formData.append('bathrooms', propertyData.bathrooms.toString())
        formData.append('latitude', propertyData.latitude.toString())
        formData.append('longitude', propertyData.longitude.toString())
        formData.append('sale_or_rent', propertyData.sale_or_rent)
        formData.append('price', propertyData.price.toString())
        formData.append('size', propertyData.size.toString())
        formData.append('type', propertyData.type)
        formData.append('agent_id', propertyData.agent)
        if (propertyData.floor !== undefined && propertyData.floor > 0) {
            formData.append('floor', propertyData.floor.toString());
          }
        propertyData.files.forEach(fileWithPreview => {
            formData.append('files', fileWithPreview); // Append the actual File object from FilesWithPreview
        });
        try {
            setSubmitting(true)
            const token = localStorage.getItem("access_token");
            const response = await authFetch('http://127.0.0.1:8000/api/v1/properties/', {
              method: 'POST',
              body: formData,
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            });
      
            const res = await response.json()
            if (response.ok) {
              toast.success('Property created successfully')
              console.log(res)
              setTimeout(() => {
                navigate('/dashboard/properties')
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

    <div>
        <h1 className='font-medium text-2xl text-left'>Fill The Form With The Property Info</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-6">


       <div className='bg-primary-foreground p-4 rounded-lg'>
             <FormField
            control={form.control}
            name='title'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder='property title' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

       </div>

       <div className='bg-primary-foreground p-4 rounded-lg'>
        <FormField
            control={form.control}
            name='city'
            render={({field}) => (
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input placeholder='City' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>

        <div className='bg-primary-foreground p-4  rounded-lg'>
        <FormField
            control={form.control}
            name='address'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                        <Input placeholder='address' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>


        <div className='bg-primary-foreground p-4  rounded-lg'>
            <FormField
                control={form.control}
                name='bedrooms'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                            <Input type='number' min={0} placeholder='number of bedrooms' {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
        </div>

        <div className='bg-primary-foreground p-4  rounded-lg'>
            <FormField
                control={form.control}
                name='bathrooms'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='number of bathrooms' min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
        </div>

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
                control={form.control}
                name='price'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='property price or rent/month' step={.01} min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
         </div>

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
                control={form.control}
                name='size'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='property size' step={.01} min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
         </div>
 

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
                control={form.control}
                name='latitude'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='property latitude' step="any" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
         </div>
  

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
                control={form.control}
                name='longitude'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                            <Input type='number' step="any" placeholder='property longitude' {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )} />
         </div>
       

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
                control={form.control}
                name='floor'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Floor</FormLabel>
                        <FormControl>
                            <Input type='number' min={0} placeholder='floor number' {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                        </FormControl>
                        <FormMessage/>
                        <FormDescription>
                            If property type is an apartment or has multiple floors, provide floor number otherwise skip.
                        </FormDescription>
                    </FormItem>
                )} />
         </div>
        
            <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {
                            Object.values(PropertyType).map(type => (
                                 <SelectItem key={type}  value={type}>{type}</SelectItem>
                            ))
                        }
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
        </div>

         <div className='bg-primary-foreground p-4  rounded-lg'>
             <FormField
              control={form.control}
              name="sale_or_rent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale or Rent</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sale or Rent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {
                            Object.values(SaleRent).map(type => (
                                 <SelectItem key={type}  value={type}>{type}</SelectItem>
                            ))
                        }
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
             />
         </div>

         <div className='bg-primary-foreground p-4 rounded-lg'>
             <FormField
              control={form.control}
              name="agent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Agent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {
                            agents.map(agent => (
                                 <SelectItem key={agent.id}  value={agent.id}>{agent.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
             />
         </div>

        <div className='lg:col-span-3 bg-primary-foreground p-4 rounded-lg'>
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Describe the property"
                        className="resize-none h-48"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
            />
        </div>

        <div className='lg:col-span-3 bg-primary-foreground p-4 rounded-lg my-1'>
               
                    <FormItem>
                        <FormLabel>Property Images</FormLabel>
                        <FormControl>
                        <ImageUploader maximumFiles={8} files={files} setFiles={setFiles} />
                        </FormControl>
                        {form.formState.errors.files && <FormMessage>{form.formState.errors.files.message}</FormMessage>}
                 
                        
                    </FormItem>
        </div>
        
        
            <Button type='submit' className="cursor-pointer lg:col-span-3 place-self-center rounded-lg w-[80%] py-4 hover:opacity-80">
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
    </div>
  )
}