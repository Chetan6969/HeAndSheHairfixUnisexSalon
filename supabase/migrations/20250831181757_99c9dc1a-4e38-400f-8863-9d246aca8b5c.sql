-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table  
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  services TEXT[],
  target_audience TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_ids TEXT[],
  package_id UUID REFERENCES public.packages(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table for chatbot
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  sender TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for services (public read)
CREATE POLICY "Services are viewable by everyone" 
ON public.services FOR SELECT USING (true);

-- Create policies for packages (public read)
CREATE POLICY "Packages are viewable by everyone" 
ON public.packages FOR SELECT USING (true);

-- Create policies for bookings (public create, admin view)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view their own bookings" 
ON public.bookings FOR SELECT USING (true);

-- Create policies for chat messages (public create/read)
CREATE POLICY "Anyone can create chat messages" 
ON public.chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view chat messages for their session" 
ON public.chat_messages FOR SELECT USING (true);

-- Insert sample services
INSERT INTO public.services (name, category, description, price, duration_minutes) VALUES
-- Hair Services
('Men''s Haircut', 'hair', 'Professional men''s haircut with styling', 299, 45),
('Women''s Haircut', 'hair', 'Women''s precision cut and styling', 499, 60),
('Hair Spa Treatment', 'hair', 'Deep conditioning and nourishing hair spa', 599, 90),
('Keratin Treatment', 'hair', 'Smoothening and straightening treatment', 2999, 180),
('Hair Coloring', 'hair', 'Full hair color with premium products', 1499, 120),
('Highlights', 'hair', 'Professional hair highlights', 1999, 150),

-- Beauty Services
('Basic Facial', 'beauty', 'Deep cleansing and moisturizing facial', 799, 60),
('Premium Facial', 'beauty', 'Advanced anti-aging facial treatment', 1299, 90),
('Cleanup', 'beauty', 'Basic face cleanup and grooming', 499, 45),
('De-tan Treatment', 'beauty', 'Remove tan and brighten skin', 699, 60),
('Bridal Makeup', 'beauty', 'Complete bridal makeup package', 3499, 120),
('Party Makeup', 'beauty', 'Glamorous party makeup', 1999, 75),

-- Grooming Services  
('Beard Styling', 'grooming', 'Professional beard trim and styling', 199, 30),
('Head Massage', 'grooming', 'Relaxing scalp and head massage', 299, 30),
('Full Body Massage', 'grooming', 'Complete body relaxation massage', 1999, 90),
('Nail Art', 'grooming', 'Creative nail design and art', 699, 45),
('Manicure', 'grooming', 'Complete hand and nail care', 399, 45),
('Pedicure', 'grooming', 'Complete foot and nail care', 499, 60);

-- Insert sample packages
INSERT INTO public.packages (name, description, price, services, target_audience) VALUES
('Groom Package Premium', 'Complete grooming package for grooms including haircut, facial, massage and styling', 9999, 
 ARRAY['Men''s Haircut', 'Premium Facial', 'Beard Styling', 'Head Massage', 'Full Body Massage'], 'groom'),
 
('Bride Package Luxury', 'Comprehensive bridal package with all beauty treatments', 14999,
 ARRAY['Women''s Haircut', 'Hair Spa Treatment', 'Bridal Makeup', 'Premium Facial', 'Manicure', 'Pedicure'], 'bride'),
 
('Monthly Care Package', 'Regular maintenance package for monthly visits', 9999,
 ARRAY['Haircut', 'Basic Facial', 'Head Massage', 'Cleanup'], 'regular');