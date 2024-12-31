import { Schema, model } from "mongoose";

export interface PropertyDocument extends Document {
  name: string;
  description: string;
  image: string | null;
  isBlocked:Boolean
}
const propertySchema: Schema<PropertyDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isBlocked:{
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Property = model("property", propertySchema);

export default Property;