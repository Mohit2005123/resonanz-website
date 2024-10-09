"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Photo = {
  id: number;
  src: string;
  alt: string;
};

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, src: "https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg", alt: "Photo 1" },
    { id: 2, src: "https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg", alt: "Photo 2" },
    { id: 3, src: "https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg", alt: "Photo 3" },
    { id: 4, src: "https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg", alt: "Photo 4" },
    { id: 5, src: "https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg", alt: "Photo 5" },
  ]);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const getPhotoIndex = (offset: number) => {
    return (currentPhotoIndex + offset + photos.length) % photos.length;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden px-4">
      <h2 className="text-white text-2xl font-bold mb-8">OUR GALLERY</h2>
      <div className="relative w-full max-w-5xl h-64 sm:h-80 md:h-96 perspective-1000">
        {[-1, 0, 1].map((offset) => {
          const index = getPhotoIndex(offset);
          const spacing = 120;
          return (
            <motion.div
              key={photos[index].id}
              className="absolute top-1/2 left-1/2 w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56"
              initial={{
                x: `calc(${offset * spacing}% - 50%)`,
                y: "-50%",
                rotateY: offset * 40,
                rotateX: offset === 0 ? 0 : 5,
                z: offset === 0 ? 0 : -200,
              }}
              animate={{
                x: `calc(${offset * spacing}% - 50%)`,
                y: "-50%",
                rotateY: offset * 40,
                rotateX: offset === 0 ? 0 : 5,
                z: offset === 0 ? 0 : -200,
                opacity: offset === 0 ? 1 : 0.7,
                scale: offset === 0 ? 1.2 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut", // Smoother transition effect
              }}
              style={{
                transformOrigin: offset === 0 ? "center" : offset < 0 ? "left center" : "right center",
              }}
            >
              <div
                className="p-1 rounded-lg"
                style={{
                  background: "linear-gradient(45deg, white, transparent)",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
              >
                <img
                  src={photos[index].src}
                  alt={photos[index].alt}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ backgroundClip: "padding-box" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
