import { useEffect, useState } from "react";
import "./FeaturedProducts.css";

import { getProducts } from "../../services/productService";

import ProductCard from "../ProductCard/ProductCard";

function FeaturedProducts() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    if (loading) {

        return <h2>Loading Products...</h2>;

    }

    return (

        <section className="featured-products">

            <div className="container">

                <div className="section-heading">

                    <h2>Featured Products</h2>

                    <p>

                        Premium industrial electrical components

                    </p>

                </div>

                <div className="products-grid">

                    {

                        products.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default FeaturedProducts;