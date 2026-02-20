import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'moto-review-hub';

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Moto Review Hub</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted source for motorcycle and safety gear reviews. Professional insights to keep you safe on the road.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/reviews" className="text-muted-foreground hover:text-foreground transition-colors">
                  Gear Reviews
                </a>
              </li>
              <li>
                <a href="/vlogs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Video Vlogs
                </a>
              </li>
              <li>
                <a href="/submit-review" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Review
                </a>
              </li>
              <li>
                <a href="/submit-vlog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Submit Vlog
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-moto-orange transition-colors">
                <SiFacebook size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-moto-orange transition-colors">
                <SiX size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-moto-orange transition-colors">
                <SiInstagram size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-moto-orange transition-colors">
                <SiYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Moto Review Hub. Built with <Heart className="text-moto-red fill-moto-red" size={16} /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-moto-orange hover:text-moto-red transition-colors font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
