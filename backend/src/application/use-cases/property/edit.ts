import { propertyRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/propertyRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const propertyBlock = async (
    propertyId: string,
  repository: ReturnType<propertyRepositoryMongoDBType>
) => {
  if (!propertyId) {
    throw new AppError(
      "Somthing went wrong please log in again",
      HttpStatus.UNAUTHORIZED
    );
  }
  const property = await repository.getPropertybyIdDb(propertyId);

  if (!property) {
    throw new AppError("User Dose not exist", HttpStatus.UNAUTHORIZED);
  }
  if (!property.isBlocked) {
    let updates = { isBlocked: true };
    const property = await repository.updatePropertyByPropertydb(propertyId, updates);

    return { property, message: "property blocked succesfully" };
  } else {
    let updates = { isBlocked: false };
    const property = await repository.updatePropertyByPropertydb(propertyId, updates);

    return { property, message: "property Unblocked succesfully" };
  }
};

export const propertyEdit = async (
  id: string,
  property: {
    name: string;
    description: string;
    image: string;
  },
  repository: ReturnType<propertyRepositoryMongoDBType>
) => {
  if (!id) {
    throw new AppError("Hotel dose not exist", HttpStatus.NOT_FOUND);
  }

  if (!property.name || !property.description || !property.image) {
    throw new AppError("Fill All informations", HttpStatus.BAD_REQUEST);
  }
  await repository.editPropertyDb(id, property);

  return true;
};