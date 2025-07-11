import { LogOut, User, PanelRightClose, PanelLeftClose} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getUserFromToken } from "@/utils/auth";

export default function Navbar() {

  const navigate = useNavigate()
  const user = getUserFromToken()

  function logout(){
    localStorage.removeItem('access_token')
    navigate('/login' , { replace: true });
  }

  const {toggleSidebar, open} = useSidebar()

  return (
    <nav className="p-4 flex items-center justify-between">
       <Button variant="outline" onClick={toggleSidebar}>
          {
            open ? <PanelLeftClose/> : <PanelRightClose/> 
          }
       </Button>

      
      <div className="flex  items-center gap-4">
         <Link to='/dashboard'>Dashboard</Link>
         <ModeToggle/>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
          <AvatarImage src={user?.avatar || "http://localhost:8000/uploads/default_avatar.png"} />
            <AvatarFallback>{user?.name?.slice(0,2).toUpperCase() || "CN"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
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


      </div>

    </nav>
  )
}