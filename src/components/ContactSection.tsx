import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: "📍",
      title: "Location", 
      details: "Bharhut Nagar, Satna, Madhya Pradesh, India",
      action: "Get Directions"
    },
    {
      icon: "📞",
      title: "Phone",
      details: "+91 6263587072",
      action: "Call Now"
    },
    {
      icon: "📧",
      title: "Email",
      details: "chetansen2004@gmail.com", 
      action: "Send Email"
    }
  ];

  const handleContactAction = (type: string, details: string) => {
    switch (type) {
      case "Phone":
        window.open(`tel:${details}`);
        break;
      case "Email":
        window.open(`mailto:${details}`);
        break;
      case "Location":
        window.open(`https://maps.google.com?q=${encodeURIComponent(details)}`);
        break;
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/916263587072?text=Hi, I would like to book an appointment at He & She Hairfix Salon`);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Get In Touch
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your look? Contact us today to book your appointment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="text-center bg-card rounded-2xl shadow-card-custom p-8 border border-accent/10 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{info.title}</h3>
                <p className="text-foreground/70 mb-4">{info.details}</p>
                <Button 
                  variant="salon"
                  size="sm"
                  onClick={() => handleContactAction(info.title, info.details)}
                >
                  {info.action}
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-primary rounded-2xl p-8 text-center text-primary-foreground shadow-luxury">
            <h3 className="text-2xl font-bold mb-4">Book Your Appointment Now</h3>
            <p className="text-primary-foreground/90 mb-6">
              Call us directly or send a WhatsApp message for instant booking
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="elegant" 
                size="lg"
                onClick={() => window.open('tel:+916263587072')}
              >
                📞 Call Now: +91 6263587072
              </Button>
              <Button 
                variant="elegant" 
                size="lg"
                onClick={handleWhatsApp}
              >
                💬 WhatsApp Booking
              </Button>
            </div>
          </div>

          {/* Hours */}
          <div className="mt-8 text-center bg-card/50 rounded-xl p-6 border border-accent/10">
            <h3 className="text-xl font-semibold text-primary mb-4">Salon Hours</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-foreground/70 max-w-md mx-auto">
              <div>Monday - Saturday</div>
              <div className="font-semibold">8:00 AM - 10:00 PM</div>
              <div>Sunday</div>
              <div className="font-semibold">9:00 AM - 9:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;