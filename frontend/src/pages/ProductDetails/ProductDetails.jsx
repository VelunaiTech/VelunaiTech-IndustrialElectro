import "./ProductDetails.css";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import { getProduct } from "../../services/productService";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(id);

                setProduct(data);

                if (data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0].image);
                }
            } catch (error) {
                console.error("Failed to load product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />

                <main className="product-details-state">
                    <div className="container">
                        <h2>Loading Product...</h2>
                    </div>
                </main>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Header />

                <main className="product-details-state">
                    <div className="container">
                        <h2>Product Not Found</h2>

                        <Link to="/products">
                            Back to Products
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="product-details">

                {/* ================= PRODUCT SECTION ================= */}

                <div className="container">

                    {/* Breadcrumb */}

                    <div className="product-breadcrumb">

                        <Link to="/">
                            Home
                        </Link>

                        <span>/</span>

                        <Link to="/products">
                            Products
                        </Link>

                        <span>/</span>

                        <span>
                            {product.name}
                        </span>

                    </div>

                    <div className="product-layout">

                        {/* ================= LEFT - GALLERY ================= */}

                        <div className="gallery">

                            <div className="main-image">

                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt={product.name}
                                    />
                                ) : (
                                    <div className="no-product-image">
                                        No Image Available
                                    </div>
                                )}

                            </div>

                            {/* Thumbnails */}

                            {product.images &&
                                product.images.length > 0 && (

                                    <div className="thumbnail-list">

                                        {product.images.map((img) => (

                                            <button
                                                type="button"
                                                key={img.id}
                                                className={
                                                    selectedImage === img.image
                                                        ? "thumbnail active"
                                                        : "thumbnail"
                                                }
                                                onClick={() =>
                                                    setSelectedImage(img.image)
                                                }
                                            >

                                                <img
                                                    src={img.image}
                                                    alt={product.name}
                                                />

                                            </button>

                                        ))}

                                    </div>

                                )}

                        </div>

                        {/* ================= RIGHT - INFORMATION ================= */}

                        <div className="product-info">

                            {/* Brand */}

                            <span className="product-brand">
                                {product.brand}
                            </span>

                            {/* Product Name */}

                            <h1>
                                {product.name}
                            </h1>

                            {/* Category */}

                            {product.category && (

                                <Link
                                    to={`/products?category=${product.category.id}`}
                                    className="product-category"
                                >
                                    {product.category.name}
                                </Link>

                            )}

                            {/* Price */}

                            <div className="product-price">

                                ₹{" "}
                                {Number(product.price).toLocaleString(
                                    "en-IN"
                                )}

                            </div>

                            {/* Divider */}

                            <div className="product-divider"></div>

                            {/* Description */}

                            <div className="product-description">

                                <h2>
                                    Product Description
                                </h2>

                                <p>
                                    {product.description}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= RELATED PRODUCTS ================= */}

                {product.related_products &&
                    product.related_products.length > 0 && (

                        <section className="related-products">

                            <div className="container">

                                <div className="related-heading">

                                    <span>
                                        EXPLORE MORE
                                    </span>

                                    <h2>
                                        Related Products
                                    </h2>

                                    <p>
                                        Products related to this category.
                                    </p>

                                </div>

                                <div className="related-grid">

                                    {product.related_products.map(
                                        (relatedProduct, index) => (

                                            <div
                                                className="related-card"
                                                key={
                                                    relatedProduct.id ||
                                                    index
                                                }
                                            >

                                                <div className="related-image">

                                                    {relatedProduct.images &&
                                                    relatedProduct.images.length >
                                                        0 ? (
                                                        <img
                                                            src={
                                                                relatedProduct
                                                                    .images[0]
                                                                    .image
                                                            }
                                                            alt={
                                                                relatedProduct.name
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="related-no-image">
                                                            No Image
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="related-body">

                                                    <span>
                                                        {
                                                            relatedProduct.brand
                                                        }
                                                    </span>

                                                    <h3>
                                                        {
                                                            relatedProduct.name
                                                        }
                                                    </h3>

                                                    <strong>
                                                        ₹{" "}
                                                        {Number(
                                                            relatedProduct.price
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                    {relatedProduct.id && (
                                                        <Link
                                                            to={`/product/${relatedProduct.id}`}
                                                        >
                                                            View Details
                                                        </Link>
                                                    )}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </section>

                    )}

            </main>
        </>
    );
}

export default ProductDetails;