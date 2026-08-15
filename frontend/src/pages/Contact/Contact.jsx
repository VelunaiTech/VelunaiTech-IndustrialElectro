import "./Contact.css";

import {
    FaWhatsapp,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt
} from "react-icons/fa";

import { useEffect, useState } from "react";

import { getContactInfo } from "../../services/contactService";


function Contact() {

    const [contact, setContact] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        async function loadContact() {

            try {

                const data = await getContactInfo();

                setContact(data);

            } catch (error) {

                console.error(
                    "Failed to load contact information:",
                    error
                );

                setError(
                    "Unable to load contact information."
                );

            } finally {

                setLoading(false);

            }

        }

        loadContact();

    }, []);


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <main className="contact-page">

                <div className="container">

                    <div className="contact-loading">

                        <h2>
                            Loading Contact Information...
                        </h2>

                    </div>

                </div>

            </main>

        );

    }


    /* =========================================================
       ERROR
    ========================================================= */

    if (error || !contact) {

        return (

            <main className="contact-page">

                <div className="container">

                    <div className="contact-loading">

                        <h2>
                            {error || "Contact information not available."}
                        </h2>

                    </div>

                </div>

            </main>

        );

    }


    /* =========================================================
       WHATSAPP NUMBER
       
       Database:
       9751271458

       Convert to:
       919751271458
    ========================================================= */

    let whatsappNumber =
        contact.whatsapp_number || contact.mobile || "";

    whatsappNumber = whatsappNumber.replace(/\D/g, "");


    /*
       If only a 10-digit Indian number is stored,
       automatically add country code 91.
    */

    if (whatsappNumber.length === 10) {

        whatsappNumber = `91${whatsappNumber}`;

    }


    /* =========================================================
       EMAIL
       
       Gmail compose URL is more reliable than mailto:
    ========================================================= */

    const emailAddress =
        contact.email || "";


    const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            emailAddress
        )}`;


    /* =========================================================
       LOCATION
    ========================================================= */

    const locationUrl =
        contact.location_url || "#";


    return (

        <main className="contact-page">

            <div className="container">

                <section className="contact-card">


                    {/* =================================================
                       OWNER PROFILE
                    ================================================= */}

                    <div className="owner-profile">

                        <div className="owner-image">

                            {contact.profile_image ? (

                                <img
                                    src={contact.profile_image}
                                    alt={contact.name}
                                />

                            ) : (

                                <div className="owner-no-image">
                                    Owner
                                </div>

                            )}

                        </div>


                        <h1>
                            {contact.name}
                        </h1>


                        <p className="owner-role">
                            IndustrialElectro
                        </p>

                    </div>


                    {/* =================================================
                       CONTACT DETAILS
                    ================================================= */}

                    <div className="contact-details">


                        {/* ================= MOBILE ================= */}

                        <div className="contact-item">

                            <div className="contact-icon">

                                <FaPhoneAlt />

                            </div>


                            <div className="contact-text">

                                <span>
                                    Mobile Number
                                </span>


                                <a
                                    href={`tel:${contact.mobile}`}
                                >
                                    {contact.mobile}
                                </a>

                            </div>

                        </div>


                        {/* ================= EMAIL ================= */}

                        <div className="contact-item">

                            <div className="contact-icon">

                                <FaEnvelope />

                            </div>


                            <div className="contact-text">

                                <span>
                                    Email
                                </span>


                                <a
                                    href={gmailUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {contact.email}
                                </a>

                            </div>

                        </div>


                        {/* ================= ADDRESS ================= */}

                        <div className="contact-item">

                            <div className="contact-icon">

                                <FaMapMarkerAlt />

                            </div>


                            <div className="contact-text">

                                <span>
                                    Inventory Address
                                </span>


                                <p>
                                    {contact.address}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                       ACTION BUTTONS
                    ================================================= */}

                    <div className="contact-actions">


                        {/* ================= WHATSAPP ================= */}

                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-action whatsapp"
                        >

                            <FaWhatsapp />

                            <span>
                                WhatsApp
                            </span>

                        </a>


                        {/* ================= EMAIL ================= */}

                        <a
                            href={gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-action email"
                        >

                            <FaEnvelope />

                            <span>
                                Email
                            </span>

                        </a>


                        {/* ================= LOCATION ================= */}

                        <a
                            href={locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-action location"
                        >

                            <FaMapMarkerAlt />

                            <span>
                                Location
                            </span>

                        </a>

                    </div>

                </section>

            </div>

        </main>

    );

}


export default Contact;