import { Command } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { NavUser } from "./nav-content/NavUser"
import { AssistantNavContent } from "./nav-content/AssistantNavContent"
import { PublicNavContent } from "./nav-content/PublicNavContent"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function PerdusSidebar({ ...props }) {
  const { user, role } = useAuth()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Perdus</span>
                  <span className="truncate text-xs">{role === 'assistant' ? 'Assistant' : 'User'}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {role === 'assistant' ? <AssistantNavContent /> : <PublicNavContent />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.displayName || 'User',
          email: user?.email || '',
          avatar: user?.photoURL || '',
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
