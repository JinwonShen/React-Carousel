import "./Carousel.css";
import { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1/600/300",
  "https://picsum.photos/id/12/600/300",
  "https://picsum.photos/id/23/600/300"
]

export default function Carousel() {
  // 현재 슬라이드의 인덱스
  const [ index, setIndex ] = useState(0)

  const nextSlide = () => {
    setIndex((nextIndex) => (nextIndex + 1) % images.length);
  }

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) & images.length) 
  }

  // 자동 슬라이드(일시정지)
  useEffect(() => {
    const interval = setInterval(nextSlide, 1500);
  
    return () => {
      clearInterval(interval)
    }
  }, [])
  

  return (
    <div className="carousel">
      <div className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i}`} className="carousel-slide" />
        ))}
        {/* <img src="" alt="slide 1" className="carousel-slide" />
        <img src="" alt="slide 2" className="carousel-slide" />
        <img src="" alt="slide 3" className="carousel-slide" /> */}
      </div>

      <button className="carousel-button left" onClick={prevSlide} >
        ◀
      </button>
      <button className="carousel-button right" onClick={nextSlide} >
        ▶
      </button>
    </div>
  )
}

