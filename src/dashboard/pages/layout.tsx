import { Outlet } from 'react-router-dom'
import AppSidebar from "../components/App-Sidebar";
import Navbar from '../components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className='flex'>
            <SidebarProvider>
                <AppSidebar/>
                <main className='w-full'>
                    <Navbar/>
                    <div className='px-4'>
                        <Outlet/>
                    </div>
                </main>
            </SidebarProvider>
          </div>
    </ThemeProvider>
  )
}