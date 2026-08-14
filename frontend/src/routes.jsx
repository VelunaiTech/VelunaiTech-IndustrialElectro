import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Contact from "./pages/Contact/Contact";
import RequestMaterial from "./pages/RequestMaterial/RequestMaterial";

export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/request-material" element={<RequestMaterial />} />

            </Routes>

        </BrowserRouter>
    );
}