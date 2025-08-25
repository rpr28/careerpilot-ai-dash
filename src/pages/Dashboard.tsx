import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, GraduationCap, TrendingUp, Sparkles, ArrowRight, CheckCircle, Play, Compass, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ATSScore } from "@/components/ATSScore";
import heroImage from "@/assets/hero-image.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userJourney = [
    {
      step: 1,
      title: "Build Your Resume",
      description: "Create a professional resume that highlights your skills and experience",
      icon: FileText,
      status: "pending",
      action: () => navigate("/resume"),
      color: "text-primary"
    },
    {
      step: 2,
      title: "Get Course Recommendations",
      description: "Receive personalized course suggestions based on your resume analysis",
      icon: GraduationCap,
      status: "locked",
      action: () => navigate("/courses"),
      color: "text-muted-foreground"
    },
    {
      step: 3,
      title: "Find Job Matches",
      description: "Discover job opportunities that match your skills and career goals",
      icon: Briefcase,
      status: "locked",
      action: () => navigate("/jobs"),
      color: "text-muted-foreground"
    }
  ];

  const jobMatches = [
    { title: "Frontend Engineer", company: "TechCorp", match: 85, location: "San Francisco" },
    { title: "Product Manager", company: "InnovateLab", match: 78, location: "New York" },
    { title: "Data Analyst", company: "DataFlow", match: 72, location: "Remote" },
  ];

  const resumeVersions = [
    { name: "Software Engineer", lastModified: "2 hours ago", atsScore: 87 },
    { name: "Product Manager", lastModified: "1 day ago", atsScore: 82 },
    { name: "Data Analyst", lastModified: "3 days ago", atsScore: 75 },
  ];

  const insights = [
    { label: "Resume not created yet", icon: FileText, color: "text-muted-foreground", status: "pending" },
    { label: "0 course recommendations", icon: GraduationCap, color: "text-muted-foreground", status: "locked" },
    { label: "0 job matches found", icon: Briefcase, color: "text-muted-foreground", status: "locked" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Hero Section with Welcome Banner */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 md:p-12 text-white"
      >
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-medium opacity-90">Welcome back, {user?.email?.split('@')[0]} 🚀</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your resume is <span className="text-yellow-300">87%</span> ATS-ready
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl">
            Continue your career journey with intelligent resume building, personalized job matching, and targeted skill development.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/resume")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-glow"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Building Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ATS Score Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ATSScore 
            score={87} 
            title="ATS Score" 
            description="Your resume optimization score"
          />
        </motion.div>

        {/* Job Matches Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0 hover:shadow-medium transition-all duration-300 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Job Matches</CardTitle>
              </div>
              <CardDescription>Top opportunities for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobMatches.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/jobs")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{job.title}</h4>
                    <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-primary">{job.match}%</div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                onClick={() => navigate("/jobs")}
              >
                View All Matches
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Versions Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0 hover:shadow-medium transition-all duration-300 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Resume Versions</CardTitle>
              </div>
              <CardDescription>Your tailored resumes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeVersions.map((version, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate("/resume")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{version.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {version.lastModified}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-primary">{version.atsScore}%</div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                onClick={() => navigate("/resume")}
              >
                Create New Version
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* User Journey */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Your Career Journey</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to unlock personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userJourney.map((journey, index) => (
                <motion.div
                  key={journey.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    journey.status === 'pending' 
                      ? 'bg-primary/5 border-primary/20 hover:bg-primary/10 cursor-pointer shadow-soft' 
                      : 'bg-muted/30 border-border'
                  }`}
                  onClick={journey.status === 'pending' ? journey.action : undefined}
                >
                  <div className={`p-3 rounded-full ${
                    journey.status === 'pending' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    {journey.status === 'completed' ? (
                      <CheckCircle className={`h-5 w-5 ${journey.color}`} />
                    ) : (
                      <journey.icon className={`h-5 w-5 ${journey.color}`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{journey.title}</span>
                      {journey.status === 'pending' && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Next Step
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{journey.description}</p>
                  </div>
                  
                  {journey.status === 'pending' && (
                    <ArrowRight className="h-4 w-4 text-primary" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Progress Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Your Progress</CardTitle>
            </div>
            <CardDescription>
              Complete your resume to unlock personalized insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/30"
                >
                  <div className={`p-2 rounded-full bg-background ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{insight.label}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}