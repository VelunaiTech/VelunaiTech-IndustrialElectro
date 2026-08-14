import "./Products.css";

import Header from "../../components/Header/Header";
import ProductSidebar from "../../components/ProductSidebar/ProductSidebar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

function Products() {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "all"
    );

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        const loadData = async () => {

            try {

                const productsData = await getProducts();
                const categoryData = await getCategories();

                setProducts(productsData);
                setCategories(categoryData);

            } catch (error) {

                console.error(
                    "Failed to load products:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, []);


    /* =========================================================
       FILTER PRODUCTS
    ========================================================= */

    const filteredProducts = products.filter((product) => {

        const matchCategory =
            selectedCategory === "all"
                ? true
                : product.category?.id === Number(selectedCategory);


        const name =
            product.name?.toLowerCase() || "";

        const brand =
            product.brand?.toLowerCase() || "";

        const categoryName =
            product.category?.name?.toLowerCase() || "";


        const search =
            searchTerm.toLowerCase().trim();


        const matchSearch =
            name.includes(search) ||
            brand.includes(search) ||
            categoryName.includes(search);


        return matchCategory && matchSearch;

    });


    return (

        <>
            <Header />


            <main className="products-page">

                <div className="container">


                    {/* =================================================
                       PRODUCTS HEADING
                    ================================================= */}

                    <div className="products-heading">

                        <span className="products-eyebrow">
                            INDUSTRIAL ELECTRICAL PRODUCTS
                        </span>


                        <h1>
                            Industrial Products
                        </h1>


                        <p>
                            Explore our range of industrial automation
                            and electrical components from trusted brands.
                        </p>

                    </div>


                    {/* =================================================
                       PRODUCTS LAYOUT
                    ================================================= */}

                    <div className="products-layout">


                        {/* =================================================
                           SIDEBAR
                        ================================================= */}

                        <ProductSidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />


                        {/* =================================================
                           PRODUCT GRID
                        ================================================= */}

                        <ProductGrid
                            products={filteredProducts}
                            loading={loading}
                        />

                    </div>

                </div>

            </main>

        </>

    );

}

export default Products;