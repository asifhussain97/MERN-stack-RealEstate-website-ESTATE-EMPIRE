import { propertyRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/propertyRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
export const propertyAdd = async (
    property: {
    name: string;
    description: string;
    image: string;
  },
  repository: ReturnType<propertyRepositoryMongoDBType>
) => {
  if (!property.name || !property.description || !property.image) {
    throw new AppError("Fill All informations", HttpStatus.BAD_REQUEST);
  }
  await repository.createPropertyDb(property);

  return true;
};