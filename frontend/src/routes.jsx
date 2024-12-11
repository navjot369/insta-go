import Home from "./components/Home"
import Account from "./components/account"
import Login from "./components/account/login"
import Signup from "./components/account/signup/Signup"

const routes = [
    {
        path: "/",
        element: <Home />
    },{
        path: "/account",
        element: <Account />,
        children: [
            {
                path: "/account/signup",
                element: <Signup />
            },{
                path: "/account/login",
                element: <Login />
            }
        ]
    }
]

export default routes;