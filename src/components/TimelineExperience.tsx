import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  skills: string[];
}

interface TimelineExperienceProps {
  experiences: Experience[];
  onEdit?: (experience: Experience) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  editable?: boolean;
}

export function TimelineExperience({
  experiences,
  onEdit,
  onDelete,
  onAdd,
  editable = true
}: TimelineExperienceProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>
      
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Experience card */}
            <Card className="flex-1 bg-white/80 backdrop-blur-md shadow-soft border-0 hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {experience.role}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-primary">
                      {experience.company}
                    </CardDescription>
                  </div>
                  
                  {editable && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(experience)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete?.(experience.id)}
                        className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.startDate} - {experience.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>

                {experience.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Skills Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add new experience button */}
        {editable && onAdd && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex items-center gap-6"
          >
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={onAdd}
              className="flex-1 h-16 border-dashed border-2 border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Add Work Experience</span>
              </div>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
