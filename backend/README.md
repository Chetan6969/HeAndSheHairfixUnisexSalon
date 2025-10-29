# He & She Hairfix Salon - Backend

Backend API for the salon booking system with MongoDB and email notifications.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

**Required Configuration:**

- **MongoDB**: Add your MongoDB connection string
- **Email Service**: Configure your SMTP/email service credentials
- **Admin Email**: Update with your actual admin email

### 3. MongoDB Setup Options

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and run:
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a cluster
3. Get connection string and add to `.env`

### 4. Email Service Setup

**Option A: Gmail**
1. Enable 2-factor authentication
2. Create app-specific password
3. Add credentials to `.env`

**Option B: SendGrid/Mailgun**
1. Create account and get API key
2. Configure SMTP settings in `.env`

**Option C: Testing (Ethereal)**
- Use [ethereal.email](https://ethereal.email) for testing
- No setup required, but emails won't be delivered

### 5. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Create Booking
```
POST /api/bookings/create
Body: {
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  service: string,
  packageType?: string,
  notes?: string
}
```

### Get All Bookings
```
GET /api/bookings/all
```

### Get Booking by ID
```
GET /api/bookings/:id
```

### Update Booking Status
```
PATCH /api/bookings/:id/status
Body: {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}
```

## Integration with Frontend

Update your frontend booking form to call:

```javascript
const response = await fetch('http://localhost:5000/api/bookings/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(bookingData)
});
```

## TODO List

- [ ] Add MongoDB connection string to `.env`
- [ ] Configure email service credentials
- [ ] Update admin email address
- [ ] Add Razorpay credentials for payments
- [ ] Implement authentication for admin routes
- [ ] Add rate limiting
- [ ] Add request validation middleware
- [ ] Set up logging
- [ ] Deploy to production server

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB configuration
├── models/
│   └── Booking.js        # Booking schema
├── routes/
│   └── booking.js        # Booking routes
├── services/
│   └── email.js          # Email service
├── .env.example          # Environment variables template
├── package.json          # Dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## Support

For issues or questions, contact: chetansen2004@gmail.com
