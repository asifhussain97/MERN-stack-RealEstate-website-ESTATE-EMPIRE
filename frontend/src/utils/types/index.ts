
export type signupInputs = {
    username?: string
    email?: string
    password?:string
    phone?:string
    confirmPassword?:string,
    oldpassword?:string
    role?:string
    }
  
  
    export type initialSate={
      loading: boolean,
      token?:  string | null|undefined,
      userId?: string | null|undefined,
      user?: string|null|undefined,
      adminId?: string | null|undefined,
      admin?: string|null|undefined
      adminToken?:  string | null|undefined,
      refreshToken?:string | null|undefined,
      adminrefreshToken?:string | null|undefined,
    }
  
 







    export type agentSate={
      loading: boolean,
  
      agentId?: string | null|undefined,
      agent?: string|null|undefined
      agentToken?:  string | null|undefined,
      refreshToken?: string | null|undefined,
    }
  
    export type ErrorMessageProps ={
      error?: string | null;
      open: boolean;
      message?: string | null,
      onClose: () => void;
    }
  
    export type OtpInputs = {
      otp1: string;
      otp2: string;
      otp3: string;
      otp4: string;
    };
  
    export type reest = {
      password:string
    
      confirmPassword?:string,
      oldpassword?:string
     
    };
  
    export type ApiResponse={
      status: string;
      message: string;
      token?:string;
      user?:string;
      data?: object| [];
      userId?:string;
      adminId?: string ,
      admin?: string,
      type?:string,
      newAccessToken?:string,
      refreshToken?:string,
      role?:string
    }
  
    export type ApiSearchResponse={
      status: string;
      message: string;
    
      data?: object| [];
     
    }
  
   
    export type ApiError = {
      response: {
        data: {
          message: string;
        };
      };
    };
  



    export type ProfileFormProps = {
      setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
      userData:userDataTypes |null,
      setApi: React.Dispatch<React.SetStateAction<boolean>>;
      api:boolean,
    };
    export type cropFormProps = {
      setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
     
    };
   export type CropperDemoProps = {
      src: string;
      handleClose: () => void;
      getCroppedFile: (croppedImageUrl: string) => void;
    };
  
    export type ModalProps = {
      isOpen: boolean;
      onClose: () => void;
      children: React.ReactNode;
    };
  
  
    export type userDataTypes ={
      _id:string,
      username:string,
      email:string,
      phone?: string|undefined,
      image?:string| undefined,
      createdAt?:string,
      updatedAt?:string,
      isBlocked?:boolean,
      refreshToken?:string,
      refreshTokenExpiresAt?:string
      role:string
    }
  
  
    export type propsValue={
      role?:string ,
      style:{button:string,bg_color:string},
      loginSuccess?:any;
      path:string,
      forgotPath?:string,
      receivedData?:string,
      pathdata?:string,
      loginPath?:string,
      signUpPath?:string
  
     }

    export type propertyType={
      name:string,
      description:string,
      imageFile?: string,
      image:string,
   }









   export type ApiResponseLocation={
    status: string;
    message: string;
    data?:object|null;
   }
   
  export type location = {
    _id?: string;
    name: string;
    description: string;
    address: string;
    state: string;
    type: string[];
    price: number;
    capasity: string;
    image: {url:string}[];
    agent?: string | null | undefined;
    verify?: boolean;
    discountPrice?:number
  }

  export type offer={
    name:string,
    discountValue:number,
  _id?:string
    endDate:string,
    startDate:string,
    discountedAgent:string | null | undefined,
    isActive?:boolean
  }

    export type propertyDataTypes= {
      _id: number |string;
      name: string;
      description: string;
      image?: string;
      isBlocked?: boolean;
      createdAt?:string;
      updatedAt?:string
    }
   















    export type booking={
      _id?: string;
      name:string,
      property:string,
  
      type: string[],
      time:string,
      date:string,
  
      agent:string,
      locationData:string,
     }

     export type serviceBooking={
      _id?: string;
      name:string,
      property:string,
  
  
      date:string,
      agent:string|undefined|null,
      
      status:string,
      bookingData?:string,
     }
     export type bookingData={
      _id?: string|undefined;
      name:string,
      property:propertyDataTypes,

      type: string[],
      time:string,
      date:string,
      total:number,
      phone:string,

      agent:userDataTypes,
      user:userDataTypes,
      locationData:location,
      status?:string
     }
     
     export type propertyState={
      loading: boolean,
    
    data:propertyDataTypes[]|null
    
    }

    export type selectUser={
      loading: boolean,
    
    
      user:userDataTypes|null,
    
    
    
    }
    

    export type ApiResponseOfBooking={
      status: string;
      message: string;
    
      data?: object| bookingData[];
     
      
    }

    export type ApiResponseOfWallet={
      status: string;
      message: string;
    
      data?: wallet
     
      
    }
    




















    export type wallet={
      _id?:string
      user: string;
      walletBalance: number;
      transactions:transaction[]
    
    
     
      
    }

     
  export type transaction={
    _id?:string
    date: string;
    amount: number;
    type:string 
  }

   

  
  
  

 

  





