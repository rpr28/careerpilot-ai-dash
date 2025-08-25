import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Sparkles } from "lucide-react";

interface ATSScoreProps {
  score: number;
  maxScore?: number;
  title?: string;
  description?: string;
  showDetails?: boolean;
}

export function ATSScore({ 
  score, 
  maxScore = 100, 
  title = "ATS Score", 
  description = "Resume optimization score",
  showDetails = true 
}: ATSScoreProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (score >= 80) return { text: "Good", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 70) return { text: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (score >= 60) return { text: "Needs Work", color: "text-orange-600", bg: "bg-orange-50" };
    return { text: "Poor", color: "text-red-600", bg: "bg-red-50" };
  };

  const status = getScoreStatus(score);

  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-soft border-0 hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Background circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: 0, strokeDashoffset: circumference }}
                animate={{ 
                  strokeDasharray: strokeDasharray, 
                  strokeDashoffset: strokeDashoffset 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-center"
              >
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </div>
                <div className="text-xs text-muted-foreground">out of {maxScore}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${status.bg}`}>
              <span className="text-sm font-medium">Status</span>
              <span className={`text-sm font-semibold ${status.color}`}>
                {status.text}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Keywords</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="text-muted-foreground">Length</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="text-muted-foreground">Structure</span>
                <span className="font-medium">Good</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
