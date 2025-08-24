import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, MapPin, Search, Filter, ExternalLink, Sparkles } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  requiredSkills: string[];
  description: string;
  type: string;
  experience: string;
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Acme Corp",
    location: "San Francisco, CA",
    matchPercentage: 82,
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    description: "Build modern web applications using React and TypeScript",
    type: "Full-time",
    experience: "3-5 years"
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "NovaLabs",
    location: "New York, NY",
    matchPercentage: 68,
    requiredSkills: ["SQL", "Python", "Tableau", "Statistics"],
    description: "Analyze large datasets to drive business insights",
    type: "Full-time",
    experience: "2-4 years"
  },
  {
    id: "3",
    title: "Product Intern",
    company: "Orbit",
    location: "Austin, TX",
    matchPercentage: 74,
    requiredSkills: ["Product Strategy", "User Research", "Figma", "Analytics"],
    description: "Support product team with research and strategy",
    type: "Internship",
    experience: "0-1 years"
  }
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all-locations");
  const [experienceFilter, setExperienceFilter] = useState("all-levels");
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSearch = () => {
    let filtered = sampleJobs;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (locationFilter && locationFilter !== "all-locations") {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    if (experienceFilter && experienceFilter !== "all-levels") {
      filtered = filtered.filter(job => job.experience === experienceFilter);
    }
    
    setFilteredJobs(filtered);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-success bg-success/10 border-success/20";
    if (percentage >= 60) return "text-warning bg-warning/10 border-warning/20";
    return "text-muted-foreground bg-muted/50 border-muted";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Job Matches</h1>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Jobs
          </CardTitle>
          <CardDescription>
            Find opportunities that match your skills and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="san francisco">San Francisco, CA</SelectItem>
                <SelectItem value="new york">New York, NY</SelectItem>
                <SelectItem value="austin">Austin, TX</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-levels">All Levels</SelectItem>
                <SelectItem value="0-1 years">Entry Level (0-1 years)</SelectItem>
                <SelectItem value="2-4 years">Mid Level (2-4 years)</SelectItem>
                <SelectItem value="3-5 years">Senior Level (3-5 years)</SelectItem>
                <SelectItem value="5+ years">Lead Level (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSearch} className="bg-gradient-primary">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all-locations");
                setExperienceFilter("all-levels");
                setFilteredJobs(sampleJobs);
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Results */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or clear filters to see more results
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} className="shadow-soft hover:shadow-medium transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 font-medium ${getMatchColor(job.matchPercentage)}`}
                      >
                        {job.matchPercentage}% Match
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.experience}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 lg:ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                          onClick={() => setSelectedJob(job)}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Apply with Tailored Resume
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply to {selectedJob?.title}</DialogTitle>
                          <DialogDescription>
                            CareerPilot will tailor your resume to match this job's requirements and submit your application.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Match Score:</span>
                              <Badge className={getMatchColor(selectedJob?.matchPercentage || 0)}>
                                {selectedJob?.matchPercentage}%
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>✓ Resume will be optimized for required skills</p>
                              <p>✓ Cover letter will be generated automatically</p>
                              <p>✓ Application will be submitted on your behalf</p>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">
                            Preview Application
                          </Button>
                          <Button className="bg-gradient-primary">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Submit Application
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}