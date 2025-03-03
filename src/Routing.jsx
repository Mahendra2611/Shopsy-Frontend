import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

import App from './App'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import RegisterShop from './pages/RegisterShop'
import Dashboard from './pages/Dashboard'
import AddProducts from './pages/AddProducts'
import Products from './components/dashboard/Products'
import ProductDetails from './components/dashboard/ProductDetails'
import UpdateProduct from './components/dashboard/UpdateProduct'
import Analytics from './pages/Analytics'
import Orders from './components/orders/Orders'
import OrderDetails from './components/orders/OrderDetails'
const Routing = () => {
    
    const BrowserRouter  = createBrowserRouter([
        {
            path:"/",
            element:<App/>,
            errorElement:<Error/>,
            children:[
                {
                    path:"/",
                    element:<Home/>,
                    errorElement:<Error/>
                },
                {
                    path:"/login",
                    element:<Login/>,
                    errorElement:<Error/>
                },
                {
                    path:"/signup",
                    element:<RegisterShop/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard",
                    element:<Dashboard/>,
                    errorElement:<Error/>
                },
                {
                    path:"/addProducts",
                    element:<AddProducts/>,
                    errorElement:<Error/>
                },
                {
                    path:"/analytics",
                    element:<Analytics/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products",
                    element:<Products/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products/details/:productId",
                    element:<ProductDetails/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/products/update/:productId",
                    element:<UpdateProduct/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/analytics/:shopId",
                   element:<Analytics/>,
                   errorElement:<Error/>
                },
                {
                    path:"/dashboard/orders",
                    element:<Orders/>,
                    errorElement:<Error/>
                },
                {
                    path:"/dashboard/orders/details/:orderId",
                    element:<OrderDetails/>,
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
