import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/utils/schemas";
import { z } from "zod";
import { getUserFromToken } from "@/utils/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const userFromToken = getUserFromToken();
  const userId = userFromToken?.sub;
  const [user, setUser] = useState(userFromToken);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username || "",
      old_password: "",
      new_password: "",
    },
  });

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/v1/users/${userId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          form.reset({
            username: data.username || "",
            old_password: "",
            new_password: "",
          });
        }
      });
    // eslint-disable-next-line
  }, [userId]);

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/profile/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUser(updated);
      toast.success("Profile updated!");
      form.reset({ username: updated.username, old_password: "", new_password: "" });
    } catch {
      toast.error("Could not update profile");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <div className="text-center py-10">No user found.</div>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar || "http://localhost:8000/uploads/default_avatar.png"} />
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <CardDescription>Role: {user.role}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Old password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="New password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}