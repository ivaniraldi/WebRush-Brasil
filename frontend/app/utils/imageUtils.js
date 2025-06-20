export const getImageUrl = (imageUrl, fallback = "/images/placeholder.avif") => {
  if (!imageUrl) return fallback;
  
  // Si la imagen ya es una URL completa, la devolvemos
  if (imageUrl.startsWith('http')) return imageUrl;
  
  // Si la imagen es relativa, la convertimos en absoluta
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const getOptimizedImageUrl = (imageUrl, width, height) => {
  if (!imageUrl) return "/images/placeholder.avif";
  
  // Si es una imagen de Unsplash, podemos optimizarla
  if (imageUrl.includes('unsplash.com')) {
    const baseUrl = imageUrl.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=center`;
  }
  
  // Para otras imágenes, devolvemos la URL original
  return imageUrl;
}; 