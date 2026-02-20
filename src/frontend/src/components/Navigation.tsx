import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Motorcycles', path: '/motorcycles' },
    { label: 'Videos', path: '/videos' },
    { label: 'Submit Review', path: '/submit-review' },
    { label: 'Submit Video', path: '/submit-video' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/generated/logo.dim_200x60.png"
              alt="Moto Review Hub"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/80 hover:text-foreground font-semibold transition-colors duration-200 text-sm uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => navigate({ to: '/submit-review' })}
              className="bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Become a Sponsor
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-foreground font-semibold transition-colors duration-200 text-sm uppercase tracking-wide px-4 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate({ to: '/submit-review' });
                  }}
                  className="w-full bg-gradient-to-r from-moto-orange to-moto-red hover:from-moto-red hover:to-moto-orange text-white font-bold uppercase tracking-wider"
                >
                  Become a Sponsor
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
