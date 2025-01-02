import Home from "./components/home.jsx";
import Account from "./components/account";
import Login from "./components/account/login";
import Signup from "./components/account/signup/Signup";
import AboutUs from "./components/AboutUsPage/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import Landing from "./components/Landing";
import BookRide from "./components/BookRide";
import BookingRide from "./components/BookRide/BookingRide";
import AdminHome from "./components/admin/index.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminUsers from "./components/admin/AdminUsers.jsx";
import AdminBikes from "./components/admin/AdminBikes.jsx";
import AdminBookings from "./components/admin/AdminBookings.jsx";
import AdminHistory from "./components/admin/AdminHistory.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/About-us",
        element: <AboutUs />,
      },
      {
        path: "/Contact-us",
        element: <ContactUs />,
      },
      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "/account/signup",
            element: <Signup />,
          },
          {
            path: "/account/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/book",
        element: <BookRide />,
      },
      {
        path: "/booking",
        element: <BookingRide />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/bikes",
        element: <AdminBikes />
      },
      {
        path: "/admin/bookings",
        element: <AdminBookings />
      },
      {
        path: "/admin/history",
        element: <AdminHistory />
      }
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];

export default routes;
