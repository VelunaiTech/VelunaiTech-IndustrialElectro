import "./FeaturedProducts.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../services/productService";

function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();

                console.log("Featured products:", data);

                // Show only the first 6 products
                setProducts(data.slice(0, 6));

            } catch (error) {
                console.error(
                    "Failed to load featured products:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className="featured-products">

            <div className="container">

                <div className="featured-header">

                    <div>

                        <span className="section-label">
                            OUR PRODUCTS
                        </span>

                        <h2>
                            Featured Products
                        </h2>

                        <p>
                            Explore our range of industrial
                            automation and electrical products.
                        </p>

                    </div>

                    <Link
                        to="/products"
                        className="view-all-products"
                    >
                        View All Products
                    </Link>

                </div>

                {loading ? (

                    <div className="featured-loading">
                        Loading products...
                    </div>

                ) : products.length === 0 ? (

                    <div className="featured-empty">
                        No products available.
                    </div>

                ) : (

                    <div className="featured-grid">

                        {products.map((product) => {

                            const image =
                                product.images &&
                                product.images.length > 0
                                    ? product.images[0].image
                                    : null;

                            return (

                                <article
                                    className="featured-card"
                                    key={product.id}
                                >

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="featured-image"
                                    >

                                        {image ? (

                                            <img
                                                src={image}
                                                alt={product.name}
                                            />

                                        ) : (

                                            <div className="featured-no-image">
                                                No Image
                                            </div>

                                        )}

                                    </Link>

                                    <div className="featured-content">

                                        <span className="featured-brand">
                                            {product.brand}
                                        </span>

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <div className="featured-bottom">

                                            <span className="featured-price">
                                                ₹ {product.price}
                                            </span>

                                            <Link
                                                to={`/product/${product.id}`}
                                                className="featured-view"
                                            >
                                                View
                                            </Link>

                                        </div>

                                    </div>

                                </article>

                            );
                        })}

                    </div>

                )}

            </div>

        </section>
    );
}

export default FeaturedProducts;