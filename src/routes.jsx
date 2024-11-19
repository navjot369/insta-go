import Home from "./components/home"
import Account from "./components/account"
import Login from "./components/account/login"

const routes = [
    {
        path: "/",
        element: <Home />
    },{
        path: "/account",
        element: <Account />,
        children: [
            {
                path: "/account/signin",
                element: <div>Hello</div>
            },{
                path: "/account/login",
                element: <Login />
            }
        ]
    }
]

export default routes;