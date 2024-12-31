import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { UserRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/userRepositoryMongoDB";
import { walletRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/walletRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const LocationWithIdGet = async (
  agentId: string,
  repository: ReturnType<locationRepositoryMongoDBType>
) => {
  if (!agentId) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  const data = repository.getLocationbyAgentIdDb(agentId);

  return data;
};
export const LocationDetails = async (
  location_id: string,
  repository: ReturnType<locationRepositoryMongoDBType>
) => {
  if (!location_id) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  const data = repository.getLocationbyIdDb(location_id);

  return data;
};

export const verifyLocationGet = async (
  repository: ReturnType<locationRepositoryMongoDBType>
) => {
  let value = { verify: true }; // Only verified locations
  const locations = await repository.getAllVerifyLocationDb(value);
  console.log('locations',locations);
  
  let verifiedLocations = locations.filter((location) => {
    return location.agent.isBlocked === false; // Exclude locations with blocked agents
  });
  console.log('verifiedLocations', verifiedLocations);
  
  return verifiedLocations;
};

export const walletGet = async (
  userId: string,
  repository: ReturnType<walletRepositoryMongoDBType>
) => {
  if (!userId) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  const data = await repository.getWalletDb(userId);
  console.log(data, "data");

  return data;
};