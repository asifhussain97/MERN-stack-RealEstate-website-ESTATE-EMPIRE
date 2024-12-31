import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { HttpStatus } from "../../../types/httpStatus";
import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { LocationInterface } from "../../../entities/locationInterface";
import { locationAdd } from "../../../application/use-cases/location/create";
import { LocationDetails, LocationWithIdGet, verifyLocationGet } from "../../../application/use-cases/location/get";
import { locationEdit, verifyLocation,cancelLocation } from "../../../application/use-cases/location/edit";

export const locationController = (

  locationRepoimpl: locationRepositoryMongoDBType
) => {
  const repository = locationRepoimpl();
  const addLocation = expressAsyncHandler(async (req: Request, res: Response) => {

    const location: LocationInterface = req.body;


    await locationAdd(location,repository);

  
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "location added success fully",
      
    });
  });
  const getLocationWithId = expressAsyncHandler(async (req: Request, res: Response) => {

    const agentId:string = req.params.agentId;
    const data=await LocationWithIdGet(agentId,repository);
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "All location is fetched",
      data
    });
  });

  const getLocationDetails = expressAsyncHandler(async (req: Request, res: Response) => {

    const location_id:string = req.params.locationId;
    const data=await LocationDetails(location_id,repository);
    
    res.status(HttpStatus.OK).json({
      status: "success",
      message: " location details is fetched",
      data
    });
  });

  const LocationVerify = expressAsyncHandler(async (req: Request, res: Response) => {
    const locationId:string = req.body.locationId;
    const data=await verifyLocation(locationId,repository);
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "location is verifyed",
      data
    });
  });
  const CancelRequest = expressAsyncHandler(async (req: Request, res: Response) => {
    const locationId: string = req.body.locationId; // Get `locationId` from the request body
  
    const data = await cancelLocation(locationId, repository); // Call the cancellation use case
  
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "Location has been cancelled",
      data,
    });
  });

  const editLocation = expressAsyncHandler(async (req: Request, res: Response) => {
  

    
const location=req.body
    const data=await locationEdit(location,repository);
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "location is edited",
      data
    });
  });
  const getVerifyLocation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const data = await verifyLocationGet(repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "All users details has been fetched",
        data,
      });
    }
  );





  return {
    addLocation,
    getLocationWithId,
    LocationVerify,
    CancelRequest,
    editLocation,
    getLocationDetails,
    getVerifyLocation
  };
};