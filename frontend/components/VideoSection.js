"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"

export default function VideoSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isPlaying, setIsPlaying] = useState(false)

  const videos = [
    {
      title: t.videoSection?.videos[0]?.title || "Web Development Process",
      description:
        t.videoSection?.videos[0]?.description ||
        "Learn about our web development process and how we create stunning websites.",
      thumbnail: "/placeholder.svg?height=400&width=700",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
    },
    {
      title: t.videoSection?.videos[1]?.title || "Digital Marketing Strategies",
      description:
        t.videoSection?.videos[1]?.description ||
        "Discover our digital marketing strategies that drive results for our clients.",
      thumbnail: "/placeholder.svg?height=400&width=700",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
    },
  ]

  return (
    <section className="py-20 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">
            {t.videoSection?.title || "Learn More About Our Services"}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-body">
            {t.videoSection?.description ||
              "Watch our videos to learn more about how we can help your business grow online."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsPlaying(index)}>
                {isPlaying === index ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                ) : (
                  <>
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        <span className="material-icons text-white text-3xl md:text-4xl">play_arrow</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white font-heading">{video.title}</h3>
                <p className="text-gray-300 font-body">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
