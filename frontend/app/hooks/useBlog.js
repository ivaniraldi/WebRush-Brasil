import { useState, useEffect, useCallback } from 'react';
import { blogAPI } from '../config/api';

export const useBlogs = (initialPage = 1) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchBlogs = useCallback(async (page = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await blogAPI.getBlogs(page);
      
      setBlogs(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.pagination?.totalPages || data.pagination?.pages || 1);
      setHasMore(page < (data.pagination?.totalPages || data.pagination?.pages || 1));
    } catch (err) {
      setError('No se pudieron cargar los blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const changePage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, totalPages]);

  const refresh = useCallback(() => {
    fetchBlogs(currentPage);
  }, [fetchBlogs, currentPage]);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    changePage,
    refresh,
  };
};

export const useBlog = (slug) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await blogAPI.getBlogBySlug(slug);
      setBlog(data.data || data);
    } catch (err) {
      setError('No se pudo cargar el blog');
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const refresh = useCallback(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return {
    blog,
    loading,
    error,
    refresh,
  };
}; 