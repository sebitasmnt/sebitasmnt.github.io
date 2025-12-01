import api from './api';

export const cartService = {
    get: async () => {
        const response = await api.get('/api/carrito');
        return response.data;
    },

    agregar: async (productoId, cantidad) => {
        const response = await api.post('/api/carrito/agregar', {
            productoId,
            cantidad
        });
        return response.data;
    },

    actualizarCantidad: async (itemId, cantidad) => {
        const response = await api.put(`/api/carrito/items/${itemId}`, { cantidad });
        return response.data;
    },

    eliminarItem: async (itemId) => {
        const response = await api.delete(`/api/carrito/items/${itemId}`);
        return response.data;
    },

    vaciar: async () => {
        const response = await api.delete('/api/carrito/vaciar');
        return response.data;
    }
};
