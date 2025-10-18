import { Heart, Sparkles, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Designed by</span>
            <span className="font-heading font-semibold text-foreground">Fina</span>
            <span className="text-primary">|</span>
            <span className="flex items-center gap-1">
              Empowered by <Sparkles className="h-3 w-3 text-primary" /> AI
            </span>
            <span className="text-primary">|</span>
            <span className="flex items-center gap-1">
              Built for the <Heart className="h-3 w-3 text-destructive fill-destructive" /> Future
            </span>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            © 2025 BMI Insight. Transforming health through intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
