import { Wallet } from "../models/wallet";

export const walletRepositoryMongoDB = () => {
  const createWalletDb = async (user:string,amount:number|undefined) => {
    
    const wallet = new Wallet({
        user,
        transactions:[{type:"credit",amount:amount?amount*(75/100):0}],
        walletBalance:  amount?amount*(75/100):0
    });

   const walletData= await wallet.save();

    return walletData;
  };
  const getWalletDb=async(user:string)=>await Wallet.findOne({user});

  const updatewalletBalancedb = async (id: string, totalAmount: number|undefined) => {
    try {
      const walletData = await Wallet.findOne({ user: id });
  

      if (!totalAmount) {
        throw new Error(`Wallet data not found for user with id: ${id}`);
      }
      if (!walletData) {
        throw new Error(`Wallet data not found for user with id: ${id}`);
      }
  
      walletData.walletBalance += totalAmount * (75 / 100);
  
      walletData.transactions.push({
        type: "credit",
        amount: totalAmount * (75 / 100),
        date:new Date()
      });
  
      await walletData.save();
    } catch (error) {
      console.error('Error updating wallet balance:', error);
    }
  };
  
  return {
    createWalletDb,
    getWalletDb,
    updatewalletBalancedb,
  };
};

export type walletRepositoryMongoDBType = typeof walletRepositoryMongoDB;