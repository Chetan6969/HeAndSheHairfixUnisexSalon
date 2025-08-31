import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, IndianRupee, User, Phone, Mail, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration_minutes: number;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  services: string[];
  target_audience: string;
}

interface BookingForm {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  selectedServices: Service[];
  selectedPackage: Package | null;
  notes: string;
}

const Booking = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    appointmentDate: "",
    appointmentTime: "",
    selectedServices: [],
    selectedPackage: null,
    notes: "",
  });

  useEffect(() => {
    fetchData();
    
    // Pre-select service or package from location state
    if (location.state?.selectedService) {
      setBookingForm(prev => ({
        ...prev,
        selectedServices: [location.state.selectedService]
      }));
    }
    
    if (location.state?.selectedPackage) {
      setBookingForm(prev => ({
        ...prev,
        selectedPackage: location.state.selectedPackage
      }));
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      const [servicesResult, packagesResult] = await Promise.all([
        supabase.from("services").select("*").order("category", { ascending: true }),
        supabase.from("packages").select("*").order("price", { ascending: false })
      ]);

      if (servicesResult.error) throw servicesResult.error;
      if (packagesResult.error) throw packagesResult.error;

      setServices(servicesResult.data || []);
      setPackages(packagesResult.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load booking data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Services" },
    { id: "hair", name: "Hair Services" },
    { id: "beauty", name: "Beauty Services" },
    { id: "grooming", name: "Grooming Services" },
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const toggleService = (service: Service) => {
    if (bookingForm.selectedPackage) {
      // Clear package if selecting individual services
      setBookingForm(prev => ({
        ...prev,
        selectedPackage: null,
        selectedServices: [service]
      }));
    } else {
      setBookingForm(prev => ({
        ...prev,
        selectedServices: prev.selectedServices.find(s => s.id === service.id)
          ? prev.selectedServices.filter(s => s.id !== service.id)
          : [...prev.selectedServices, service]
      }));
    }
  };

  const selectPackage = (pkg: Package) => {
    setBookingForm(prev => ({
      ...prev,
      selectedPackage: pkg,
      selectedServices: [] // Clear individual services
    }));
  };

  const calculateTotal = () => {
    if (bookingForm.selectedPackage) {
      return bookingForm.selectedPackage.price;
    }
    return bookingForm.selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const calculateDuration = () => {
    if (bookingForm.selectedPackage) {
      return 180; // 3 hours for packages
    }
    return bookingForm.selectedServices.reduce((total, service) => total + service.duration_minutes, 0);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 22; // 10 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingForm.customerName || !bookingForm.customerPhone || !bookingForm.appointmentDate || !bookingForm.appointmentTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!bookingForm.selectedPackage && bookingForm.selectedServices.length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service or package.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        customer_name: bookingForm.customerName,
        customer_phone: bookingForm.customerPhone,
        customer_email: bookingForm.customerEmail,
        appointment_date: bookingForm.appointmentDate,
        appointment_time: bookingForm.appointmentTime,
        service_ids: bookingForm.selectedServices.map(s => s.id),
        package_id: bookingForm.selectedPackage?.id || null,
        total_amount: calculateTotal(),
        payment_status: "pending",
        status: "confirmed",
      };

      const { error } = await supabase
        .from("bookings")
        .insert([bookingData]);

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been booked successfully. We'll contact you soon for confirmation.",
      });

      // Reset form
      setBookingForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        appointmentDate: "",
        appointmentTime: "",
        selectedServices: [],
        selectedPackage: null,
        notes: "",
      });

      // Simulate Razorpay payment (for demo)
      setTimeout(() => {
        toast({
          title: "Payment Initiated",
          description: "Redirecting to Razorpay payment gateway... (Demo Mode)",
        });
      }, 2000);

    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading booking form...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Book Your Appointment</h1>
          <p className="text-xl text-muted-foreground">
            Choose your services and schedule your visit to our salon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Packages Section */}
            <Card>
              <CardHeader>
                <CardTitle>Premium Packages</CardTitle>
                <CardDescription>Save more with our curated service packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => selectPackage(pkg)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        bookingForm.selectedPackage?.id === pkg.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{pkg.name}</h4>
                        <div className="flex items-center text-sm font-bold">
                          <IndianRupee className="h-4 w-4" />
                          {pkg.price.toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {pkg.target_audience}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Individual Services */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Services</CardTitle>
                <CardDescription>Select individual services to customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        bookingForm.selectedServices.find(s => s.id === service.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">{service.name}</h4>
                        <div className="flex items-center text-xs font-semibold">
                          <IndianRupee className="h-3 w-3" />
                          {service.price}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {service.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {service.duration_minutes} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form & Summary */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingForm.selectedPackage && (
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-sm">{bookingForm.selectedPackage.name}</h4>
                    <p className="text-xs text-muted-foreground">{bookingForm.selectedPackage.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs">Package Price</span>
                      <div className="flex items-center text-sm font-bold">
                        <IndianRupee className="h-3 w-3" />
                        {bookingForm.selectedPackage.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {bookingForm.selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.duration_minutes} min</p>
                    </div>
                    <div className="flex items-center text-sm font-semibold">
                      <IndianRupee className="h-3 w-3" />
                      {service.price}
                    </div>
                  </div>
                ))}

                {(bookingForm.selectedPackage || bookingForm.selectedServices.length > 0) && (
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Duration
                      </span>
                      <span>{calculateDuration()} minutes</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        Total
                      </span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Full Name *
                    </Label>
                    <Input
                      id="customerName"
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        customerName: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Phone Number *
                    </Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={bookingForm.customerPhone}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        customerPhone: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email (optional)
                    </Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={bookingForm.customerEmail}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        customerEmail: e.target.value
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentDate" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Appointment Date *
                    </Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingForm.appointmentDate}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        appointmentDate: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime" className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Appointment Time *
                    </Label>
                    <select
                      id="appointmentTime"
                      value={bookingForm.appointmentTime}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        appointmentTime: e.target.value
                      }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select time</option>
                      {generateTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Special Requests (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({
                        ...prev,
                        notes: e.target.value
                      }))}
                      placeholder="Any special requests or notes for your appointment..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? "Processing..." : `Book & Pay ₹${calculateTotal().toLocaleString()}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;