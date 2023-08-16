import React from 'react'
import { useState } from 'react'

interface CarouselProps {
    images: string[]
}
export default function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="carousel">
        <button className="carousel-button" onClick={prevSlide}>&lt;</button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
        <button className="carousel-button" onClick={nextSlide}>&gt;</button>
      </div>
    );
}
