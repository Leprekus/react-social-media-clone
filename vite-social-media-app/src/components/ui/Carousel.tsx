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
  
    console.log(images)
    return (
      <div className="w-full h-[388px] bg-red-500 relative group">
        <div className={`
                absolute 
                opacity-0 
                ${images.length > 1 ? 'group-hover:opacity-100' : ''} 
                transition 
                min-w-full
                flex
                justify-between
                px-4
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                `}>
            <button className="carousel-button" onClick={prevSlide}>&lt;</button>
            <button className="carousel-button" onClick={nextSlide}>&gt;</button>
        </div>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
      </div>
    );
}
