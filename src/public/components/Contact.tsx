import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, PreferredContactMethod } from "@/utils/schemas";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/Phone-input";
import { toast } from "react-hot-toast";
import contactIMG from "../../assets/contact.png";
import { FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      subject: "",
      message: "",
      preferred_contact_method: PreferredContactMethod.email,
    },
  });

  async function onSubmit(formData: z.infer<typeof contactSchema>) {
    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if(response.ok){
      toast.success("Message sent!");
      form.reset();
    } else{
      toast.error("Failed to send contact message.");
    }
    } catch(error) {
      console.error(error)
      toast.error("Network Error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact-section" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img
                  src={contactIMG}
                  alt="ContactUs tailwind section"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                />
                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                  Contact us
                </h1>
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block">
                    <a href="#" className="flex items-center mb-6">
                      <FaPhone className="text-4xl text-primaryColor" />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        123-45-6789
                      </h5>
                    </a>
                    <a href="#" className="flex items-center mb-6">
                      <IoMdMail className="text-4xl text-primaryColor" />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        Guryasamo@gmail.com
                      </h5>
                    </a>
                    <a href="#" className="flex items-center">
                      <MdLocationOn className="text-4xl text-primaryColor" />
                      <h5 className="text-black text-base font-normal leading-6 ml-5">
                        Road 1, Hargeisa, Maroodi-jeex, Somaliland
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-primaryColor font-manrope text-center md:text-left text-2xl md:text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          className="rounded-full h-12 text-lg bg-transparent border-gray-200 focus:border-primaryColor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="rounded-full h-12 text-lg bg-transparent border-gray-200 focus:border-primaryColor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Subject"
                          className="rounded-full h-12 text-lg bg-transparent border-gray-200 focus:border-primaryColor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferred_contact_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred method of communication</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex flex-row gap-8"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormItem className="flex items-center space-x-2">
                            <RadioGroupItem value={PreferredContactMethod.email} id="contact-email" />
                            <FormLabel htmlFor="contact-email" className="mb-0 cursor-pointer text-gray-500 text-base font-normal leading-6">
                              Email
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <RadioGroupItem value={PreferredContactMethod.phone} id="contact-phone" />
                            <FormLabel htmlFor="contact-phone" className="mb-0 cursor-pointer text-gray-500 text-base font-normal leading-6">
                              Phone
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          className="rounded-lg text-lg bg-transparent border-gray-200 focus:border-primaryColor"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={submitting}  className="w-full h-12 text-white text-xl font-semibold leading-6 rounded-full transition-all duration-200 bg-primaryColor hover:opacity-75 shadow-sm">
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      {submitting ? "Sending..." : "Send"}
                    </>
                  ) : (
                    'Submit'
                  )}
              </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}