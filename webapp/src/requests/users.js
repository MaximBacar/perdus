import { api } from "./requests";

export async function getUsers() {
    const response = await api.get("/users");
    return response.data;
}

export async function setUserRole(userId, role) {
    const response = await api.post(`/users/${userId}/role`, { role });
    return response.data;
}
