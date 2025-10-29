// Booking Routes
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { sendBookingEmail } = require('../services/email');

// Create new booking
router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, date, time, service, packageType, notes } = req.body;
    
    // Validation
    if (!name || !email || !phone || !date || !time || !service) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be provided' 
      });
    }
    
    // Create booking in database
    const booking = new Booking({
      name,
      email,
      phone,
      date,
      time,
      service,
      packageType,
      notes
    });
    
    await booking.save();
    
    // Send email notification to admin
    try {
      await sendBookingEmail({
        name,
        email,
        phone,
        date,
        time,
        service,
        packageType,
        notes
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: booking
    });
    
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking' 
    });
  }
});

// Get all bookings (admin only)
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch bookings' 
    });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Fetch booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch booking' 
    });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update booking' 
    });
  }
});

module.exports = router;
