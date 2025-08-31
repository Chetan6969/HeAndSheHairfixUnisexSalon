const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sunita Verma",
      rating: 5,
      text: "Best salon in Satna! I got my bridal makeup done here and everyone loved my look. The team is so professional and caring.",
      service: "Bridal Makeup"
    },
    {
      name: "Rahul Mishra", 
      rating: 5,
      text: "Professional staff, clean space, and affordable prices. My hair spa experience was amazing. Will definitely come back!",
      service: "Hair Spa"
    },
    {
      name: "Anjali Patel",
      rating: 5, 
      text: "The AI hairstyle suggestion was so cool! Got the perfect haircut for my face shape. Such innovative services!",
      service: "Haircut & Styling"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-accent' : 'text-muted-foreground/30'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            What Our Clients Say
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real experiences from our satisfied customers in Satna
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl shadow-card-custom p-8 border border-accent/10 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-foreground/80 mb-6 italic">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-accent">{testimonial.service}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
                    <span className="text-primary-foreground font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-xl p-8 max-w-2xl mx-auto border border-primary/10">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Join Our Happy Customers!
            </h3>
            <p className="text-foreground/70 mb-6">
              Book your appointment today and experience the difference that makes us Satna's favorite salon.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-foreground/60">
              <span>⭐ 4.9/5 Rating</span>
              <span>•</span>
              <span>500+ Happy Clients</span>
              <span>•</span>
              <span>3+ Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;