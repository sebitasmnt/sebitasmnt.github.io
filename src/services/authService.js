import api from './api';

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                email: response.data.email,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                rol: response.data.rol,
                descuentoDuoc: response.data.descuentoDuoc
            }));
        }
        return response.data;
    },

    registro: async (userData) => {
        const response = await api.post('/auth/registro', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                email: response.data.email,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                rol: response.data.rol,
                descuentoDuoc: response.data.descuentoDuoc
            }));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};
