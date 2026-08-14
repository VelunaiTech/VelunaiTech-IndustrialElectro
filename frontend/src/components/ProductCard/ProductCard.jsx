import "./ProductCard.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaImage } from "react-icons/fa";

function ProductCard({ product }) {
    const hasImage =
        product.images &&
        product.images.length > 0 &&
        product.images[0].image;

    return (
        <article className="product-card">

            {/* Product Image */}
            <div className="product-image">

                {hasImage ? (
                    <img
                        src={product.images[0].image}
                        alt={product.name}
                    />
                ) : (
                    <div className="product-image-placeholder">
                        <FaImage />
                        <span>No Image Available</span>
                    </div>
                )}

                {/* Category */}
                {product.category && (
                    <span className="product-category">
                        {product.category.name}
                    </span>
                )}

            </div>

            {/* Product Information */}
            <div className="product-body">

                <span className="product-brand">
                    {product.brand}
                </span>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-bottom">

                    <div className="product-price">
                        ₹ {Number(product.price).toLocaleString("en-IN")}
                    </div>

                    <Link
                        to={`/product/${product.id}`}
                        className="details-button"
                    >
                        View Details
                        <FaArrowRight />
                    </Link>

                </div>

            </div>

        </article>
    );
}

export default ProductCard;