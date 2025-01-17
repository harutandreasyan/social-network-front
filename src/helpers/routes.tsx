import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { Account } from "../pages/auth/account";
import { Followers } from "../pages/auth/followers";
import { Followings } from "../pages/auth/followings";
import { Requests } from "../pages/auth/requests";

export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
            { path: ':id', element: <Account /> },
            { path: 'followers', element: <Followers /> },
            { path: 'followings', element: <Followings /> },
            { path: 'requests', element: <Requests /> },
        ]
    }
])