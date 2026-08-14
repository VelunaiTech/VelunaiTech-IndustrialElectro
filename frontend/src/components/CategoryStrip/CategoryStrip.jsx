import "./CategoryStrip.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../../services/categoryService";

function CategoryStrip() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();

                console.log("Categories:", data);

                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <section className="category-strip">
                <div className="container">
                    <div className="category-loading">
                        Loading categories...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="category-strip">

            <div className="container">

                <div className="category-header">

                    <div>
                        <span className="section-label">
                            EXPLORE
                        </span>

                        <h2>
                            Product Categories
                        </h2>
                    </div>

                    <Link
                        to="/products"
                        className="view-all-categories"
                    >
                        View All
                    </Link>

                </div>

                <div className="category-list">

                    {categories.map((category) => (

                        <Link
                            to={`/products?category=${category.id}`}
                            className="category-item"
                            key={category.id}
                        >

                            <div className="category-image">

                                {category.image ? (

                                    <img
                                        src={category.image}
                                        alt={category.name}
                                    />

                                ) : (

                                    <div className="category-no-image">
                                        {category.name.charAt(0)}
                                    </div>

                                )}

                            </div>

                            <div className="category-content">

                                <h3>
                                    {category.name}
                                </h3>

                                {category.description && (
                                    <p>
                                        {category.description}
                                    </p>
                                )}

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CategoryStrip;