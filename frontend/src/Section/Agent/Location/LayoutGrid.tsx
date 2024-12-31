"use client";
import  { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../animation/cn";
import ImageIcon from "../../../assets/icons/istockphoto-1222357475-612x612.jpg";
type Card = {
  id: number;

  className: string;
  thumbnail: string;
};



 
export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
 
  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };
 
  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
 
  return (
    <div className="w-full h-full  grid grid-cols-1 md:grid-cols-4  max-w-7xl mx-auto gap-4 relative">
      {cards.slice(0,4).map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard  />}
            <BlurImage card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
      {cards.length-4>0?(   <div className="col-span-1  flex justify-center ">
   <div className="  my-auto flex-col justify-center">
   <img src={ImageIcon}  className="ms-6 w-24" /><p className="ms-8">{cards.length-4} Photos</p>

   </div>
        
          </div>):''}
   

    
    </div>
  );
};
 
const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={card.thumbnail}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};
 
const SelectedCard = () => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
  
    </div>
  );
};