import { z } from 'zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { editPropertySchema, PropertyType, FilesWithPreview } from '@/utils/schemas'
import { Property, SaleRent, Agent } from '@/utils/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ImageUploader from '@/dashboard/components/ImageUploader'
import { authFetch } from "@/utils/auth"
export default function EditProperty() {
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState<FilesWithPreview[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const navigate = useNavigate();
  const location = useLocation();
  const propertyToEdit: Property | undefined = location.state?.propertyToEdit;

  // Fetch agents on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/users/agents/")
      .then(res => res.json())
      .then(data => {
        // If your API returns { agents: [...] }
        if (Array.isArray(data)) {
          setAgents(data);
        } else if (Array.isArray(data.agents)) {
          setAgents(data.agents);
        } else {
          setAgents([]);
        }
      })
      .catch(() => setAgents([]));
  }, []);

  const form = useForm<z.infer<typeof editPropertySchema>>({
    resolver: zodResolver(editPropertySchema),
    defaultValues: {
      title: '',
      city: '',
      address: '',
      bedrooms: 1,
      bathrooms: 1,
      size: 1,
      price: 1,
      latitude: 0,
      longitude: 0,
      floor: undefined,
      type: PropertyType.RESIDENTIAL,
      sale_or_rent: SaleRent.SALE,
      agent_id: '',
      description: '',
      files: [],
    }
  })

  useEffect(() => {
    if (files.length > 0) {
      form.setValue('files', files, { shouldValidate: true });
    } else {
      form.setValue('files', undefined, { shouldValidate: true }); // <-- set to undefined, not []
      form.clearErrors('files');
    }
  }, [files, form]);

  useEffect(() => {
    if (propertyToEdit) {
      form.reset({
        title: propertyToEdit.title || '',
        city: propertyToEdit.city || '',
        address: propertyToEdit.address || '',
        bedrooms: propertyToEdit.bedrooms || 1,
        bathrooms: propertyToEdit.bathrooms || 1,
        size: propertyToEdit.size || 1,
        price: propertyToEdit.price || 1,
        latitude: propertyToEdit.latitude ?? 0,
        longitude: propertyToEdit.longitude ?? 0,
        floor: propertyToEdit.floor ?? undefined,
        type: propertyToEdit.type ?? PropertyType.RESIDENTIAL,
        sale_or_rent: propertyToEdit.sale_or_rent ?? SaleRent.SALE,
        agent_id: propertyToEdit.agent_id ?? '',
        description: propertyToEdit.description ?? '',
        files: [],
      }); 
      setFiles([]);
      
    }
  }, [propertyToEdit, form]);

  async function onSubmit(propertyData: z.infer<typeof editPropertySchema>) {
    if (!propertyToEdit?.id) {
      toast.error('Property ID not found');
      return;
    }

    const formData = new FormData();
    formData.append('title', propertyData.title);
    formData.append('city', propertyData.city);
    formData.append('address', propertyData.address);
    formData.append('bedrooms', propertyData.bedrooms.toString());
    formData.append('bathrooms', propertyData.bathrooms.toString());
    formData.append('size', propertyData.size.toString());
    formData.append('price', propertyData.price.toString());
    formData.append('latitude', propertyData.latitude.toString());
    formData.append('longitude', propertyData.longitude.toString());
    if (propertyData.floor !== undefined && propertyData.floor > 0) {
        formData.append('floor', propertyData.floor.toString());
      }
    formData.append('type', propertyData.type);
    formData.append('sale_or_rent', propertyData.sale_or_rent);
    formData.append('agent_id', propertyData.agent_id);
    formData.append('description', propertyData.description);
    if (propertyData.files && propertyData.files.length > 0) {
      propertyData.files.forEach((file: File) => {
        if (file.size > 0) formData.append('files', file);
      });
    }

    try {
      const token = localStorage.getItem("access_token")
      setSubmitting(true);
      const response = await authFetch(`http://127.0.0.1:8000/api/v1/properties/property/${propertyToEdit.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const res = await response.json();
      if (response.ok) {
        toast.success('Property updated successfully');
        setTimeout(() => {
          navigate('/admin-dashboard/properties');
        }, 2000);
      } else {
        toast.error(res.detail || 'Something happened while updating property');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-6">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Property title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="bedrooms" render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="bathrooms" render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="size" render={({ field }) => (
            <FormItem>
              <FormLabel>Size (sqft)</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="latitude" render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input type="number" min={-90} max={90} step="any" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="longitude" render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input type="number" min={-180} max={180} step="any" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="floor" render={({ field }) => (
            <FormItem>
              <FormLabel>Floor</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(PropertyType).map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="sale_or_rent" render={({ field }) => (
            <FormItem>
              <FormLabel>For</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sale or Rent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(SaleRent).map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {/* AGENT DROPDOWN */}
        <div className="bg-primary-foreground p-4 rounded-lg">
          <FormField control={form.control} name="agent_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agents.map(agent => (
                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {/* DESCRIPTION */}
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {/* IMAGES */}
        <div className="lg:col-span-3 bg-primary-foreground p-4 rounded-lg">
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <ImageUploader maximumFiles={10} files={files} setFiles={setFiles} />
            </FormControl>
            <FormDescription>
              If you add new images, the old ones will be replaced. If you do not add any images, the existing images will be kept.
            </FormDescription>
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