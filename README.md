# Railway Booking System

A modern full-stack application for managing train seat reservations with a beautiful and intuitive user interface.

## Features

- **User Authentication**
  - Secure registration and login system
  - JWT-based authentication
  - Protected routes

- **Train Booking**
  - Interactive seat selection
  - Real-time seat availability
  - Multiple passenger booking
  - Journey details management

- **Booking Management**
  - View booking history
  - Cancel bookings
  - View ticket details
  - Filter bookings by status

- **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Intuitive interface
  - Material-UI components

## Tech Stack

### Frontend
- React.js
- Material-UI
- Framer Motion
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/231Kishan/RailwayBooking.git
cd RailwayBooking
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
train_Reservation/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID
- `DELETE /api/bookings/:id` - Cancel booking

### Seats
- `GET /api/seats` - Get all seats
- `GET /api/seats/:id` - Get seat by ID
- `PUT /api/seats/:id` - Update seat status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Kishan Tiwari - [GitHub](https://github.com/231Kishan)

Project Link: [https://railway-booking-bay.vercel.app/](https://railway-booking-bay.vercel.app/)

