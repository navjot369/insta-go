import Account from "./components/account"
import Login from "./components/account/login"

const routes = [
    {
        path: "/",
        element: <div>HEllo there</div>
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