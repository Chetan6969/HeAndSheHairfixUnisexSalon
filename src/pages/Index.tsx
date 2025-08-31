import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
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