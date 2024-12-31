import { CreatePropertyInterface, PropertyInterface } from "../../../../entities/propertyInterface";
import { offerInterface } from "../../../../entities/offerInterface";
import Property from "../models/property";
import Offer from "../models/offer";

export const offerRepositoryMongoDB = () => {
  const createOfferDb = async (offer: offerInterface) => {
    const newOffer = new Offer(offer);
    const result=await newOffer.save();

    return result;
  };
  const getOfferDataDb=async(data:object)=>await Offer.find(data);
  const getOfferbyIdDb=async(id:string)=>await Offer.findById(id);

  const updateOfferByPropertydb = async (id: string, updates: any) => {

    const offer: CreatePropertyInterface | null = await Offer.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    return offer;
  };

  const getofferDb = async (id:string) => {
 const getOffer=await Offer.find({discountedAgent:id});
  return getOffer;
};


  return {
    createOfferDb,
    getOfferDataDb,
    getOfferbyIdDb,
    updateOfferByPropertydb,
    getofferDb
  };
};

export type offerRepositoryMongoDBType = typeof offerRepositoryMongoDB;