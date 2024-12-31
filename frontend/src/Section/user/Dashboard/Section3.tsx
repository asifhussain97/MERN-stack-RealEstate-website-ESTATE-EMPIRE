import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { locationData } from "../../../utils/Contents";
import LocationCard from "../../../components/user/LocationCard";

const Section3: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1280) {
        setCardsToShow(4);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => {
      window.removeEventListener("resize", updateCardsToShow);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, locationData.length - cardsToShow)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [cardsToShow]);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, locationData.length - cardsToShow)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const isNextDisabled = startIndex + cardsToShow >= locationData.length;
  const isPrevDisabled = startIndex === 0;

  return (
    <section>
      <h1 className="h1">Recommended Venues</h1>
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrev}
          className={`px-2 py-1 me-2 rounded-full text-white ${
            isPrevDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-regal-blue"
          }`}
          disabled={isPrevDisabled}
        >
          <FaArrowLeft className="text-2xl" />
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${startIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {locationData.map((locationCardData) => (
              <div
                key={locationCardData.name}
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <LocationCard {...locationCardData} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className={`px-2 py-1 ms-2 rounded-full text-white ${
            isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-regal-blue"
          }`}
          disabled={isNextDisabled}
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Section3;