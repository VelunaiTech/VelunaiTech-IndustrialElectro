import "./RequestMaterial.css";

import {
    FaSearch,
    FaWhatsapp,
    FaPaperPlane
} from "react-icons/fa";

function RequestMaterial() {

    const whatsappNumber = "919791752068";

    const handleWhatsAppRequest = () => {

        const message =
            `Hello IndustrialElectro,\n\n` +
            `I would like to request a material/product.\n\n` +
            `Product/Material Requirement:\n` +
            `${document.getElementById("material-description").value.trim()}\n\n` +
            `I have attached the required product/material image in this WhatsApp chat.\n\n` +
            `Please let me know about availability, price, and further details.`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        const description =
            document
                .getElementById("material-description")
                .value
                .trim();

        if (!description) {
            alert(
                "Please describe the material or product you are looking for."
            );

            return;
        }

        handleWhatsAppRequest();
    };


    return (
        <main className="request-material-page">

            <div className="request-material-container">

                {/* =====================================================
                    ICON
                ===================================================== */}

                <div className="request-material-icon">

                    <FaSearch />

                </div>


                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <div className="request-material-content">

                    <h1>
                        Don't See What You Need? We'll Source It.
                    </h1>

                    <p className="request-material-description">

                        Tell us the exact part number, brand, or
                        specification — our global network will find it
                        for you, whether new, used, or obsolete.
                        Just fill in the details below.

                    </p>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        className="request-material-form"
                        onSubmit={handleSubmit}
                    >

                        {/* =============================================
                            DESCRIPTION
                        ============================================= */}

                        <div className="request-field">

                            <label htmlFor="material-description">
                                What material or product are you looking for?
                            </label>

                            <textarea
                                id="material-description"
                                name="description"
                                placeholder="Describe the part, quantity, condition (new/used), and any other requirements..."
                                rows="6"
                            />

                        </div>


                        {/* =============================================
                            WHATSAPP BUTTON
                        ============================================= */}

                        <button
                            type="submit"
                            className="whatsapp-request-button"
                        >

                            <FaWhatsapp />

                            <span>
                                Send as WhatsApp Message
                            </span>

                            <FaPaperPlane />

                        </button>


                        {/* =============================================
                            INFORMATION
                        ============================================= */}

                        <p className="request-material-note">

                            Our team will review your requirement and
                            get back to you on WhatsApp.

                        </p>

                    </form>

                </div>

            </div>

        </main>
    );
}

export default RequestMaterial;