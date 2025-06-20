"use client";

import { motion } from "framer-motion";

const LoadingSkeleton = ({ variant = "blog" }) => {
  if (variant === "blog") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl"
          >
            {/* Image skeleton */}
            <div className="relative overflow-hidden">
              <div className="w-full h-56 bg-gray-800 animate-pulse" />
              <div className="absolute top-4 right-4 bg-gray-700 rounded-full w-16 h-6 animate-pulse" />
            </div>
            
            <div className="relative p-6 space-y-4">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse" />
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-1/2 animate-pulse" />
              </div>
              
              {/* Tags skeleton */}
              <div className="flex gap-2">
                <div className="h-6 bg-gray-700 rounded-full w-16 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded-full w-20 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded-full w-14 animate-pulse" />
              </div>
              
              {/* Metadata skeleton */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Button skeleton */}
              <div className="pt-4">
                <div className="h-10 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "blogDetail") {
    return (
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-8 py-12"
        >
          {/* Hero skeleton */}
          <div className="relative mb-16">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="w-full h-64 md:h-[500px] bg-gray-800 animate-pulse" />
              <div className="absolute top-6 right-6 bg-gray-700 rounded-full w-20 h-8 animate-pulse" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-700 rounded-full w-16 animate-pulse" />
                  <div className="h-6 bg-gray-700 rounded-full w-20 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/30">
            {/* Title skeleton */}
            <div className="space-y-4 mb-8">
              <div className="h-12 bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>

            {/* Metadata skeleton */}
            <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-800 rounded w-12 animate-pulse" />
                    <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary skeleton */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-4/5 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-300 rounded animate-pulse" />
      <div className="h-4 bg-gray-300 rounded animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
    </div>
  );
};

export default LoadingSkeleton; 