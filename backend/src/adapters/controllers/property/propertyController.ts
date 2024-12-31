import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { propertyRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/propertyRepositoryMongoDB";
import { PropertyInterface } from "../../../entities/propertyInterface";
import { HttpStatus } from "../../../types/httpStatus";
import { propertyGet } from "../../../application/use-cases/property/get";
import { propertyAdd } from "../../../application/use-cases/property/create";
import {
    propertyBlock,
    propertyEdit,
} from "../../../application/use-cases/property/edit";

export const propertyController = (propertyRepoimpl: propertyRepositoryMongoDBType) => {
  const repository = propertyRepoimpl();
  const addProperty = expressAsyncHandler(async (req: Request, res: Response) => {
    console.log(req.body, "req.body");

    const property: PropertyInterface = req.body;
    await propertyAdd(property, repository);

    console.log("jhgfdhj");
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "All users details has been fetched",
    });
  });
  const getProperty = expressAsyncHandler(async (req: Request, res: Response) => {
    console.log(req.body, "req.body");

    const data = await propertyGet(repository);

    res.status(HttpStatus.OK).json({
      status: "success",
      message: "get all property",
      data,
    });
  });

  const handleBlockProperty = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const propertyId: any = req.body.propertyId;
      const { property, message } = await propertyBlock(propertyId, repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message,
        data: property,
      });
    }
  );

  const editProperty = expressAsyncHandler(async (req: Request, res: Response) => {
    const propertyId: any = req.params.propertyId;
    const property: any = req.body;
    const response = await propertyEdit(propertyId, property, repository);

    res.status(HttpStatus.OK).json({
      status: "success",
    });
  });

  return {
    editProperty,
    addProperty,
    getProperty,
    handleBlockProperty,
  };
};