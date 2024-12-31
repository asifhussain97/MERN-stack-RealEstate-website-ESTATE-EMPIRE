import { LocationInterface } from "../../../entities/locationInterface";
import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const locationEdit = async (
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

  const id = location.id;

  if (!id) {
    throw new AppError("vender dose not exist", HttpStatus.NOT_FOUND);
  }

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

  return await repository.verifyLocationDb(id, location);
};

export const verifyLocation = async (
  locationId: string,
  repository: ReturnType<locationRepositoryMongoDBType>
) => {
  if (!locationId) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }
  const location = await repository.getLocationByIdValueDb(locationId);

  if (!location) {
    throw new AppError("Location does not exist", HttpStatus.UNAUTHORIZED);
  }

  if (!location.verify) {
    let updates = { verify: true };
    const location = await repository.verifyLocationDb(locationId, updates);

    return { location };
  }
};

export const cancelLocation = async (locationId: string, repository: any) => {
  const updates = { verify: "cancelled" }; // Set the `verify` field to "cancelled"
  return await repository.verifyLocationDb(locationId, updates);
};
