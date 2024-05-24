import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import HomePage from "./components/pages/home";
import "./App.css";
import TopBar from "./components/topBar";
import Navbar from "./components/navbar/index";
import Footer from "./components/footer";
import ProductsPage from "./components/pages/products";
import ProductPage from "./components/pages/product";
import CartPage from "./components/pages/cart";
import LoginPage from "./components/pages/login";
import SignupPage from "./components/pages/signup";
import AddProductPage from "./components/pages/addProduct";
import EditProductPage from "./components/pages/editProduct";
import AdminProtectedRoute from "./components/adminProtectedRoute";
import useUserAuthContext from "./components/context/userContext";
import { useEffect } from "react";

function App() {
  const userContext = useUserAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    userContext.validateToken();
  }, [navigate, userContext]);
  return (
    <>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/products">
          <Route
            path=""
            element={<AdminProtectedRoute Component={ProductsPage } />}
          />
          <Route
            path="/admin/products/add"
            element={<AdminProtectedRoute Component={AddProductPage} />}
          />

          <Route
            path="/admin/products/edit/:productId"
            element={<AdminProtectedRoute Component={EditProductPage}/>}
          />
        </Route>
        <Route
          path="*"
          element={
            <p className="w-full h-[40vh] flex items-center justify-center">
              404 not Found!
            </p>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
