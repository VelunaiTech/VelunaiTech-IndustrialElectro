import "./ProductDetails.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProduct } from "../../services/productService";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");


    useEffect(() => {

        async function fetchProduct() {

            try {

                const data = await getProduct(id);

                setProduct(data);

                if (data.images && data.images.length > 0) {

                    setSelectedImage(
                        data.images[0].image
                    );

                }

            } catch (error) {

                console.error(
                    "Error loading product:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        fetchProduct();

    }, [id]);


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <section className="product-loading">

                <h2>
                    Loading Product...
                </h2>

            </section>

        );

    }


    /* =========================================================
       PRODUCT NOT FOUND
    ========================================================= */

    if (!product) {

        return (

            <section className="product-loading">

                <h2>
                    Product Not Found
                </h2>

            </section>

        );

    }


    return (

        <section className="product-details">

            <div className="container">


                {/* =================================================
                   PRODUCT
                ================================================= */}

                <div className="product-layout">


                    {/* =================================================
                       GALLERY
                    ================================================= */}

                    <div className="gallery">


                        {/* ================= MAIN IMAGE ================= */}

                        <div className="main-image">

                            {selectedImage ? (

                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                />

                            ) : (

                                <div className="no-image">

                                    No Image Available

                                </div>

                            )}

                        </div>


                        {/* ================= THUMBNAILS ================= */}

                        {product.images &&
                            product.images.length > 0 && (

                                <div className="thumbnail-list">

                                    {product.images.map((img) => (

                                        <img
                                            key={img.id}
                                            src={img.image}
                                            alt={product.name}
                                            className={
                                                selectedImage === img.image
                                                    ? "thumbnail active"
                                                    : "thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImage(
                                                    img.image
                                                )
                                            }
                                        />

                                    ))}

                                </div>

                            )}

                    </div>


                    {/* =================================================
                       PRODUCT INFORMATION
                    ================================================= */}

                    <div className="product-info">


                        {/* ================= BRAND ================= */}

                        <span className="brand">

                            {product.brand}

                        </span>


                        {/* ================= NAME ================= */}

                        <h1>

                            {product.name}

                        </h1>


                        {/* ================= CATEGORY ================= */}

                        <p className="category">

                            Category:

                            <span>

                                {product.category?.name}

                            </span>

                        </p>


                        {/* ================= PRICE ================= */}

                        <div className="price">

                            ₹ {product.price}

                        </div>


                        {/* ================= DESCRIPTION ================= */}

                        <p className="description">

                            {product.description}

                        </p>

                    </div>

                </div>


                {/* =================================================
                   RELATED PRODUCTS
                ================================================= */}

                {product.related_products &&
                    product.related_products.length > 0 && (

                        <section className="related-products">

                            <div className="container">


                                {/* ================= HEADING ================= */}

                                <div className="related-heading">

                                    <span>
                                        EXPLORE MORE
                                    </span>

                                    <h2>
                                        Related Products
                                    </h2>

                                    <p>
                                        More products from the same category.
                                    </p>

                                </div>


                                {/* ================= GRID ================= */}

                                <div className="related-grid">

                                    {product.related_products.map(
                                        (related) => (

                                            <div
                                                className="related-card"
                                                key={related.id}
                                            >


                                                {/* ================= IMAGE ================= */}

                                                <div className="related-image">

                                                    {related.image ? (

                                                        <img
                                                            src={related.image}
                                                            alt={related.name}
                                                        />

                                                    ) : (

                                                        <div className="no-image">

                                                            No Image Available

                                                        </div>

                                                    )}

                                                </div>


                                                {/* ================= CONTENT ================= */}

                                                <div className="related-content">


                                                    {/* ================= BRAND ================= */}

                                                    <span className="related-brand">

                                                        {related.brand}

                                                    </span>


                                                    {/* ================= NAME ================= */}

                                                    <h3>

                                                        {related.name}

                                                    </h3>


                                                    {/* ================= PRICE ================= */}

                                                    <div className="related-price">

                                                        ₹ {related.price}

                                                    </div>


                                                    {/* ================= VIEW PRODUCT ================= */}

                                                    <Link
                                                        to={`/product/${related.id}`}
                                                        className="view-product-btn"
                                                    >
                                                        View Product
                                                    </Link>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        </section>

                    )}

            </div>

        </section>

    );

}

export default ProductDetails;