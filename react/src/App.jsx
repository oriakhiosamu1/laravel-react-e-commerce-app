import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import SignIn from './pages/AuthenticationPages/SignIn';
import SignUp from './pages/AuthenticationPages/SignUp';
import NotFound from './pages/NotFound/NotFound';
import { ContextProvider } from './context/ContextProvider';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/AuthPages/Dashboard';
import Products from './pages/AuthPages/Products';
import Cart from './pages/AuthPages/Cart';
import View from './pages/AuthPages/View';
import Checkout from './pages/AuthPages/Checkout';
import Payment from './pages/AuthPages/Payment';

function App() {

  return (
    <ContextProvider>
        <Router>
            <Routes>

                <Route path='/' element={<GuestLayout />}>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                </Route>

                <Route path='/index' element={ <AuthLayout /> } >
                    <Route path='/index' element={ <Dashboard /> } />
                    <Route path='/index/products/:category' element={ <Products /> } />
                    <Route path='/index/cart' element={ <Cart /> } />
                    <Route path='/index/products' element={ <Products /> } />
                    <Route path='/index/product/:id' element={ <View /> } />

                    <Route path='/index/checkout' element={<Checkout />} />
                    <Route path='/index/paystack' element={ <Payment /> } />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    </ContextProvider>
  )
}

export default App
