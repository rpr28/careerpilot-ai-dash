import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  GraduationCap,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Welcome & Overview"
  },
  { 
    title: "Resume Builder", 
    url: "/resume", 
    icon: FileText,
    description: "Create your professional resume"
  },
  { 
    title: "Recommended Courses", 
    url: "/courses", 
    icon: GraduationCap,
    description: "Upskill based on your profile"
  },
  { 
    title: "Job Matches", 
    url: "/jobs", 
    icon: Briefcase,
    description: "Find your next opportunity"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      className={`border-r border-border bg-gradient-subtle transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Career Journey
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-primary/10 relative ${
                          isActive
                            ? "bg-primary/15 text-primary font-medium border-r-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-full transition-colors ${
                          state.open ? 'bg-primary/10' : 'bg-muted/50'
                        }`}>
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          {state.open && (
                            <div className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Step indicator */}
                      {state.open && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full font-mono">
                            {index + 1}
                          </span>
                          {index < items.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progress indicator */}
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Your Progress
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-1/4 transition-all duration-300"></div>
                </div>
                <span className="text-xs text-muted-foreground">25%</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}