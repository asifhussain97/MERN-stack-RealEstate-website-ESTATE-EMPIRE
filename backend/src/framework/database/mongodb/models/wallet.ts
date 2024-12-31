import { Document, Schema, model, Types } from 'mongoose';




interface TransactionDocument {
  date: Date; 
  amount: number; 
  type: 'debit' | 'credit'; 
}
export interface WalletDocument extends Document {
  user: Types.ObjectId | string; 
  transactions: TransactionDocument[]; 
  walletBalance: number; 
  createdAt: Date; 
  updatedAt: Date; 
}




const transactionSchema = new Schema<TransactionDocument>({
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  }
});

const walletSchema = new Schema<WalletDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactions: [transactionSchema],
  walletBalance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


export const Wallet = model('Wallet', walletSchema);