import api from "./api";

export const sendContact = async (data) => {
    const response = await api.post("contact/", data);
    return response.data;
};