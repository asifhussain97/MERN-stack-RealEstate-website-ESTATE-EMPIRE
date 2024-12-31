import mongoose, { Schema, Types, model, Document } from "mongoose";

export interface Image {
  url: string;
}

export interface LocationDocument extends Document {
  agent: Types.ObjectId;
  address: string;
  name: string;
  description: string;
  image: Image[];
  capasity: number;
  price: number;
  discountPrice: number;
  state: string;
  verify: boolean;
  isBlocked: boolean;
  type: Types.ObjectId[];
  discount?: number;
  discountStart?: Date;
  discountEnd?: Date;
}

const locationSchema: Schema<LocationDocument> = new Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    }],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [
        { url: String }
      ]
    },
    address: {
      type: String,
      required: true,
    },
    capasity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    
    },
    state: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
    },
    discountStart: {
      type: Date,
    },
    discountEnd: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Location = model("Location", locationSchema);
export default Location;