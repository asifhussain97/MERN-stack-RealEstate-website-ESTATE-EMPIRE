
import mongoose, { Schema, Types, model, Document } from "mongoose";


export interface OfferDocument extends Document {
  name: string;

  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  discountedAgent: Types.ObjectId;
}


const offerSchema: Schema<OfferDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    discountedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = model("Offer", offerSchema);
export default Offer;