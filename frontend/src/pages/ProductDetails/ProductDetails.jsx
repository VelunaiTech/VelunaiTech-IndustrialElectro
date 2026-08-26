import "./ProductDetails.css";

import Header from "../../components/Header/Header";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaChevronLeft,
    FaChevronRight,
    FaFileDownload,
    FaImage,
    FaPhoneAlt,
    FaTag,
} from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { getProduct } from "../../services/productService";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    /* =========================================================
       STATE
    ========================================================= */

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] = useState(0);


    /* =========================================================
       LOAD PRODUCT
    ========================================================= */

    useEffect(() => {

        const loadProduct = async () => {

            try {

                setLoading(true);

                setError("");

                const data = await getProduct(id);

                setProduct(data);

                setSelectedImage(0);

            } catch (err) {

                console.error(
                    "Failed to load product:",
                    err
                );

                setError(
                    "Unable to load this product."
                );

            } finally {

                setLoading(false);

            }

        };


        loadProduct();

    }, [id]);


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <>

                <Header />

                <main className="product-details-page">

                    <div className="container">

                        <div className="product-details-loading">

                            <div className="loading-spinner"></div>

                            <h2>
                                Loading Product...
                            </h2>

                            <p>
                                Please wait while we load the product details.
                            </p>

                        </div>

                    </div>

                </main>

            </>

        );

    }


    /* =========================================================
       ERROR
    ========================================================= */

    if (error || !product) {

        return (

            <>

                <Header />

                <main className="product-details-page">

                    <div className="container">

                        <div className="product-details-error">

                            <div className="error-icon">

                                <FaImage />

                            </div>

                            <h2>
                                Product Not Found
                            </h2>

                            <p>
                                {error ||
                                    "The product you are looking for does not exist."}
                            </p>

                            <button
                                type="button"
                                className="back-products-button"
                                onClick={() =>
                                    navigate("/products")
                                }
                            >

                                <FaArrowLeft />

                                Back to Products

                            </button>

                        </div>

                    </div>

                </main>

            </>

        );

    }


    /* =========================================================
       PRODUCT DATA
    ========================================================= */

    const images = product.images || [];

    const relatedProducts =
        product.related_products || [];

    const currentImage =
        images[selectedImage]?.image || null;


    /* =========================================================
       IMAGE NAVIGATION
    ========================================================= */

    const showPreviousImage = () => {

        if (images.length <= 1) {
            return;
        }

        setSelectedImage((current) =>
            current === 0
                ? images.length - 1
                : current - 1
        );

    };


    const showNextImage = () => {

        if (images.length <= 1) {
            return;
        }

        setSelectedImage((current) =>
            current === images.length - 1
                ? 0
                : current + 1
        );

    };


    /* =========================================================
       RENDER
    ========================================================= */

    return (

        <>

            <Header />


            <main className="product-details-page">

                <div className="container">


                    {/* =================================================
                       BREADCRUMB
                    ================================================= */}

                    <div className="product-breadcrumb">

                        <Link to="/">
                            Home
                        </Link>

                        <span>/</span>

                        <Link to="/products">
                            Products
                        </Link>

                        <span>/</span>

                        <span className="breadcrumb-current">
                            {product.name}
                        </span>

                    </div>


                    {/* =================================================
                       BACK BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        className="back-products-link"
                        onClick={() =>
                            navigate("/products")
                        }
                    >

                        <FaArrowLeft />

                        Back to Products

                    </button>


                    {/* =================================================
                       PRODUCT MAIN
                    ================================================= */}

                    <section className="product-details-card">


                        {/* =================================================
                           IMAGE SECTION
                        ================================================= */}

                        <div className="product-gallery">


                            {/* MAIN IMAGE */}

                            <div className="product-main-image">

                                {currentImage ? (

                                    <img
                                        src={currentImage}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="product-main-placeholder">

                                        <FaImage />

                                        <span>
                                            No Image Available
                                        </span>

                                    </div>

                                )}


                                {images.length > 1 && (

                                    <>

                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-left"
                                            onClick={showPreviousImage}
                                            aria-label="Previous image"
                                        >

                                            <FaChevronLeft />

                                        </button>


                                        <button
                                            type="button"
                                            className="gallery-arrow gallery-arrow-right"
                                            onClick={showNextImage}
                                            aria-label="Next image"
                                        >

                                            <FaChevronRight />

                                        </button>

                                    </>

                                )}

                            </div>


                            {/* THUMBNAILS */}

                            {images.length > 0 && (

                                <div className="product-thumbnails">

                                    {images.map(
                                        (image, index) => (

                                            <button
                                                type="button"
                                                key={image.id || index}
                                                className={
                                                    selectedImage === index
                                                        ? "product-thumbnail active"
                                                        : "product-thumbnail"
                                                }
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                                aria-label={`View image ${index + 1}`}
                                            >

                                                <img
                                                    src={image.image}
                                                    alt={`${product.name} ${index + 1}`}
                                                />

                                            </button>

                                        )
                                    )}

                                </div>

                            )}

                        </div>


                        {/* =================================================
                           PRODUCT INFORMATION
                        ================================================= */}

                        <div className="product-information">


                            {/* CATEGORY */}

                            {product.category && (

                                <span className="details-category">

                                    <FaTag />

                                    {product.category.name}

                                </span>

                            )}


                            {/* BRAND */}

                            {product.brand && (

                                <span className="details-brand">
                                    {product.brand}
                                </span>

                            )}


                            {/* NAME */}

                            <h1 className="details-product-name">
                                {product.name}
                            </h1>


                            {/* DESCRIPTION */}

                            <p className="details-description">
                                {product.description}
                            </p>


                            {/* PRICE */}

                            <div className="details-price-section">

                                <span className="details-price-label">
                                    Price
                                </span>

                                <div className="details-price">

                                    ₹{" "}
                                    {Number(
                                        product.price
                                    ).toLocaleString("en-IN")}

                                </div>

                            </div>


                            {/* AVAILABILITY */}

                            <div className="product-availability">

                                <FaCheckCircle />

                                <span>
                                    Product available
                                </span>

                            </div>


                            {/* ACTIONS */}

                            <div className="product-detail-actions">

                                <Link
                                    to="/contact"
                                    className="secondary-product-action"
                                >

                                    <FaPhoneAlt />

                                    Contact Us

                                </Link>

                            </div>


                            {/* PRODUCT NOTE */}

                            <div className="product-detail-note">

                                <FaFileDownload />

                                <div>

                                    <strong>
                                        Need more information?
                                    </strong>

                                    <p>
                                        Contact us for product
                                        specifications, availability,
                                        and technical information.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                       DESCRIPTION SECTION
                    ================================================= */}

                    <section className="product-description-section">

                        <div className="section-heading">

                            <span>
                                PRODUCT INFORMATION
                            </span>

                            <h2>
                                Product Description
                            </h2>

                        </div>


                        <div className="description-content">

                            <p>
                                {product.description}
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                       RELATED PRODUCTS
                    ================================================= */}

                    {relatedProducts.length > 0 && (

                        <section className="related-products-section">

                            <div className="section-heading">

                                <span>
                                    YOU MAY ALSO LIKE
                                </span>

                                <h2>
                                    Related Products
                                </h2>

                                <p>
                                    Explore other products from
                                    the same category.
                                </p>

                            </div>


                            <div className="related-products-grid">

                                {relatedProducts.map(
                                    (relatedProduct) => (

                                        <article
                                            className="related-product-card"
                                            key={relatedProduct.id}
                                        >

                                            <Link
                                                to={`/product/${relatedProduct.id}`}
                                                className="related-product-image"
                                            >

                                                {relatedProduct.image ? (

                                                    <img
                                                        src={
                                                            relatedProduct.image
                                                        }
                                                        alt={
                                                            relatedProduct.name
                                                        }
                                                    />

                                                ) : (

                                                    <div className="related-image-placeholder">

                                                        <FaImage />

                                                    </div>

                                                )}

                                            </Link>


                                            <div className="related-product-body">

                                                <span className="related-product-brand">
                                                    {relatedProduct.brand}
                                                </span>


                                                <h3>
                                                    {relatedProduct.name}
                                                </h3>


                                                <div className="related-product-bottom">

                                                    <strong>
                                                        ₹{" "}
                                                        {Number(
                                                            relatedProduct.price
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>


                                                    <Link
                                                        to={`/product/${relatedProduct.id}`}
                                                        className="related-view-button"
                                                    >
                                                        View
                                                    </Link>

                                                </div>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        </section>

                    )}

                </div>

            </main>

        </>

    );

}


export default ProductDetails;