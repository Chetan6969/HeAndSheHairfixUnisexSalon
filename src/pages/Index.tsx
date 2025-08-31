import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Package, Calendar } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      
      {/* Quick Links Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore Our Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our advanced services and book your perfect appointment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link to="/face-analysis" className="group">
              <div className="bg-background border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all group-hover:border-primary">
                <Camera className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">AI Style Suggestions</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized hairstyle recommendations using our AI face analysis
                </p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Try Now
                </Button>
              </div>
            </Link>
            
            <Link to="/packages" className="group">
              <div className="bg-background border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all group-hover:border-primary">
                <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Premium Packages</h3>
                <p className="text-muted-foreground mb-4">
                  Save more with our curated packages for grooms, brides, and regulars
                </p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  View Packages
                </Button>
              </div>
            </Link>
            
            <Link to="/booking" className="group">
              <div className="bg-background border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all group-hover:border-primary">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-muted-foreground mb-4">
                  Book your appointment online with our simple booking system
                </p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Book Now
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">He & She Hairfix Unisex Salon</h3>
            <p className="text-primary-foreground/80">Where Style Meets Elegance</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-primary-foreground/70">
            <span>📍 Bharhut Nagar, Satna, MP</span>
            <span>📞 +91 6263587072</span>
            <span>📧 chetansen2004@gmail.com</span>
          </div>
          
          <div className="mt-6 pt-4 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 He & She Hairfix Unisex Salon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;