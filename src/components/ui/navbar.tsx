import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, User, ArrowRight, CheckCircle, Compass } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  // If no user is logged in, don't show the navbar
  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

  // Define the user journey steps
  const steps = [
    { path: "/", title: "Dashboard", completed: true },
    { path: "/resume", title: "Resume Builder", completed: location.pathname !== "/" },
    { path: "/courses", title: "Courses", completed: location.pathname !== "/" && location.pathname !== "/resume" },
    { path: "/jobs", title: "Job Matches", completed: location.pathname !== "/" && location.pathname !== "/resume" && location.pathname !== "/courses" },
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  const currentStep = steps[currentStepIndex] || steps[0];

  const getNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      return steps[currentStepIndex + 1];
    }
    return null;
  };

  const nextStep = getNextStep();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-soft"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          {/* Brand Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PathPilot
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                AI Career Assistant
              </p>
            </div>
          </motion.div>

          {/* Current Step Indicator */}
          <div className="hidden lg:flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
            <span className="text-sm font-medium">{currentStep.title}</span>
            {nextStep && (
              <>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Next: {nextStep.title}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Progress indicator for mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {steps.map((step, index) => (
                <motion.div
                  key={step.path}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          {/* Next Step Button */}
          {nextStep && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                asChild
                className="hidden md:flex bg-gradient-primary text-white border-0 hover:shadow-glow"
              >
                <Link to={nextStep.path}>
                  Next: {nextStep.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200 shadow-soft">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md border-0 shadow-medium">
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                {user.email}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-primary/5">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}