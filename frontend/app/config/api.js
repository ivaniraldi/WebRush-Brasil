import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'https://api.webrushbrasil.com.br';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Funciones de la API de blogs
export const blogAPI = {
  // Obtener lista de blogs con paginación
  getBlogs: async (page = 1, limit = 9) => {
    try {
      const response = await apiClient.get(`/api/blogs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los blogs');
    }
  },

  // Obtener blog por slug
  getBlogBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/api/blogs/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el blog');
    }
  },

  // Obtener todos los slugs para generación estática
  getAllSlugs: async () => {
    try {
      // Intentar primero obtener solo los slugs si la API lo soporta
      const response = await apiClient.get('/api/blogs?fields=slug');
      return response.data;
    } catch (error) {
      try {
        // Fallback: obtener todos los blogs y extraer solo los slugs
        const response = await apiClient.get('/api/blogs?limit=100');
        const blogs = response.data?.data || response.data || [];
        return { data: blogs.map(blog => ({ slug: blog.slug })) };
      } catch (fallbackError) {
        console.error('Error al obtener los slugs:', fallbackError);
        throw new Error('Error al obtener los slugs');
      }
    }
  }
};

export default apiClient; 