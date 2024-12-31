import { CreatePropertyInterface, PropertyInterface } from "../../../../entities/propertyInterface";
import Property from "../models/property";

export const propertyRepositoryMongoDB = () => {
  const createPropertyDb = async (propertyData: PropertyInterface) => {
    const newProperty = new Property({
      name: propertyData.name,
      description: propertyData.description,
      image: propertyData.image,
    });
    await newProperty.save();

    return newProperty;
  };
  const getPropertyDb=async()=>await Property.find();
  const getPropertybyIdDb=async(id:string)=>await Property.findById(id);

  const updatePropertyByPropertydb = async (id: string, updates: any) => {
    console.log(updates, "jhfjdk");

    const property: CreatePropertyInterface | null = await Property.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    return property;
  };

  const editPropertyDb = async (id: string, updates: any) => {
    console.log(updates, "jhfjdk");

    const property: CreatePropertyInterface | null = await Property.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    return property;
  };


  return {
    createPropertyDb,
    getPropertyDb,
    getPropertybyIdDb,
    updatePropertyByPropertydb,
    editPropertyDb
  };
};

export type propertyRepositoryMongoDBType = typeof propertyRepositoryMongoDB;
