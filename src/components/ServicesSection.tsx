import { Button } from "@/components/ui/button";

interface ServiceItem {
  name: string;
  price: string;
  description: string;
}

interface ServiceCategory {
  title: string;
  icon: string;
  services: ServiceItem[];
}

const ServicesSection = () => {
  const serviceCategories: ServiceCategory[] = [
    {
      title: "Hair Care & Styling",
      icon: "💇",
      services: [
        { name: "Haircut (Men/Women)", price: "₹299 onwards", description: "Professional styling for all hair types" },
        { name: "Hair Spa", price: "₹599 onwards", description: "Deep nourishment and relaxation" },
        { name: "Keratin / Smoothening", price: "₹2,999 onwards", description: "Silky smooth, manageable hair" },
        { name: "Hair Color & Highlights", price: "₹1,499 onwards", description: "Transform your look with vibrant colors" }
      ]
    },
    {
      title: "Beauty & Skin Care",
      icon: "💅",
      services: [
        { name: "Facial & Cleanup", price: "₹799 onwards", description: "Glowing, refreshed skin" },
        { name: "De-tan Treatment", price: "₹499 onwards", description: "Remove tan and brighten skin" },
        { name: "Party & Bridal Makeup", price: "₹3,499 onwards", description: "Look stunning for special occasions" },
        { name: "Nail Art", price: "₹699 onwards", description: "Beautiful, creative nail designs" }
      ]
    },
    {
      title: "Relaxation & Grooming",
      icon: "💆",
      services: [
        { name: "Head Massage", price: "₹299 onwards", description: "Stress relief and relaxation" },
        { name: "Beard Grooming", price: "₹199 onwards", description: "Sharp, well-maintained beard" },
        { name: "Full Body Massage", price: "₹1,999 onwards", description: "Complete body relaxation" }
      ]
    }
  ];

  const handleBookService = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Our Services & Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Experience premium salon services with transparent pricing. All prices in ₹ INR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="bg-card rounded-2xl shadow-card-custom p-8 border border-accent/10 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex} 
                    className="border-b border-border/50 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{service.name}</h4>
                      <span className="text-accent font-bold text-sm whitespace-nowrap ml-2">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70">{service.description}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="salon" 
                className="w-full mt-6"
                onClick={handleBookService}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        {/* Special Note */}
        <div className="text-center bg-gradient-rose rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            🌟 Special Packages Available
          </h3>
          <p className="text-foreground/80">
            Ask about our combo packages for bridal, party, and grooming services. 
            Get better value with our customized service bundles!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;