import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-accent-foreground font-display font-bold text-lg">Q</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Qarzdaftar</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Xususiyatlar
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Tariflar
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Biz haqimizda
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="default">Kirish</Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="default">Boshlash</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-up">
            <div className="flex flex-col gap-4 pt-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                Xususiyatlar
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                Tariflar
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" onClick={() => setIsOpen(false)}>
                Biz haqimizda
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full">Kirish</Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero" className="w-full">Boshlash</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
