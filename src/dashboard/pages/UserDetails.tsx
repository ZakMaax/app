import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Property, Agent } from "@/utils/types";
import AdminPropertyCard from "@/dashboard/components/DashboardPropertyCard";
export default function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState<Agent | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [propertiesLoading, setPropertiesLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
          .then(res => res.json())
          .then(userData => {
            setUser(userData);
            setLoading(false);
            if (userData.role === "agent") {
              setPropertiesLoading(true);
              fetch(`http://127.0.0.1:8000/api/v1/properties?agent_id=${userId}`)
                .then(res => res.json())
                .then(setProperties)
                .finally(() => setPropertiesLoading(false));
            }
          });
      }, [userId]);
      if (loading || !user) return (
        <div className="flex items-center justify-center min-h-screen" role="status">
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-primaryColor"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      );
  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.name?.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <CardDescription>
              Created At: {user.date_created?.slice(0, 10)}
            </CardDescription>
            <CardDescription>Role: {user.role}</CardDescription>
          </div>
        </CardHeader>
        {user.role === "agent" && (
         <CardContent>
         <h3 className="font-semibold mb-2">Assigned Properties</h3>
         {propertiesLoading ? (
           <div>Loading properties...</div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {properties.length === 0 && <div>No properties assigned.</div>}
             {properties.map(property => (
               <AdminPropertyCard key={property.id} property={property} />
             ))}
           </div>
         )}
       </CardContent>
        )}
      </Card>
    </div>
  );
}


