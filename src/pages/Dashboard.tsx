import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, GraduationCap, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export default function Dashboard() {
  const navigate = useNavigate();

  const insights = [
    { label: "3 new job matches", icon: Briefcase, color: "text-primary" },
    { label: "1 resume suggestion", icon: FileText, color: "text-accent" },
    { label: "2 course picks", icon: GraduationCap, color: "text-success" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 md:p-12 text-primary-foreground">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-medium opacity-90">AI-Powered Career Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI Career Assistant
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl">
            Transform your career journey with intelligent resume building, personalized job matching, and targeted skill development recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/resume")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <FileText className="mr-2 h-5 w-5" />
              Build Resume
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/jobs")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Find Jobs
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/courses")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Today's Insights */}
      <section>
        <Card className="border-0 shadow-medium bg-gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Today's Insights</CardTitle>
            </div>
            <CardDescription>
              Stay updated with your latest career opportunities and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-background ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{insight.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}