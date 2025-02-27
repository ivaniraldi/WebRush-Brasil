import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import { FiClock, FiCalendar } from 'react-icons/fi';

const BlogPost = () => {
  const { slug } = useParams();
  const { posts } = useContext(GlobalContext);
  const post = posts.find(post => post.slug === slug);

  if (!post) {
    return <div className="text-center py-20 text-gray-500">Postagem não encontrada.</div>;
  }

  return (
    <motion.article 
      className="min-h-screen bg-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="relative py-20 bg-gradient-to-br from-green-400 to-blue-500 text-white text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {post.title}
        </motion.h1>
        <div className="flex justify-center gap-4 text-gray-200 text-sm">
          <span className="flex items-center"><FiCalendar className="mr-2" />{new Date(post.created_at).toLocaleDateString()}</span>
          <span className="flex items-center"><FiClock className="mr-2" />{Math.ceil(post.content.split(' ').length / 200)} min read</span>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.img 
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-lg shadow-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div 
          className="text-lg text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
    </motion.article>
  );
};

export default BlogPost;
