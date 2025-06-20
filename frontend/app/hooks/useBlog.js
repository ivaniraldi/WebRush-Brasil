import { useState, useEffect, useCallback, useMemo } from 'react';
import { blogAPI } from '../config/api';

// Cache simple para evitar requests duplicados
const cache = new Map();
const CACHE_TIME = 5 * 60 * 1000; // 5 minutos

const getCacheKey = (type, params) => `${type}_${JSON.stringify(params)}`;

const isValidCache = (timestamp) => Date.now() - timestamp < CACHE_TIME;

export const useBlogs = (initialPage = 1) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchBlogs = useCallback(async (page = currentPage, useCache = true) => {
    const cacheKey = getCacheKey('blogs', { page });
    
    // Verificar cache primero
    if (useCache && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (isValidCache(cached.timestamp)) {
        setBlogs(cached.data.blogs);
        setTotalPages(cached.data.totalPages);
        setHasMore(cached.data.hasMore);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await blogAPI.getBlogs(page);
      const blogsData = Array.isArray(data.data) ? data.data : [];
      const totalPagesData = data.pagination?.totalPages || data.pagination?.pages || 1;
      const hasMoreData = page < totalPagesData;
      
      setBlogs(blogsData);
      setTotalPages(totalPagesData);
      setHasMore(hasMoreData);

      // Guardar en cache
      cache.set(cacheKey, {
        data: {
          blogs: blogsData,
          totalPages: totalPagesData,
          hasMore: hasMoreData
        },
        timestamp: Date.now()
      });
    } catch (err) {
      setError('No se pudieron cargar los blogs');
      setBlogs([]);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const changePage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      // Smooth scroll optimizado
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [currentPage, totalPages]);

  const refresh = useCallback(() => {
    fetchBlogs(currentPage, false); // No usar cache en refresh
  }, [fetchBlogs, currentPage]);

  const clearCache = useCallback(() => {
    cache.clear();
  }, []);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

  // Memoizar el valor de retorno para evitar re-renders innecesarios
  return useMemo(() => ({
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    changePage,
    refresh,
    clearCache,
  }), [blogs, loading, error, currentPage, totalPages, hasMore, changePage, refresh, clearCache]);
};

export const useBlog = (slug) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async (useCache = true) => {
    if (!slug) return;
    
    const cacheKey = getCacheKey('blog', { slug });
    
    // Verificar cache primero
    if (useCache && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (isValidCache(cached.timestamp)) {
        setBlog(cached.data);
        setLoading(false);
        return;
      }
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await blogAPI.getBlogBySlug(slug);
      const blogData = data.data || data;
      
      setBlog(blogData);

      // Guardar en cache
      cache.set(cacheKey, {
        data: blogData,
        timestamp: Date.now()
      });
    } catch (err) {
      setError('No se pudo cargar el blog');
      setBlog(null);
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const refresh = useCallback(() => {
    fetchBlog(false); // No usar cache en refresh
  }, [fetchBlog]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  // Memoizar el valor de retorno
  return useMemo(() => ({
    blog,
    loading,
    error,
    refresh,
  }), [blog, loading, error, refresh]);
}; 