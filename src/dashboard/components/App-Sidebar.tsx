import { ChevronUp, Home, Inbox, LogOut, Search, Settings, User, User2, Users} from "lucide-react"
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
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const items = [
  {
    title: "Home",
    url: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    url: "properties",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export default function AppSidebar() {
  const { theme } = useTheme()
  const { open } = useSidebar()


    const effectiveTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
    : theme

  const logo = effectiveTheme === 'dark' ? Logo_dark : Logo_light

  return (

    <Sidebar collapsible="icon">
      <SidebarHeader className="py-2">
        <Link to='/admin-dashboard' className="flex items-center gap-1">
          <img src={logo} alt="" className={`${open ? "w-20 h-20" : "w-16 h-16"} object-contain`} />
          <h1 className={`text-xl ${open ? "block" : "hidden"}`}>Guryasamo</h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
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
          <DropdownMenuItem><User2/> Profile</DropdownMenuItem>
          <DropdownMenuItem><Settings/> Settings</DropdownMenuItem>
          <DropdownMenuItem variant="destructive"><LogOut/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    
  );

}