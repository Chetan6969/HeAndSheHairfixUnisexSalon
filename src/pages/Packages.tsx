import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Heart, Star, Sparkles, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  services: string[];
  target_audience: string;
}

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("price", { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPackageIcon = (targetAudience: string) => {
    switch (targetAudience) {
      case "groom": return Crown;
      case "bride": return Heart;
      case "regular": return Star;
      default: return Sparkles;
    }
  };

  const getPackageTheme = (targetAudience: string) => {
    switch (targetAudience) {
      case "groom": 
        return {
          gradient: "from-blue-500 to-indigo-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-900"
        };
      case "bride":
        return {
          gradient: "from-pink-500 to-rose-600",
          bg: "bg-pink-50", 
          border: "border-pink-200",
          text: "text-pink-900"
        };
      case "regular":
        return {
          gradient: "from-purple-500 to-violet-600",
          bg: "bg-purple-50",
          border: "border-purple-200", 
          text: "text-purple-900"
        };
      default:
        return {
          gradient: "from-gray-500 to-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-900"
        };
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading packages...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Premium Packages</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose from our specially curated packages designed for grooms, brides, 
          and regular customers. Save more with our comprehensive service bundles.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => {
          const Icon = getPackageIcon(pkg.target_audience);
          const theme = getPackageTheme(pkg.target_audience);
          const isPopular = pkg.target_audience === "bride";

          return (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                isPopular ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {isPopular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${theme.gradient} text-white p-6`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <p className="text-white/80 capitalize">{pkg.target_audience} Special</p>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1">
                  <IndianRupee className="h-5 w-5" />
                  <span className="text-3xl font-bold">{pkg.price.toLocaleString()}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">{pkg.description}</p>
                
                {/* Services Included */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-foreground">Services Included:</h4>
                  <div className="space-y-2">
                    {pkg.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className={`${theme.bg} ${theme.border} border rounded-lg p-4 mb-6`}>
                  <div className={`${theme.text} text-sm space-y-1`}>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>Save up to 25% on individual services</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>Priority booking slots</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span>Complimentary consultation</span>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to="/booking" state={{ selectedPackage: pkg }}>
                    Book This Package
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Package CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30">
        <CardContent className="text-center p-8">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Package?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Can't find exactly what you're looking for? We'll create a personalized 
            package just for you based on your specific needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="tel:+916263587072">Call for Custom Package</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/booking">Book Consultation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Package Benefits</CardTitle>
          <CardDescription>Why choose our packages over individual services?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Significant Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Save 20-25% compared to booking individual services
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Comprehensive Care</h4>
                  <p className="text-sm text-muted-foreground">
                    Curated services that complement each other perfectly
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Priority Treatment</h4>
                  <p className="text-sm text-muted-foreground">
                    Get preferred booking slots and faster service
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Expert Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Our stylists ensure all services work together seamlessly
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Flexible Scheduling</h4>
                  <p className="text-sm text-muted-foreground">
                    Book all services in one session or spread across multiple visits
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Guaranteed Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete satisfaction guarantee on all package services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Packages;