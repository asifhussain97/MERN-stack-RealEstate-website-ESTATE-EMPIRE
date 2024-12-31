import { Types } from "mongoose";
import {
  CreateLocationInterface,
  LocationInterface,
} from "../../../../entities/locationInterface";
import Location from "../models/location";
import { UserDocument } from "../models/user";
export interface Image {
  url: string;
  type: string; // Optionally include type if needed
}
export const locationRepositoryMongoDB = () => {
  const createLocationDb = async (locationData: LocationInterface) => {
    console.log(locationData);
    const imageUrls= Array.isArray(locationData.image)
      ?     locationData.image.map((image: Image) =>{url:image.url} )

      : [];
      
    const newLocation = new Location({
      type: locationData.type,
      agent: locationData.agent,
      address: locationData.address,
      name: locationData.name,
      description: locationData.description,
      image: locationData.image,
      capasity: locationData.capasity,
      price: locationData.price,
      state: locationData.state,
    });
    return await newLocation.save();
  };

  const getLocationbyAgentIdDb = async (agent: string|Types.ObjectId ) => {
    return await Location.find({ agent });
  };
  const getLocationbyIdDb = async (id: string) => {
    return await Location.findById(id).lean();;
  };

  const verifyLocationDb = async (id: string, updates: any) => {
    const location: CreateLocationInterface | null =
      await Location.findByIdAndUpdate(id, updates, { new: true });
    return location;
  };
  const getLocationByIdValueDb = async (id: string) =>
    await Location.findById(id);
  const getAllVerifyLocationDb = async (value: object) =>
    await Location.find(value).populate<{ agent: UserDocument }>('agent');

  const addOfferToLocation = async (locationData: CreateLocationInterface[], discountValue: number, startDate: Date, expiryDate: Date, isActive: boolean) => {
    for (const location of locationData) {
      let discount = 0;
      
      if (!isActive) {
        location.discountPrice = location.price;
      } else {
        discount = (location.price * discountValue) / 100;
  
        location.discountPrice = calculateDiscountPrice(
          location.price,
          discountValue
        );
      }
      
      await Location.updateOne(
        { _id: location._id },
        {
          $set: {
            discountPrice: location.discountPrice,
            discount,
            discountStart: startDate,
            discountEnd: expiryDate,
            discountStatus: true,
          },
        }
      );
    }
  }
  
  
    function calculateDiscountPrice(price:number, discountValue:number) {

      let discountedPrice = price;
    
      
        discountedPrice -= (price * discountValue) / 100;
      
    
      return discountedPrice;
    }

  
  return {
    createLocationDb,
    getLocationbyAgentIdDb,
    verifyLocationDb,
    getLocationByIdValueDb,
    getAllVerifyLocationDb,
    getLocationbyIdDb,
    addOfferToLocation,
  };
};

export type locationRepositoryMongoDBType = typeof locationRepositoryMongoDB;