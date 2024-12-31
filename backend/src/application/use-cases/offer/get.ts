
import { offerRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/offerRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const offerGet = async (
  id: string,
  repository: ReturnType<offerRepositoryMongoDBType>
) => {
  const getEvent = await repository.getofferDb(id);

  return getEvent;
};