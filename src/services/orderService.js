import api from './api';

export const orderService = {
    crear: async (ordenData) => {
        const response = await api.post('/api/ordenes/crear', ordenData);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/api/ordenes');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/ordenes/${id}`);
        return response.data;
    },

    cancelar: async (id) => {
        const response = await api.put(`/api/ordenes/${id}/cancelar`);
        return response.data;
    }
};
