import { useEffect, useState } from "react";
import "./CategoryStrip.css";

import { getCategories } from "../../services/categoryService";

import CategoryCard from "../CategoryCard/CategoryCard";

function CategoryStrip() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchCategories() {

            try {

                const data = await getCategories();
                console.log(data);
                setCategories(data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        fetchCategories();

    }, []);

    if (loading) {

        return (

            <section className="category-strip">

                <div className="container">

                    <h2>Loading Categories...</h2>

                </div>

            </section>

        );

    }

    return (

        <section className="category-strip">

            <div className="container">

                <div className="section-header">

                    <h2>

                        Browse Categories

                    </h2>

                    <p>

                        Discover industrial automation products by category.

                    </p>

                </div>

                <div className="category-grid">

                    {

                        categories.map((category) => (

                            <CategoryCard

                                key={category.id}

                                category={category}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default CategoryStrip;