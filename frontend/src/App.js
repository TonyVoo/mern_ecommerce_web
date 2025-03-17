import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './pages/ProductPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/ProfilePage";
import CartPage from './pages/CartPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import CategoryPage from "./pages/CategoryPage";
import Footer from './components/Footer';
import ReviewPage from './pages/ReviewPage';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage/>} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path='/review' element={<ReviewPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;