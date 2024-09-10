import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover the Latest Trends for Men",
      subtitle: "FASHION FOR MEN",
      description: "UP to 80% OFF",
      image: "path_to_smart_watch_image_1",
      background: "/bg-1.jpg",
    },
    {
      id: 2,
      title: "Stylish & Elegant Women's Collection",
      subtitle: "FASHION FOR WOMEN",
      description: "Check out now",
      image: "path_to_smart_watch_image_2",
      background: "/bg-2.jpg",
    },
    {
      id: 3,
      title: "Adorable & Trendy Kids' Wear",
      subtitle: "FASHION FOR KIDS",
      description: "Hurry up!",
      image: "path_to_smart_watch_image_3",
      background: "/bg-3.jpg",
    },
  ];

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 2000); // 2000 ms = 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12">
      <div className="overflow-hidden rounded-none md:rounded-lg shadow-lg relative h-80 md:h-96 lg:h-112">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0"
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex flex-col items-center justify-center p-8 bg-indigo-900 bg-opacity-75 text-white h-full">
                <div className="text-sm uppercase tracking-wider">{slide.title}</div>
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold mt-4">{slide.subtitle}</div>
                <div className="text-sm mt-2">{slide.description}</div>
                <img
                  src={slide.image}
                  alt="Smart Watch"
                  className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 mt-8"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow-lg focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow-lg focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;