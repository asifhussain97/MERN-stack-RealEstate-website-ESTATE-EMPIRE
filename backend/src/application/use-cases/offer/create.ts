import { Types } from "mongoose";
import {

    offerInterface,
  } from "../../../entities/offerInterface";
  import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
  import { offerRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/offerRepositoryMongoDB";
  import { HttpStatus } from "../../../types/httpStatus";
  import AppError from "../../../utils/appError";
  
  export const offerAdd = async (
    offer: offerInterface,
    offerRepository: ReturnType<offerRepositoryMongoDBType>,
    locationRepository: ReturnType<locationRepositoryMongoDBType>
  ) => {
    const {
      name,
      startDate,
      endDate,
      discountValue,
      discountedAgent,
      isActive,
    } = offer;
  
    if (!name || !startDate || !endDate || !discountValue || !discountedAgent) {
      throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
    }
  
    const existingNameOffer = await offerRepository.getOfferDataDb({ name });
  
    const existingAgentOffer = await offerRepository.getOfferDataDb({
      discountedAgent,
    });
    if (Array.isArray(existingNameOffer) && existingNameOffer.length > 0) {
      throw new AppError(
        "Duplicate Discount Name not allowed.",
        HttpStatus.BAD_REQUEST
      );
    }
  
    if (Array.isArray(existingAgentOffer) && existingAgentOffer.length > 0) {
      throw new AppError(
        "An offer for this agent already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
  
    await offerRepository.createOfferDb({ ...offer, isActive: true });
  
    const locationDatas = await locationRepository.getLocationbyAgentIdDb(
      discountedAgent
    );
  
    const locationData = locationDatas.map((location) => ({
      _id: location._id as Types.ObjectId, // Cast _id to ObjectId
      agent: location.agent,
      address: location.address,
      name: location.name,
      description: location.description,
      image: location.image,
      capasity: location.capasity,
      price: location.price,
      state: location.state,
      verify: location.verify,
      discountPrice: location.discountPrice,
    }));
    
    const result = await locationRepository.addOfferToLocation(
      locationData,
      discountValue,
      startDate,
      endDate,
      true
    );
    return true;
  };