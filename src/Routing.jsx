import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

import App from './App'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './components/auth/Login'

import RegisterShop from './pages/RegisterShop'
import Dashboard from './pages/Dashboard'
import AddProducts from './pages/AddProducts'
import Products from './components/dashboard/Products'
import ProductDetails from './components/dashboard/ProductDetails'
import UpdateProduct from './components/dashboard/UpdateProduct'
import Analytics from './pages/Analytics'
import Orders from './components/orders/Orders'
import OrderDetails from './components/orders/OrderDetails'
import Profile from './pages/Profile'
import PublicRoute from './components/auth/PublicRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LowStock from './pages/LowStock.jsx'
const Routing = () => {
    
    const BrowserRouter  = createBrowserRouter([
        {
            path:"/",
            element:<App/>,
            errorElement:<Error/>,
            children:[
                {
                    path:"/",
                    element:(<PublicRoute><Home/></PublicRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/login",
                    element:(<PublicRoute><Login/></PublicRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/signup",
                    element:(<PublicRoute><RegisterShop/></PublicRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard",
                    element:(<ProtectedRoute><Dashboard/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/addProducts",
                    element:<ProtectedRoute><AddProducts/></ProtectedRoute>,
                    errorElement:<Error/>
                },
                {
                    path:"/analytics",
                    element:(<ProtectedRoute><Analytics/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products",
                    element:(<ProtectedRoute><Products/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products/details/:productId",
                    element:(<ProtectedRoute><ProductDetails/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products/update/:productId",
                    element:(<ProtectedRoute><UpdateProduct/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/analytics/:shopId",
                   element:(<ProtectedRoute><Analytics/></ProtectedRoute>),
                   errorElement:<Error/>
                },
                {
                    path:"/dashboard/orders",
                    element:(<ProtectedRoute><Orders/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/orders/details/:orderId",
                    element:(<ProtectedRoute><OrderDetails/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/profile",
                    element:(<ProtectedRoute><Profile/></ProtectedRoute>),
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/low-stock",
                    element:(<ProtectedRoute><LowStock/></ProtectedRoute>),
                    errorElement:<Error/>
                }
            ]
        }
       
    ])
   
  return (
  
     <RouterProvider router={BrowserRouter}/>
  
  )
}

export default Routing
