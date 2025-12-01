import api from './api';

export const userService = {
    getPerfil: async () => {
        const response = await api.get('/api/usuarios/perfil');
        return response.data;
    },

    actualizarPerfil: async (userData) => {
        const response = await api.put('/api/usuarios/perfil', userData);
        return response.data;
    },

    cambiarPassword: async (passwordData) => {
        const response = await api.put('/api/usuarios/cambiar-password', passwordData);
        return response.data;
    }
};
