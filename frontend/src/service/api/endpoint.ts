export const authUrls = {
    register: "/auth/signup",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    login: "/auth/login",
    googleAuth: "/auth/googleAuth",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgotPassword",
    resetPassword: "/auth/resetPassword",
    forgotVerifyOtp: "/auth/verifyotp",
    refreshToken: "/auth/refreshAccessToken",
  };
  export const userUrls = {
    getUserData: "/user/profile",
    editProfileImg: "/user/profileimage",
    getlocation: "/location/getVerifyLocation",
    checkAvailability: "/booking/checkAvailability",  
    searchData: "/user/searchData",
    getAgent: "/user/agent",
    allChats: "/chat/allChats",
    message:'/message',
    createChat:'/chat',
    getUnreadMessagesFromChat:"/message/getUnreadMessagesFromChat",
  
  };
  
  export const adminUrls = {
    login: "/adminAuth",
    refreshToken: "/adminAuth/refreshAccessToken",
    getUserData: "/admin/users",
    getAgentData: "/admin/agent",
    blockUser: "/admin/userblock",
    addProperty: "/property/addpropertytype",
    getProperty: "/property/getproperty",
    verifyLocation: "/location/verfyLocation",
    cancelRequest: "/location/cancelRequest",
    blockProperty: "/property/propertyblock",
  };
  
  export const agentUrls = {
    addLocation: "/location/addLocation",
    editLocation: "/location/editLocation",
    gelocationwithId: "/location/getlocationwithid",
    gelocationDetails: "/location/getLocationDetails",
    // getVender: "/vender/getVerifyVender",
    getUserData: "/user/profile",
    editProfileImg: "/user/profileimage",
    // getvenderwithid:"/vender/getVerifyVenderWithId",
    getUserBooking:"/agent/getUserBooking",
    getUserbookingDetails:"/agent/getUserbookingDetails",
    bookService: "/booking/bookService",
    // venderPaymentBooking: "/booking/venderPaymentBooking",
    // venderPaymentcapture: "/booking/venderPaymentcapture",  
    addOffer: "/offer/addOffer",
    getOffer: "/offer/getOffer", 
    blockOffer: "/offer/blockOffer", 
    editOffer: "/offer/editOffer", 
    searchData: "/user/searchData",
    getAgent: "/user/agent",
    allChats: "/chat/allChats",
    groupChat: "/chat/group",
    message:'/message',
     createChat:'/chat',
     getUnreadMessagesFromChat:"/message/getUnreadMessagesFromChat",
     getWallet: "/user/getWallet",
  };
  
  export const commenUrls = {
    deleteForMe: "/message/deleteForMe",
    deleteForEveryOne: "/message/deleteEveryOne",
    getNotifications:"/notification/getNotifications"
  
  };

