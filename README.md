# InstaGO

**InstaGO** is a modern platform designed to offer university students a convenient, eco-friendly, and cost-effective electric bike rental solution. By combining advanced technology with a seamless user experience, InstaGO simplifies short-distance travel while promoting sustainable transportation.

---

## Features

### **User Features**
- **Secure Registration & Login**: Authenticate via university email.
- **Real-Time Bike Availability**: Check availability at various stations.
- **Fare Estimation**: Get fare estimates based on distance or time.
- **Bike Booking**: Reserve bikes for immediate or scheduled use.
- **Online Payment**: Make bookings hassle-free via integrated payment gateways.

### **Admin Features**
- Manage bike inventory (add/remove bikes).
- Monitor bike availability and booking history.
- Analyze user activity with detailed reports.

---

## Tech Stack

### **Frontend**
- **React.js**: Dynamic, responsive Single Page Application (SPA).
- **React Router**: Smooth navigation.
- **Axios**: Secure API calls.

### **Backend**
- **Node.js**: Backend runtime.
- **Express.js**: Framework for RESTful APIs.
- **JWT Authentication**: Secure login.
- **Role-Based Access Control (RBAC)**: Restricted access for users and admins.

### **Database**
- **MongoDB**: NoSQL database for users, bikes, and bookings.
- **Mongoose**: Schema and data modeling.

### **Deployment**
- **Frontend**: Deployed on Vercel.
- **Backend**: Hosted on AWS EC2 with optional Docker support.
- **Database**: Managed via MongoDB Atlas.

---

## System Architecture

### **Core Components**
1. **Frontend**: SPA powered by React.js.
2. **Backend**: RESTful APIs using Node.js and Express.js.
3. **Database**: MongoDB with collections for:
   - **Users**: User profiles and credentials.
   - **Bikes**: Inventory and availability.
   - **Bookings**: User reservations and fare details.

### **Authentication**
- **JWT Tokens**: Stateless and secure.
- **Role-Based Authorization**: Admin vs. User functionality.

---

## API Endpoints

### **User Operations**
- `POST /register`: User registration.
- `POST /login`: User authentication.
- `GET /bikes`: Fetch bike availability.
- `POST /book`: Book a bike.
- `GET /history`: View booking history.

### **Admin Operations**
- `POST /admin/add-bike`: Add new bikes.
- `PUT /admin/update-bike`: Update bike details.

### **Payments**
- `POST /payment`: Process and validate payments via Razorpay.

---

## Database Schema

### **Users**
| Field       | Type       | Description                |
|-------------|------------|----------------------------|
| `_id`       | ObjectID   | Primary key.               |
| `name`      | String     | Full name of the user.     |
| `email`     | String     | University email.          |
| `password`  | String     | Hashed password.           |
| `role`      | String     | User or admin.             |

### **Bikes**
| Field       | Type       | Description                |
|-------------|------------|----------------------------|
| `_id`       | ObjectID   | Primary key.               |
| `station_id`| String     | Associated bike station.   |
| `status`    | String     | Available or unavailable.  |

### **Bookings**
| Field       | Type       | Description                |
|-------------|------------|----------------------------|
| `_id`       | ObjectID   | Primary key.               |
| `user_id`   | ObjectID   | Reference to Users.        |
| `bike_id`   | ObjectID   | Reference to Bikes.        |
| `fare`      | Number     | Fare for the booking.      |

---

### **Setting Up the Project Locally**
1. Clone the Repository
```
git clone https://github.com/navjot369/insta-go
cd instago
```

2. Set Up the Backend (Express.js + Node.js)
Navigate to the backend directory:
```
cd backend
npm install
```
Configure Environment Variables ane start the Backend Server:
```
npm start
```
The backend server will now be running on http://localhost:5000.

3. Set Up the Frontend (React.js)

Navigate to the frontend directory:
```
cd frontend
npm install
```
Configure Environment Variables and start the Frontend Development Server:
```
npm start
```

Open your browser and go to http://localhost:3000 to use the InstaGO platform locally.
You should be able to interact with the bike booking system, check availability, and manage bookings.


---
## Deployment

1. **Frontend**: Deployed on **Vercel** for seamless CI/CD.
2. **Backend**: Hosted on **AWS EC2** with Nginx or Docker.
3. **Database**: Managed by **MongoDB Atlas**.

---

## Future Enhancements
- **Multi-Campus Support**: Expand to multiple locations.
- **GPS Tracking**: Real-time location updates for bikes.
- **Bike Health Monitoring**: IoT sensors for maintenance alerts.
- **Enhanced User Profiles**: Save preferences and history.
- **Campus Service Integration**: Link with other university systems.

---

## Contribution

Contributions are welcome! Please fork this repository and submit a pull request for any feature or enhancement you'd like to add.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Let's make university travel sustainable and hassle-free!
