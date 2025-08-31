const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
            About Us
          </h2>
          
          <div className="bg-card rounded-2xl shadow-luxury p-8 md:p-12 border border-accent/10">
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              <span className="text-primary font-semibold">He & She Hairfix Unisex Salon</span> is Satna's most loved destination for hair, beauty, and personal care. We believe everyone deserves to look and feel their best. With expert stylists, advanced treatments, and world-class products, we bring metro city salon experience to the heart of Madhya Pradesh.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              Whether you're looking for a bold transformation or a refreshing touch-up, we are here to pamper you with personalized care and attention to detail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Premium Experience</h3>
                <p className="text-foreground/70">Luxury treatments with professional care</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Expert Team</h3>
                <p className="text-foreground/70">Skilled stylists with years of expertise</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Quality Products</h3>
                <p className="text-foreground/70">International brands and safe ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;