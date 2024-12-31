import { propertyRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/propertyRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const propertyGet = async (
  repository: ReturnType<propertyRepositoryMongoDBType>
) => {
  const getProperty = await repository.getPropertyDb();

  return getProperty;
};