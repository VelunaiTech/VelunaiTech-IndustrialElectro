import api from "./api";

export const sendMaterialRequest = async (formData) => {
    const response = await api.post(
        "material-request/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};