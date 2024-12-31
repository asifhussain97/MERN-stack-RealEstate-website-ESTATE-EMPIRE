import { ApiResponse, signupInputs } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { userUrls } from "../endpoint";
import { formatISO } from 'date-fns';
interface RazorpayResponse {
  razorpay_payment_id: string;
}

interface RazorpayOptions {
  key: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

interface Razorpay {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

interface ApiTimeResponse {
  status: string;
  message: string;
  data?: string [] | null;
}

export const getUserDeatails = (
  userId: string | null | undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getUserData}/${userId}`;
      console.log(url, "lfkldfdlkfdl");

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};

export const editProfileImg = (
  userId: string | null | undefined,
  image: string
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.editProfileImg}/${userId}`;

      apiCall("patch", url, { secure_url: image })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};
export const editProfile = (
  userId: string | null | undefined,
  userData: signupInputs
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getUserData}/${userId}`;

      apiCall("patch", url, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};





export const getLocation = (
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getlocation}`;
    

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};



// export const filterVender = (
//   vender: string[]
// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.filterVender}`;
    

//       apiCall("post", url, {type:vender})
//         .then((response) => { 
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const bookingEvent = (
//   booking:booking
// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.bookingEvent}`;
    

//       apiCall("post", url, booking)
//         .then((response) => { 
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const paymentEvent = (): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.paymentEvent}`;

//       apiCall("post", url, null)
//         .then((response) => { 
//           if (response.status !== "success") {
//             throw new Error(response.message);
//           }
//           const { data } = response;
//           console.log("Data received from paymentEvent API:", data);
          
//           // Ensure data.amount is valid
//           if (!data.amount) {
//             throw new Error("Amount is not defined in the response data");
//           }

//           const options = {
//             key: "rzp_test_rwud39pugiL6zo",
//             name: "Event portal",
//             description: "Some Description",
//             order_id: data.id,
//             handler: async (response: RazorpayResponse) => {
//               try {
//                 console.log("Razorpay response:", response);
//                 const paymentId = response.razorpay_payment_id;
//                 const captureUrl = `${userUrls.paymentcapture}/${paymentId}`;
                
//                 console.log("Making capture API call with amount:", data.amount);

//                 const captureResponse = await apiCall("post", captureUrl, { amount: data.amount });
//                 console.log("Capture API response:", captureResponse);
                
//                 resolve(captureResponse);
//               } catch (err) {
//                 console.error("Error in handler:", err);
//                 reject(err);
//               }
//             },
//             theme: {
//               color: "#686CFD",
//             },
//           };

//           const rzp1 = new window.Razorpay(options);
//           rzp1.open();
//         })
//         .catch((err) => {
//           console.error("Error in paymentEvent API call:", err);
//           reject(err);
//         });
//     } catch (error) {
//       console.error("Error in paymentEvent:", error);
//       resolve({ status: "500", message: "Something went wrong" });
//     }
//   });
// };

// export const getBookingHistory = (
//   userId: string | null | undefined
// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.bookingHistory}/${userId}`;
//       console.log(url, "lfkldfdlkfdl");

//       apiCall("get", url, null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const getBookingDetails = (
//   bookingId: string | null | undefined
// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.bookingDetails}/${bookingId}`;


//       apiCall("get", url, null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



export const checkAvailability = (
  date:Date|null,locationData:string
): Promise<ApiTimeResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.checkAvailability}`;
      console.log(date,'    const selectedDate = addDays(new Date(value), 0);');
      const formattedDate = date ? formatISO(date) : null;
    const data={date:formattedDate,locationData}


      apiCall("post", url,data )
        .then((response) => { 
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};

// export const bookingCancel = (
//   id:string|undefined,reason:string
// ): Promise<ApiTimeResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.bookingCancel}`;
//       const data={id,reason}

//       apiCall("post", url, data)
//         .then((response) => { 
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const getWallet = (
//   userId: string | null | undefined
// ): Promise<ApiResponseOfWallet> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.getWallet}/${userId}`;

//       apiCall("get", url, null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



// export const searchData = (
//   data: string | undefined,role:string,userId:string
// ): Promise<ApiResponseOfWallet> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.searchData}?role=${role}&search=${data}&id=${userId}`;

//       apiCall("get", url, null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };


// export const getAgent = (
//   role: string ,userId:string
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.getAgent}?role=${role}&id=${userId}`;

//       apiCall("get", url,null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



// export const getAllChat = (
//   userId: string 
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.allChats}/${userId}`;

//       apiCall("get", url,null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };


// export const postChat = (
//   userId: string ,receiverId:string|undefined,
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.createChat}`;

//       apiCall("post", url, {userId,receiverId})
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



// export const postMessage = (
//   userId: string ,chatId:string|undefined,content:string
// ): Promise<ApiResponseOfMessage> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.message}`;

//       apiCall("post", url, {userId,chatId,content})
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



// export const getMessage = (
//   chatId: string|undefined ,userId:string|undefined|null
// ): Promise<ApiResponseOfMessage> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.message}?chatId=${chatId} &userId=${userId}`;

//       apiCall("get", url,null)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };



// export const getUnreadMessages = (
//   chatId: string|undefined ,userId:string
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${userUrls.getUnreadMessagesFromChat}`;

//       apiCall("post", url,{chatId,userId})
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const deleteEveryOne = (
//   messageId: string  | undefined,

// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${commenUrls.deleteForEveryOne}`;

//       apiCall("patch", url, {messageId})
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };

// export const deleteForMe = (
//   messageId: string  | undefined,
//   userId: string | null | undefined,

// ): Promise<ApiResponse> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${commenUrls.deleteForMe}`;

//       apiCall("patch", url, {messageId,userId})
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } catch (error) {
//       resolve({ status: "500", message: "Something wrong" });
//     }
//   });
// };