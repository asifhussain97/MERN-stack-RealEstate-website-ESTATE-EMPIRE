import { Types } from "mongoose";
import {
  CreateOfferInterface,
  offerInterface,
} from "../../../entities/offerInterface";
import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { offerRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/offerRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const offerUpdate = async (
  offerId: string,
  offer: offerInterface,
  locationRepository: ReturnType<locationRepositoryMongoDBType>,
  offerRepository: ReturnType<offerRepositoryMongoDBType>
) => {
  if (!offerId) {
    throw new AppError("offer dose not exist", HttpStatus.NOT_FOUND);
  }
  const { name, startDate, endDate, discountValue, discountedAgent } = offer;

  if (!name || !startDate || !endDate || !discountValue || !discountedAgent) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  await offerRepository.updateOfferByPropertydb(offerId, {
    ...offer,
    isActive: true,
  });

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

export const offerDelete = async (
  offerId: string,
  locationRepository: ReturnType<locationRepositoryMongoDBType>,
  offerRepository: ReturnType<offerRepositoryMongoDBType>
) => {
  if (!offerId) {
    throw new AppError("offer dose not exist", HttpStatus.NOT_FOUND);
  }

  const offerDocument =  await offerRepository.getOfferbyIdDb(offerId);
  const offer: CreateOfferInterface | null = offerDocument
  ? {
      _id: offerDocument._id as Types.ObjectId, // Cast _id to ObjectId
      name: offerDocument.name,
      startDate: offerDocument.startDate,
      endDate: offerDocument.endDate,
      discountValue: offerDocument.discountValue,
      discountedAgent: offerDocument.discountedAgent,
      isActive: offerDocument.isActive,
    }
  : null;

  if (!offer) {
    throw new AppError("offer dose not exist", HttpStatus.NOT_FOUND);
  }

  offer.isActive = !offer.isActive;

  await offerRepository.updateOfferByPropertydb(offerId, {
    isActive: offer.isActive,
  });

  const locationDatas = await locationRepository.getLocationbyAgentIdDb(
    offer.discountedAgent
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
    offer.discountValue,
    offer.startDate,
    offer.endDate,
    offer.isActive
  );
  return true;
};