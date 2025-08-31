import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import salonHero from "@/assets/salon-hero.jpg";

const HeroSection = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={salonHero} 
          alt="He & She Hairfix Unisex Salon Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-75"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where Style Meets 
            <span className="block bg-gradient-to-r from-accent-light to-rose-gold bg-clip-text text-transparent animate-salon-glow">
              Elegance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90 font-light">
            He & She Hairfix Unisex Salon, Satna
          </p>
          
          <p className="text-lg mb-10 text-primary-foreground/80 max-w-2xl mx-auto">
            Experience metro city salon luxury in the heart of Madhya Pradesh. 
            Where every visit is a transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
              <Link to="/booking">Book Appointment Now</Link>
            </Button>
            <Button asChild variant="elegant" size="xl" className="w-full sm:w-auto">
              <Link to="/services">See Our Services</Link>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
              <h3 className="text-accent font-semibold mb-1">Expert Stylists</h3>
              <p className="text-sm text-primary-foreground/80">Professional team with years of experience</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
              <h3 className="text-accent font-semibold mb-1">Premium Products</h3>
              <p className="text-sm text-primary-foreground/80">World-class beauty and hair care brands</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
              <h3 className="text-accent font-semibold mb-1">Unisex Services</h3>
              <p className="text-sm text-primary-foreground/80">Complete grooming for both men and women</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;