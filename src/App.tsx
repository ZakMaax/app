import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from "react-hot-toast"
const Home = lazy(() => import("@/public/pages/Home"));
const About = lazy(() => import("@/public/pages/About"));
const ContactPage = lazy(() => import("@/public/pages/Contact"));
const Properties = lazy(() => import("@/public/pages/Properties"));
const PublicLayout = lazy(() => import("@/public/pages/RootLayout"));
const Error404 = lazy(() => import("@/public/pages/Error404"));
const Details = lazy(() => import("@/public/pages/Details"));
const Layout = lazy(() => import("@/dashboard/pages/Layout"));
const Dashboard = lazy(() => import("@/dashboard/pages/Dashboard"));
const Error = lazy(() => import("@/dashboard/pages/Error"));
const Users = lazy(() => import("@/dashboard/pages/Users"));
const CreateProperty = lazy(() => import("@/dashboard/pages/CreateProperty"));
const CreateUser = lazy(() => import("@/dashboard/pages/CreateUser"));
const EditUser = lazy(() => import("@/dashboard/pages/EditUser"));
const UserDetails = lazy(() => import("@/dashboard/pages/UserDetails"));
const LoginForm = lazy(() => import("@/dashboard/pages/Login"));
const Profile = lazy(() => import("@/dashboard/pages/Profile"));
const DashboardProperties = lazy(() => import("@/dashboard/pages/Dashboard-Properties"));
const EditProperty = lazy(() => import("@/dashboard/pages/EditProperty"));
const DashboardPropertyDetails = lazy(() => import("@/dashboard/pages/DashboardPropertyDetails"));
import { get_users, get_agents, get_properties, get_appointments } from "@/API/api";
const DashboardAppointments = lazy(() => import("@/dashboard/pages/Appointments"));
import "leaflet/dist/leaflet.css";
import { requireAuth } from "@/utils/auth";
import { Agent } from "@/utils/types";
import PageLoader from "@/components/PageLoader";

const router = createBrowserRouter([

  {
    path: "login/", Component: LoginForm

  },

  {
    path: "/",
    Component: PublicLayout,
    errorElement: <Error404 />,
    children: [
      { index: true, 
        Component: Home,
        HydrateFallback: PageLoader
      },
      { path: "about", 
        Component: About,
        HydrateFallback: PageLoader
      },
      { path: "contact", 
        Component: ContactPage,
        HydrateFallback: PageLoader
      },
      { path: "listings/", loader: async ({ request }) => {
        const url = new URL(request.url);
        const params = url.searchParams;
        const apiUrl = new URL("http://localhost:8000/api/v1/properties/");
        params.forEach((value, key) => apiUrl.searchParams.set(key, value));
        const res = await fetch(apiUrl.toString());
        if (!res.ok) {
          throw new Response("Failed to fetch properties", { status: res.status });
        }
        return await res.json();
      },
      Component: Properties,
      HydrateFallback: PageLoader
    },

      { path: "listings/:listingID", 
        Component: Details, 
        HydrateFallback: PageLoader 
      },
    ],
  },

  {
    path: "dashboard/",
    id: "dashboard",
    Component: Layout,
    HydrateFallback: PageLoader,
    loader: async () => {
      const user = requireAuth(["admin", "agent"]);
      let agents: Agent[] | undefined;
      if (user.role === "admin") {
        agents = await get_agents();
      } 
      return {agents};
    }, 

    children:[
      {index: true, loader: () => requireAuth(["admin", "agent"]), Component: Dashboard},

      // Admin only
      {
        path: 'properties',
        loader: async () => {
          const user = requireAuth(["admin", "agent"]);
          let properties;
          if (user.role === "admin") {
            properties = await get_properties();
          } else {
            properties = await get_properties({ userID: user.sub }); // <-- use userID
          }
          return { properties, role: user.role };
        },
        Component: DashboardProperties,
        HydrateFallback: PageLoader
      },
      {path: 'properties/add-property', loader: async () => {
        requireAuth(["admin"]);
        const agents = await get_agents();
        return agents;
      }, 
      Component: CreateProperty,
      HydrateFallback: PageLoader
    },

      {path: 'properties/edit-property', loader: () => requireAuth(["admin"]), Component: EditProperty},

      {path: 'users', loader: async () => {
        requireAuth(["admin"]);
        const users = await get_users();
        return users;
      }, 
      Component: Users,
      HydrateFallback: PageLoader
    },

    {path: 'profile/', 
      loader: () => requireAuth(["admin", "agent"]), 
      Component: Profile, 
      HydrateFallback: PageLoader
    },

      {path: 'users/:userId', 
        loader: () => requireAuth(["admin"]), 
        Component: UserDetails, 
        HydrateFallback: PageLoader
      },
      {path: 'users/add-user', 
        loader: () => requireAuth(["admin"]), 
        Component: CreateUser, 
        HydrateFallback: PageLoader
      },
      {path: 'users/edit-user', 
        loader: () => requireAuth(["admin"]), 
        Component: EditUser, 
        HydrateFallback: PageLoader
      },
      { path: 'properties/:propertyId', 
        loader: () => requireAuth(["admin", "agent"]), 
        Component: DashboardPropertyDetails,
        HydrateFallback: PageLoader
      },
      {
        path: 'appointments',
        loader: async () => {
          const user = requireAuth(["admin", "agent"]);
          let appointments;
          if (user.role === "admin") {
              appointments = await get_appointments();
          } else {
              appointments = await get_appointments({ agent_id: user.sub }); // <-- use userID
          }
          return { appointments };
        },
        Component: DashboardAppointments,
        HydrateFallback: PageLoader
      },

      {
        path: "*",
        element: <Error /> 
      }
    ]
  }


]);


function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
      <div><Toaster position="bottom-right"/></div>
    </Suspense>
  );
}

export default App;
