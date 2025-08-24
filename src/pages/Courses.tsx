import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, TrendingUp, ExternalLink, Sparkles } from "lucide-react";

interface Course {
  id: string;
  title: string;
  platform: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  targetRole: string;
  description: string;
  skills: string[];
  rating: number;
  enrolled: string;
}

const recommendedCourses: Course[] = [
  {
    id: "1",
    title: "SQL for Data Analysis",
    platform: "Coursera",
    duration: "12h",
    level: "Intermediate",
    targetRole: "Data Analyst",
    description: "Master SQL queries, joins, and advanced analytics functions for real-world data analysis projects.",
    skills: ["SQL", "Data Analysis", "Database Design"],
    rating: 4.8,
    enrolled: "45K"
  },
  {
    id: "2",
    title: "React Basics for Frontend Development",
    platform: "Udemy",
    duration: "8h",
    level: "Beginner",
    targetRole: "Frontend Engineer",
    description: "Learn React fundamentals including components, state management, and modern hooks.",
    skills: ["React", "JavaScript", "Frontend Development"],
    rating: 4.6,
    enrolled: "32K"
  },
  {
    id: "3",
    title: "Data Visualization with Python",
    platform: "edX",
    duration: "10h",
    level: "Intermediate",
    targetRole: "Data Analyst",
    description: "Create compelling visualizations using matplotlib, seaborn, and plotly libraries.",
    skills: ["Python", "Data Visualization", "Matplotlib"],
    rating: 4.7,
    enrolled: "28K"
  },
  {
    id: "4",
    title: "Product Management Fundamentals",
    platform: "Coursera",
    duration: "15h",
    level: "Beginner",
    targetRole: "Product Manager",
    description: "Understand product lifecycle, user research, and strategic planning for successful products.",
    skills: ["Product Strategy", "User Research", "Analytics"],
    rating: 4.9,
    enrolled: "67K"
  },
  {
    id: "5",
    title: "Advanced TypeScript Patterns",
    platform: "Udemy",
    duration: "6h",
    level: "Advanced",
    targetRole: "Frontend Engineer",
    description: "Master advanced TypeScript features and design patterns for scalable applications.",
    skills: ["TypeScript", "Design Patterns", "Advanced Programming"],
    rating: 4.5,
    enrolled: "18K"
  },
  {
    id: "6",
    title: "Machine Learning with Python",
    platform: "edX",
    duration: "20h",
    level: "Advanced",
    targetRole: "Data Scientist",
    description: "Implement machine learning algorithms and build predictive models using scikit-learn.",
    skills: ["Machine Learning", "Python", "Scikit-learn"],
    rating: 4.8,
    enrolled: "89K"
  }
];

export default function Courses() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-success bg-success/10 border-success/20";
      case "Intermediate":
        return "text-warning bg-warning/10 border-warning/20";
      case "Advanced":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted/50 border-muted";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Coursera":
        return "text-primary bg-primary/10 border-primary/20";
      case "Udemy":
        return "text-accent bg-accent/10 border-accent/20";
      case "edX":
        return "text-purple-600 bg-purple-100 border-purple-200";
      default:
        return "text-muted-foreground bg-muted/50 border-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Course Recommendations</h1>
      </div>

      {/* Recommended for You Section */}
      <Card className="shadow-medium bg-gradient-card border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Recommended for You</CardTitle>
          </div>
          <CardDescription>
            AI-curated courses based on your skill gaps and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all duration-200 border-0 bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={getPlatformColor(course.platform)}>
                      {course.platform}
                    </Badge>
                    <Badge variant="outline" className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {course.rating} ({course.enrolled})
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-3 w-3 text-accent" />
                      <span className="text-xs font-medium text-accent">AI Insight</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Boosts match score for <span className="font-medium text-accent">{course.targetRole}</span> positions
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Suggestion */}
      <Card className="shadow-soft border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Suggested Learning Path
          </CardTitle>
          <CardDescription>
            Complete these courses in sequence for maximum career impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium">React Basics for Frontend Development</h4>
                <p className="text-sm text-muted-foreground">Build foundation in modern frontend development</p>
              </div>
              <Badge variant="outline" className="text-success bg-success/10 border-success/20">
                8h
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Advanced TypeScript Patterns</h4>
                <p className="text-sm text-muted-foreground">Level up with type-safe development practices</p>
              </div>
              <Badge variant="outline" className="text-warning bg-warning/10 border-warning/20">
                6h
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Product Management Fundamentals</h4>
                <p className="text-sm text-muted-foreground">Expand into product strategy and leadership</p>
              </div>
              <Badge variant="outline" className="text-accent bg-accent/10 border-accent/20">
                15h
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-primary/5 border border-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Completion Benefits</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Completing this path increases your match score by an average of <span className="font-bold text-primary">+15%</span> for Frontend Engineer and Product Manager roles.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}