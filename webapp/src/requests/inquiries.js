import { api } from "./requests";

export async function createInquiry(description, imageFile = null) {
    const formData = new FormData();
    formData.append("description", description);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    const response = await api.post("/inquiries", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export async function getInquiry(inquiryId) {
    const response = await api.get(`/inquiries/${inquiryId}`);
    return response.data;
}

export async function postAnswers(inquiryId, answers) {
    const response = await api.post(`/inquiries/${inquiryId}/answers`, { answers });
    return response.data;
}

export async function getRecentInquiries(limit = 5) {
    const response = await api.get(`/inquiries?limit=${limit}`);
    return response.data;
}