import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeywordChipProps {
  keyword: string;
  onRemove?: (keyword: string) => void;
  variant?: "default" | "highlighted" | "suggested";
  className?: string;
}

export function KeywordChip({ 
  keyword, 
  onRemove, 
  variant = "default",
  className = "" 
}: KeywordChipProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "highlighted":
        return "bg-primary text-white border-primary shadow-glow";
      case "suggested":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
      default:
        return "bg-primary/5 text-primary border-primary/10 hover:bg-primary/10";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${getVariantStyles()} ${className}`}
    >
      {variant === "highlighted" && (
        <Sparkles className="h-3 w-3" />
      )}
      <span className="text-sm font-medium">{keyword}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(keyword);
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );
}

interface KeywordChipsContainerProps {
  keywords: string[];
  onRemove?: (keyword: string) => void;
  variant?: "default" | "highlighted" | "suggested";
  title?: string;
  description?: string;
  className?: string;
}

export function KeywordChipsContainer({
  keywords,
  onRemove,
  variant = "default",
  title,
  description,
  className = ""
}: KeywordChipsContainerProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <KeywordChip
            key={`${keyword}-${index}`}
            keyword={keyword}
            onRemove={onRemove}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
