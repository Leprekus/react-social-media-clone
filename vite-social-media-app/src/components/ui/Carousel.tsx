import { useState } from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'

interface CarouselProps {
    images: string[]
}
export default function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images?.length) % images?.length);
    };

    return (
      <div className="w-full h-[388px] relative group flex items-center justify-center overflow-hidden">
        <div className={`
                absolute 
                opacity-0 
                ${images?.length > 1 ? 'group-hover:opacity-100' : ''} 
                transition 
                min-w-full
                flex
                justify-between
                px-4
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                `}>
            <button className="carousel-button" onClick={prevSlide}><IoIosArrowDropleftCircle size={30}/></button>
            <button className="carousel-button" onClick={nextSlide}><IoIosArrowDroprightCircle size={30}/></button>
        </div>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
      </div>
    );
}
