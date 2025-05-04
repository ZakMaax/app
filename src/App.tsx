import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/public/pages/Home"
import Properties from "@/public/pages/Properties";
import PublicLayout from "@/public/pages/RootLayout";
import Error404 from "@/public/pages/Error404";
import Details from "@/public/pages/Details";
import Layout from "./dashboard/pages/layout";
import Dashboard from "./dashboard/pages/dashboard";

import "leaflet/dist/leaflet.css";
import DashboardProperties from "./dashboard/pages/Dashboard-Properties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "listings/", element: <Properties /> },
      { path: "listings/:listing", element: <Details /> },
    ],
  },

  {
    path: "dashboard/",
    element: <Layout/>,

    children:[
      {index: true, element: <Dashboard/>},
      {path: 'properties', element: <DashboardProperties/>},
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
