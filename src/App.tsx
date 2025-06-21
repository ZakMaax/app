import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "@/public/pages/Home"
import About from "@/public/pages/About"
import Properties from "@/public/pages/Properties";
import PublicLayout from "@/public/pages/RootLayout";
import Error404 from "@/public/pages/Error404";
import Details from "@/public/pages/Details";
import Layout from "@/dashboard/pages/Layout";
import Dashboard from "@/dashboard/pages/Dashboard"
import Error from "@/dashboard/pages/Error"
import Users from "@/dashboard/pages/Users"
import CreateProperty from "@/dashboard/pages/CreateProperty";
import CreateUser from "@/dashboard/pages/CreateUser";
import EditUser from "@/dashboard/pages/EditUser";
import UserDetails from "@/dashboard/pages/UserDetails";
import LoginForm from "@/dashboard/pages/Login";
import {get_users, get_agents, get_properties} from "@/API/api"

import "leaflet/dist/leaflet.css";
import DashboardProperties from "./dashboard/pages/Dashboard-Properties";
import EditProperty from "./dashboard/pages/EditProperty";
import DashboardPropertyDetails from "@/dashboard/pages/DashboardPropertyDetails";

const router = createBrowserRouter([

  {
    path: "login/", Component: LoginForm

  },

  {
    path: "/",
    Component: PublicLayout,
    errorElement: <Error404 />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
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
      },Component: Properties },
      { path: "listings/:listingID", Component: Details },
    ],
  },

  {
    path: "admin-dashboard/",
    Component: Layout,

    children:[
      {index: true, loader: async () => {
        const agents = await get_agents() 
        return agents;
      }, Component: Dashboard},
      {path: 'properties', loader: async () => {
        const properties = await get_properties() 
        return properties
      }, Component: DashboardProperties},
      { path: 'properties/:propertyId', Component: DashboardPropertyDetails},
      {path: 'properties/add-property', loader: async () => {
        const agents = await get_agents()
        return agents;
      }, Component: CreateProperty},
      {path: 'properties/edit-property', Component: EditProperty},
      {path: 'users', loader: async () => {
        const users = await get_users() 
        return users
      }, Component: Users},
      {path: 'users/:userId', Component: UserDetails},
      {path: 'users/add-user', Component: CreateUser},
      {path: 'users/edit-user', Component: EditUser},
      {
        path: "*",
        element: <Error /> 
      }
    ]
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div><Toaster position="bottom-right"/></div>
    </>
  );
}

export default App;
