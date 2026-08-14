import "./ProductGrid.css";

import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products, loading }) {

    if (loading) {

        return (

            <div className="product-grid-loading">

                <h2>Loading Products...</h2>

            </div>

        );

    }

    if (!loading && products.length === 0) {

        return (

            <div className="product-grid-loading">

                <h2>No Products Found</h2>

                <p>Try changing your search or category filter.</p>

            </div>

        );

    }

    return (

        <div className="product-grid">

            {

                products.map((product) => (

                    <ProductCard

                        key={product.id}

                        product={product}

                    />

                ))

            }

        </div>

    );

}

export default ProductGrid;