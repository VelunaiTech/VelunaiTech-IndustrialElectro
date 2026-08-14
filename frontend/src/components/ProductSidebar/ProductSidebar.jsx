import "./ProductSidebar.css";

import { FaSearch, FaTimes } from "react-icons/fa";

function ProductSidebar({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
}) {
    const handleReset = () => {
        setSelectedCategory("all");
        setSearchTerm("");
    };

    return (
        <aside className="product-sidebar">

            {/* SIDEBAR HEADER */}
            <div className="sidebar-header">

                <h2>Filters</h2>

                <button
                    type="button"
                    onClick={handleReset}
                    className="clear-filters"
                >
                    Clear All
                </button>

            </div>

            {/* SEARCH */}
            <div className="sidebar-section">

                <h3>Search Products</h3>

                <div className="product-search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Search products..."
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}

                </div>

            </div>

            {/* CATEGORIES */}
            <div className="sidebar-section">

                <h3>Categories</h3>

                <div className="category-list">

                    <button
                        type="button"
                        className={
                            selectedCategory === "all"
                                ? "category-option active"
                                : "category-option"
                        }
                        onClick={() =>
                            setSelectedCategory("all")
                        }
                    >
                        <span>All Products</span>

                        <span className="category-count">
                            {categories.length > 0
                                ? categories.reduce(
                                    (total, category) =>
                                        total + (category.product_count || 0),
                                    0
                                )
                                : ""}
                        </span>
                    </button>

                    {categories.map((category) => (

                        <button
                            type="button"
                            key={category.id}
                            className={
                                Number(selectedCategory) === category.id
                                    ? "category-option active"
                                    : "category-option"
                            }
                            onClick={() =>
                                setSelectedCategory(category.id)
                            }
                        >
                            <span>{category.name}</span>
                        </button>

                    ))}

                </div>

            </div>

            {/* ACTIVE FILTER */}
            {(selectedCategory !== "all" || searchTerm) && (

                <div className="active-filters">

                    <div className="active-filter-title">
                        Active Filters
                    </div>

                    {searchTerm && (
                        <div className="filter-tag">

                            <span>
                                Search: "{searchTerm}"
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setSearchTerm("")
                                }
                            >
                                <FaTimes />
                            </button>

                        </div>
                    )}

                    {selectedCategory !== "all" && (

                        <div className="filter-tag">

                            <span>
                                {
                                    categories.find(
                                        (category) =>
                                            category.id ===
                                            Number(selectedCategory)
                                    )?.name
                                }
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedCategory("all")
                                }
                            >
                                <FaTimes />
                            </button>

                        </div>

                    )}

                </div>

            )}

            {/* RESET */}
            <button
                type="button"
                className="reset-filter-button"
                onClick={handleReset}
            >
                Reset Filters
            </button>

        </aside>
    );
}

export default ProductSidebar;