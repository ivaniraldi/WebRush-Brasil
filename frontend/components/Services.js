"use client";

import { useEffect, useRef, useState } from "react";

export default function Services({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const services = [
    {
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      icon: "code",
      color: "from-[#a855f7] to-[#2563eb]",
    },
    {
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      icon: "trending_up",
      color: "from-[#2563eb] to-[#9333ea]",
    },
    {
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      icon: "bug_report",
      color: "from-[#9333ea] to-[#a855f7]",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {services.map((service, index) => (
        <div
          key={index}
          className={`group relative bg-gray-900/10 backdrop-blur-lg rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll ${
            isVisible ? 'in-view' : ''
          }`}
          style={{
            animationDelay: `${index * 0.15}s`
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 -z-10`}
          />
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/20 to-gray-800/40 backdrop-blur-sm mb-4">
            <span className={`material-icons text-xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white font-heading">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-gray-400 font-body leading-relaxed">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}