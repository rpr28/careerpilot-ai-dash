import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Download, Plus, Trash2, FileText, ArrowRight, CheckCircle, Briefcase, GraduationCap, Sparkles, Eye, Edit3, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KeywordChip, KeywordChipsContainer } from "@/components/KeywordChip";
import { TimelineExperience } from "@/components/TimelineExperience";

interface WorkExperience {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

export default function Resume() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [education, setEducation] = useState<Education[]>([
    { degree: "", school: "", year: "" }
  ]);

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    { id: "1", role: "", company: "", dates: "", bullets: [""] }
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const aiSuggestions = [
    { title: "Add action verbs", description: "Replace 'worked on' with 'led', 'developed', or 'implemented'" },
    { title: "Quantify impact", description: "Add metrics like '+24% CTR' or 'reduced costs by $50K'" },
    { title: "Match keywords", description: "Include 5-7 skills matching your target job description" },
    { title: "Optimize formatting", description: "Use consistent bullet points and clean spacing" },
  ];

  const suggestedKeywords = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "MongoDB"];

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { id: Date.now().toString(), role: "", company: "", dates: "", bullets: [""] }]);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  const handleGenerateResume = () => {
    setResumeGenerated(true);
  };

  const handleContinueToCourses = () => {
    navigate("/courses");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      {/* Left Panel - Form & AI Actions */}
      <div className="space-y-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Resume Builder</h1>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">Step 1: Build Your Resume</span>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  In Progress
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div 
                  className="bg-gradient-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Complete your resume to unlock personalized course recommendations
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Personal
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Basic contact details for your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="bg-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="San Francisco, CA"
                        className="bg-white/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4 mt-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Work Experience</CardTitle>
                      <CardDescription>Your professional experience</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={addWorkExperience}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TimelineExperience
                    experiences={workExperience.map(exp => ({
                      id: exp.id,
                      role: exp.role,
                      company: exp.company,
                      location: "San Francisco, CA",
                      startDate: exp.dates.split(" - ")[0] || "2020",
                      endDate: exp.dates.split(" - ")[1] || "Present",
                      description: "Professional experience in software development",
                      achievements: exp.bullets.filter(b => b.trim()),
                      skills: ["React", "TypeScript", "Node.js"]
                    }))}
                    editable={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 mt-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
                <CardHeader>
                  <CardTitle>Skills & Keywords</CardTitle>
                  <CardDescription>Technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        className="bg-white/50"
                      />
                      <Button onClick={addSkill} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <KeywordChipsContainer
                      keywords={skills}
                      onRemove={removeSkill}
                      title="Your Skills"
                      description="Click to remove skills"
                    />
                  </div>

                  <Separator />

                  <div>
                    <KeywordChipsContainer
                      keywords={suggestedKeywords}
                      variant="suggested"
                      title="Suggested Keywords"
                      description="Click to add to your skills"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4 mt-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Projects</CardTitle>
                      <CardDescription>Notable projects and achievements</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={addProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div>
                        <Label>Project Title</Label>
                        <Input placeholder="E-commerce Platform" className="bg-white/50" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea placeholder="Built a full-stack e-commerce platform using React and Node.js..." className="bg-white/50" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Generate Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-primary/20">
            <CardContent className="pt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={handleGenerateResume}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Resume
                </Button>
              </motion.div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Your resume will be generated as a PDF preview on the right
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Continue to Courses Button */}
        {resumeGenerated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-white/80 backdrop-blur-md shadow-soft border-green-200 bg-green-50/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="font-medium text-green-600">Resume Generated Successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great! Now let's find courses to enhance your skills based on your resume.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      onClick={handleContinueToCourses}
                    >
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Continue to Course Recommendations
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Right Panel - Live PDF Preview */}
      <div className="space-y-6 overflow-y-auto">
        {/* AI Suggestions Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-accent/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">AI Suggestions</CardTitle>
              </div>
              <CardDescription>
                Improve your resume with AI-powered recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-lg bg-accent/5 border border-accent/10"
                >
                  <h4 className="font-medium text-sm text-accent mb-2">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                  <CardDescription>Live preview of your generated resume</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" disabled={!resumeGenerated}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-[8.5/11] bg-white rounded-lg border-2 border-muted-foreground/20 flex items-center justify-center shadow-soft">
                {resumeGenerated ? (
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Resume Ready!</h3>
                      <p className="text-sm text-muted-foreground">
                        Your professional resume has been generated successfully
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 p-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Preview Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Click "Generate Resume" to see your preview
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}