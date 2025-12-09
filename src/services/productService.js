import api from './api';

export const productService = {
    getAll: async () => {
        const response = await api.get('/api/productos');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/productos/${id}`);
        return response.data;
    },

    getDestacados: async () => {
        const response = await api.get('/api/productos/destacados');
        return response.data;
    },

    getByCategoria: async (categoriaId) => {
        const response = await api.get(`/api/productos/categoria/${categoriaId}`);
        return response.data;
    },

    buscar: async (query) => {
        const response = await api.get('/api/productos/buscar', { params: { q: query } });
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/api/productos/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/productos/${id}`);
        return response.data;
    }
};
