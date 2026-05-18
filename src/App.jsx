import UserContextProvider from './Context/UserContext';
import CounterContextProvider from './Context/CounterContext';
import CartContextProvider from './Context/CartContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import CategorySlider from './components/CategorySlider/CategorySlider';
import MainSlider from './components/Mainslider/Mainslider';
import Carts from './components/Carts/Carts';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders'
import Notfound from './components/Notfound/Notfound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails'; '.components/ProductDetails/ProductDetails.jsx';

import { Toaster } from 'react-hot-toast'

let routers = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            { index: true, element: <ProtectedRoutes><Products/></ProtectedRoutes>   },
            { path: 'Register', element: <Register /> },
            { path: 'Login', element: <Login /> },
            { path: 'brands', element:  <ProtectedRoutes><Brands /> </ProtectedRoutes>},
            {path:'productDetails/:id' , element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
            { path: 'carts', element: <ProtectedRoutes><Carts /></ProtectedRoutes> },
            {path:'allorders' , element:<ProtectedRoutes><Allorders/></ProtectedRoutes>},
            {path:'checkout/:cartId',element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},

            { path: '*', element: <Notfound /> }
        ]
    }
]);

function App() {
    return (
        <>
        <CartContextProvider>
            <UserContextProvider>
                <RouterProvider router={routers} />
                
                <Toaster/>
            </UserContextProvider>
        </CartContextProvider>
        </>
    );
}

export default App;


