import "./Carousel.css";
import { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1/600/300",
  "https://picsum.photos/id/12/600/300",
  "https://picsum.photos/id/23/600/300"
]

export default function Carousel() {
  // 현재 슬라이드의 인덱스
  const [ index, setIndex ] = useState(1) // 첫 번째 이미지가 아닌 '가짜' 첫 번째 
  const [ isTransitioning, setIsTransitioning ] = useState(true) // 애니메이션 상태 추가
  const [ isPaused, setIsPaused ] = useState(false); // 자동 슬라이드 일시정지

  // 앞뒤에 가짜 슬라이드를 추가한 배열 생성
  const extendedImages = [images[images.length - 1], ...images, images[0]]  

  const nextSlide = () => {
    if(index >= extendedImages.length - 1) return;
    setIndex((nextIndex) => (nextIndex + 1))
    setIsTransitioning(true)
    restartAutoSlide() // 버튼 클릭 시 자동 슬라이드 재설정
  }

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1)) 
    setIsTransitioning(true)
    restartAutoSlide() // 버튼 클릭 시 자동 슬라이드 재설정
  }

  // 무한루프 효과 추가
  useEffect(() => {
    if(index === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false)
        setIndex(1)
      }, 500)
    }
    if(index === 0) {
      setTimeout(() => {
        setIsTransitioning(false)
        setIndex(extendedImages.length - 2);
      }, 500)
    }
  }, [index])

  // 자동 슬라이드(일시정지)
  useEffect(() => {
    if(isPaused) return;

    const interval = setInterval(nextSlide, 1500); // 1.5초마다 자동 슬라이드
    return () => {
      clearInterval(interval) // 언마운트될 때 인터벌 정리
    }
  }, [isPaused]) // isPaused 상태가 변경될 때마다 실행
  
  // 자동 슬라이드 재게
  const restartAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000) // 3초 후 다시 자동 슬라이드 재게
  }

  return (
    <div className="carousel">
      <div className="carousel-track"
        style={{ 
          transform: `translateX(-${index * 100}%)`, 
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((src, i) => (
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

