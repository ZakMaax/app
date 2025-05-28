import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "@/public/pages/Home"
import Properties from "@/public/pages/Properties";
import PublicLayout from "@/public/pages/RootLayout";
import Error404 from "@/public/pages/Error404";
import Details from "@/public/pages/Details";
import Layout from "@/dashboard/pages/Layout";
import Dashboard from "@/dashboard/pages/Dashboard"
import Users from "@/dashboard/pages/Users"
import CreateProperty from "@/dashboard/pages/CreateProperty";
import CreateUser from "@/dashboard/pages/CreateUser";
import EditUser from "@/dashboard/pages/EditUser";
import {get_users, get_agents} from "@/API/api"

import "leaflet/dist/leaflet.css";
import DashboardProperties from "./dashboard/pages/Dashboard-Properties";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    errorElement: <Error404 />,
    children: [
      { index: true, Component: Home },
      { path: "listings/",Component: Properties },
      { path: "listings/:listing", Component: Details },
    ],
  },

  {
    path: "admin-dashboard/",
    element: <Layout/>,

    children:[
      {index: true, loader: async () => {
        const agents = await get_agents() 
        return agents
      }, Component: Dashboard},
      {path: 'properties', Component: DashboardProperties},
      {path: 'properties/add-property', Component: CreateProperty},
      {path: 'users', loader: async () => {
        const users = await get_users() 
        return users
      }, Component: Users},
      {path: 'users/add-user', Component: CreateUser},
      {path: 'users/edit-user', Component: EditUser},
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
