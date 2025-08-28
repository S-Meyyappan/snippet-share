import { useRoutes,Navigate } from "react-router-dom"

import Add from "../Pages/Add"
import Disp from "../Pages/Disp"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Dashboard from "../Pages/Dashboard"

import MainLayout from "../layout/MainLayout"
import SnippetPage from "../Pages/Snippetpage"
import ProtectedRoute from "./protectedRoute"
import Home from "../Pages/Home"

const Approutes=()=>{
    const routes=useRoutes([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                index: true,
                element: <Home/>,
            },
            { path:'Add',element:(<ProtectedRoute><Add/></ProtectedRoute>)},
            { path:'View',element:(<ProtectedRoute><Disp/></ProtectedRoute>)},
            { path:'Dashboard',element:(<ProtectedRoute><Dashboard/></ProtectedRoute>)}
        ]
    },
    {
        path:'/snippet/:id',
        element:<SnippetPage/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
    ])
    return routes
}

export default Approutes