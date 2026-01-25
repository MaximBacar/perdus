import { api } from "./requests";


export async function addObject(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post("/items", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export async function getRecentItems(limit = 5) {
    const response = await api.get(`/items?limit=${limit}`);
    return response.data;
}