import "./Hero.css";

import { useEffect, useRef, useState } from "react";

import heroSlides from "./heroData";

function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);

    const [paused, setPaused] = useState(false);

    const heroRef = useRef(null);

    // Auto Slide
    useEffect(() => {

        if (paused) return;

        const interval = setInterval(() => {

            setCurrentSlide((prev) => {

                if (prev === heroSlides.length - 1) {
                    return 0;
                }

                return prev + 1;

            });

        }, 5000);

        return () => {
            clearInterval(interval);
        };

    }, [paused, heroSlides.length]);

    // Parallax Scroll
    useEffect(() => {

        const handleScroll = () => {

            if (!heroRef.current) return;

            const slides = heroRef.current.querySelector(".hero-slides");

            if (!slides) return;

            const offset = window.scrollY * 0.25;

            slides.style.transform = `translateY(${offset}px)`;

        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (

        <section

            ref={heroRef}

            className="hero-wrapper"

            onMouseEnter={() => setPaused(true)}

            onMouseLeave={() => setPaused(false)}

        >

            <div className="hero-slides">

                {heroSlides.map((slide, index) => (

                    <div

                        key={slide.id}

                        className={`hero-slide ${currentSlide === index ? "active" : ""}`}

                        style={{
                            backgroundImage: `url(${slide.image})`
                        }}

                    >

                        <div className="slide-content">

                            <div className="hero-eyebrow">

                                <span className="eyebrow-mark"></span>

                                {slide.eyebrow}

                            </div>

                            <h1>

                                {slide.title.split(slide.highlight)[0]}

                                <span>

                                    {slide.highlight}

                                </span>

                                {slide.title.split(slide.highlight)[1]}

                            </h1>

                            <p>

                                {slide.subtitle}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

            {/* Decorative Corners */}

            <div className="frame-corners">

                <span className="fc-tl"></span>

                <span className="fc-tr"></span>

                <span className="fc-bl"></span>

                <span className="fc-br"></span>

            </div>

            {/* Navigation */}

            <div className="carousel-dots">

                {heroSlides.map((_, index) => (

                    <span

                        key={index}

                        className={`dot ${currentSlide === index ? "active" : ""}`}

                        onClick={() => setCurrentSlide(index)}

                    />

                ))}

            </div>

        </section>

    );

}

export default Hero;