import { ChevronUp, Home, Inbox, LogOut,  User,  Users, Calendar} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"

import { useTheme } from "@/components/theme-provider"

import Logo_light from '@/assets/Logo-no-bg.png'
import Logo_dark from '@/assets/GS-dark-no-bg.png'
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "@/utils/auth"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useEffect, useState } from "react"

type link = {
  title: string,
  url: string,
  icon: React.ElementType
}

const adminLinks: link[] = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Properties", url: "properties", icon: Inbox },
  { title: "Users", url: "users", icon: Users },
  { title: "Appointments", url: "appointments", icon: Calendar },
];

const agentLinks: link[] = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "My Properties", url: "properties", icon: Inbox },
  { title: "My Appointments", url: "appointments", icon: Calendar },
];



export default function AppSidebar() {
  const { theme } = useTheme()
  const { open } = useSidebar()
  const [items, setItems] = useState<link[]>([]);
  const [sidebarLabel, setSidebarLabel] = useState("Dashboard");
  const navigate = useNavigate()

  const access_token = localStorage.getItem("access_token")

  useEffect(() => {
    const currentUser = getUserFromToken();

    if (currentUser) {
      if (currentUser.role === "admin") {
        setItems(adminLinks);
        setSidebarLabel("Admin");
      } else if (currentUser.role === "agent") {
        setItems(agentLinks);
        setSidebarLabel("Agent");
      } else {
        setItems([]);
        setSidebarLabel("Dashboard");
      }
    } else {
      setItems([]);
      setSidebarLabel("Dashboard");
    }
  }, [access_token]);

    const effectiveTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
    : theme

  const logo = effectiveTheme === 'dark' ? Logo_dark : Logo_light


  function logout(){
    localStorage.removeItem('access_token')
    navigate('/login' , { replace: true });
  }


  return (

    <Sidebar collapsible="icon">
      <SidebarHeader className="py-2">
        <Link to='/dashboard' className="flex items-center gap-1">
          <img src={logo} alt="" className={`${open ? "w-20 h-20" : "w-16 h-16"} object-contain`} />
          <h1 className={`text-xl ${open ? "block" : "hidden"}`}>Guryasamo</h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
              <SidebarMenu>
                  {
                    items.map(item => (
                      <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link to={item.url}>
                                <item.icon/>
                                <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  }
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
                  <User/> Profile <ChevronUp className="ml-auto"/>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} align="end">
        <DropdownMenuItem asChild>
            <Link to={'/dashboard/profile'}>
             <User className="h-[1.2rem] w-[1.2rem] mr-2"/> 
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" asChild>
          <button onClick={logout} className="flex gap-2.5">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"/>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    
  );

}