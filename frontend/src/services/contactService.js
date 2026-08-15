const API_URL = "http://127.0.0.1:8000/api/contact/";


export async function getContactInfo() {

    const response = await fetch(API_URL);

    if (!response.ok) {

        throw new Error(
            "Failed to load contact information"
        );

    }

    return response.json();
}