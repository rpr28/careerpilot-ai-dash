import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Download, Plus, Trash2, FileText } from "lucide-react";

interface WorkExperience {
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
    { role: "", company: "", dates: "", bullets: [""] }
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [projects, setProjects] = useState([{ title: "", description: "" }]);

  const aiSuggestions = [
    { title: "Add action verbs", description: "Replace 'worked on' with 'led', 'developed', or 'implemented'" },
    { title: "Quantify impact", description: "Add metrics like '+24% CTR' or 'reduced costs by $50K'" },
    { title: "Match keywords", description: "Include 5-7 skills matching your target job description" },
    { title: "Optimize formatting", description: "Use consistent bullet points and clean spacing" },
  ];

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
    setWorkExperience([...workExperience, { role: "", company: "", dates: "", bullets: [""] }]);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "" }]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Resume Builder</h1>
        </div>

        {/* Personal Information */}
        <Card className="shadow-soft">
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
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your educational background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Degree</Label>
                  <Input placeholder="Bachelor of Science" />
                </div>
                <div>
                  <Label>School</Label>
                  <Input placeholder="University of California" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input placeholder="2020" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card className="shadow-soft">
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
          <CardContent className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Role</Label>
                    <Input placeholder="Software Engineer" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Tech Corp" />
                  </div>
                  <div>
                    <Label>Dates</Label>
                    <Input placeholder="Jan 2020 - Present" />
                  </div>
                </div>
                <div>
                  <Label>Key Achievements</Label>
                  <Textarea
                    placeholder="• Led development of new feature that increased user engagement by 25%&#10;• Collaborated with cross-functional teams to deliver projects on time"
                    className="min-h-24"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Technical and professional skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-soft">
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
                  <Input placeholder="E-commerce Platform" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Built a full-stack e-commerce platform using React and Node.js..." />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Generate Resume Button */}
        <Card className="shadow-soft border-primary/20">
          <CardContent className="pt-6">
            <Button size="lg" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <FileText className="mr-2 h-5 w-5" />
              Generate Resume
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Your resume will be generated as a PDF preview below
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions Panel */}
      <div className="space-y-6">
        <Card className="shadow-medium border-accent/20">
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
              <div key={index} className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                <h4 className="font-medium text-sm text-accent mb-2">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resume Preview Placeholder */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Resume Preview</CardTitle>
            <CardDescription>Generated resume will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[8.5/11] bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Click "Generate Resume" to see preview
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download PDF (Preview Mode)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}