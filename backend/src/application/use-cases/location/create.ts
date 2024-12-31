import { LocationInterface } from "../../../entities/locationInterface";
import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
export const locationAdd = async (
  location: LocationInterface,
  repository: ReturnType<locationRepositoryMongoDBType>
) => {
  const {
    agent,
    address,
    name,
    description,
    image,
    capasity,
    price,
    type,
    state,
  } = location;

  if (
    !name ||
    !address ||
    !agent ||
    !description ||
    !image ||
    !capasity ||
    !price ||
    !state ||
    !type
  ) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }


  const data = await repository.createLocationDb(location);
  
  return true;
};







  
  

  