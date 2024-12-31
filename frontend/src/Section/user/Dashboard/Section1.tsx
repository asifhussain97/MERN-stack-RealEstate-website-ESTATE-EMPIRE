import React, { useState, useEffect } from "react";
import { propertyCards } from "../../../utils/Contents";
import IconCard from "../../../components/user/IconCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Section1: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState(4); // default number of cards to show

  useEffect(() => {
    const updateCardsToShow = () => {
      console.log(window.innerWidth, "kkkkk");

      if (window.innerWidth >= 1280) {
        setCardsToShow(6);
      } else if (window.innerWidth >= 1024) {
        setCardsToShow(5);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(4);
      } else {
        setCardsToShow(2);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => {
      window.removeEventListener("resize", updateCardsToShow);
    };
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, propertyCards.length - cardsToShow)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const isNextDisabled = startIndex + cardsToShow >= propertyCards.length;
  const isPrevDisabled = startIndex === 0;
  return (
    <section className="my-12 flex items-center justify-center">
      <button
        onClick={handlePrev}
        className={`px-2 py-1 me-8 rounded-full text-white ${
          isPrevDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-regal-blue"
        }`}
      >
        <FaArrowLeft className="text-2xl" />
      </button>
      <div className="flex flex-wrap overflow-hidden w-full justify-between">
        {propertyCards
          .slice(startIndex, startIndex + cardsToShow)
          .map((propertyCardData) => (
            <IconCard key={propertyCardData.name} {...propertyCardData} />
          ))}
      </div>
      <button
        onClick={handleNext}
        className={`px-2 py-1 ms-8 rounded-full text-white ${
          isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-regal-blue"
        }`}
      >
        <FaArrowRight className="text-2xl" />
      </button>
    </section>
  );
};

export default Section1;