import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FoodSelection from './components/user/FoodSelection';
import MainCourse from './components/user/MainCourse';
import Breads from './components/user/Breads';
import ExtraBreads from './components/user/ExtraBreads';
import Desserts from './components/user/Desserts';
import Cart from './components/user/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/select-food" element={<FoodSelection />} />
          <Route path="/main-course" element={<MainCourse />} />
          <Route path="/breads" element={<Breads />} />
          <Route path="/extra-breads" element={<ExtraBreads />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;