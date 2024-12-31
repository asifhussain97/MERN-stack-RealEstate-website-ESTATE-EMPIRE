import { ApiResponse, ApiResponseOfWallet, ApiSearchResponse, location, offer, serviceBooking, signupInputs  } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { agentUrls } from "../endpoint";



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

  export const getAlllocationwithId = (agentId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.gelocationwithId}/${agentId}`;
   
  
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
 
  export const getlocationDetails = (locationId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.gelocationDetails}/${locationId}`;
   
  
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


export const addLocation = (data: location): Promise<ApiResponse> => {

    return new Promise((resolve, reject) => {
      try {
        apiCall("post", agentUrls.addLocation,data)
          .then((response) => {
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: "500", message: "Somethings wrong." });
      }
    });
  };

//   export const getVender = (
//   ): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         const url = `${agentUrls.getVender}`;
      
  
//         apiCall("get", url, null)
//           .then((response) => {
//             resolve(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Something wrong" });
//       }
//     });
//   };

  
export const editLocation = (data: location): Promise<ApiResponse> => {
console.log(data);

    return new Promise((resolve, reject) => {
      try {
        apiCall("put", agentUrls.editLocation,data)
          .then((response) => {
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: "500", message: "Somethings wrong." });
      }
    });
  };


  export const getUserDeatails = (
    userId: string | null | undefined
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.getUserData}/${userId}`;
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
        const url = `${agentUrls.editProfileImg}/${userId}`;
  
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
        const url = `${agentUrls.getUserData}/${userId}`;
  
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

//   export const getVenderDetails = (venderId:string|undefined|null
//   ): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         const url = `${agentUrls.getvenderwithid}/${venderId}`;
   
  
//         apiCall("get", url, null)
//           .then((response) => {
//             resolve(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Something wrong" });
//       }
//     });
//   };



  export const getUserBookingHistory = (
    agentId: string | null | undefined
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.getUserBooking}/${agentId}`;
    
  
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

  export const getUserBookingDetails = (
    bookingId: string | null | undefined
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.getUserbookingDetails}/${bookingId}`;
  
  
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



  // export const bookingService = (
  //   service:serviceBooking
  // ): Promise<ApiResponse> => {
    

  //   return new Promise((resolve, reject) => {
  //     try {
  //       const url = `${agentUrls.bookService}`;
  
  //       apiCall("post", url, service)
  //         .then((response) => { 
  //           if (response.status !== "success") {
  //             throw new Error(response.message);
  //           }
  //           const { data } = response;
  //           console.log("Data received from paymentProperty API:", data);
            
  //           // Ensure data.amount is valid
  //           if (!data.total) {
  //             throw new Error("Amount is not defined in the response data");
  //           }
  
  //           const options = {
  //             key: "rzp_test_rwud39pugiL6zo",
  //             name: "Estate Empire",
  //             description: "Some Description",
  //             order_id: data.id,
  //             amount: data.total * 100, // amount in paise
  //             currency: "INR",
  //             handler: async (response: RazorpayResponse) => {
  //               try {
  //                 console.log("Razorpay response:", response);
  //                 const paymentId = response.razorpay_payment_id;
  //                 const captureUrl = `${agentUrls.venderPaymentcapture}/${paymentId}`;
                  
  //                 console.log("Making capture API call with amount:", data.total);
  
  //                 const captureResponse = await apiCall("post", captureUrl, { amount: data.total });
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
  //           console.error("Error in paymentProperty API call:", err);
  //           reject(err);
  //         });
  //     } catch (error) {
  //       console.error("Error in paymentProperty:", error);
  //       resolve({ status: "500", message: "Something went wrong" });
  //     }
  //   });



  // };
  


  export const addOffer = (data:offer): Promise<ApiResponse> => {

    return new Promise((resolve, reject) => {
      try {
        apiCall("post", agentUrls.addOffer,data)
          .then((response) => {
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: "500", message: "Somethings wrong." });
      }
    });
  };

  export const getOffer = (id:string|null|undefined
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${agentUrls.getOffer}/${id}`;
  
  
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


  export const editOffer = (data: offer,id:string|undefined): Promise<ApiResponse> => {
    console.log(data);
    
        return new Promise((resolve, reject) => {
          try {
            const url = `${agentUrls.editOffer}/${id}`;
            apiCall("put", url,data)
              .then((response) => {
                resolve(response);
                console.log(response);
              })
              .catch((err) => {
                reject(err);
              });
          } catch (error) {
            resolve({ status: "500", message: "Somethings wrong." });
          }
        });
      };

      export const blockOffer = (
        offerId: string | null | undefined,
        
      ): Promise<ApiResponse> => {
        return new Promise((resolve, reject) => {
          try {
            const url = `${agentUrls.blockOffer}`;
      
            apiCall("patch", url, { offerId })
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


      

export const searchData = (
  data: string | undefined,role:string,userId:string
): Promise<ApiSearchResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${agentUrls.searchData}?role=${role}&search=${data}&id=${userId}`;

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


// export const postChat = (
//   userId: string ,receiverId:string|undefined
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.createChat}`;

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

// export const groupChat = (
//   data:{name:string,users:[],userId:string}
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.groupChat}`;

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





// export const getAgent = (
//   role: string ,userId:string
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.getAgent}?role=${role}&id=${userId}`;

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



// export const getAllChats = (
//   userId:string
// ): Promise<ApiResponseOfChat> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.allChats}/${userId}`;

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



// export const postMessage = (
//   userId: string ,chatId:string|undefined,content:string
// ): Promise<ApiResponseOfMessage> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.message}`;

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
//   chatId: string|undefined ,userId:string
// ): Promise<ApiResponseOfMessage> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${agentUrls.message}?chatId=${chatId} &userId=${userId}`;

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
//       const url = `${agentUrls.getUnreadMessagesFromChat}`;

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


export const getWallet = (
  userId: string | null | undefined
): Promise<ApiResponseOfWallet> => {
  return new Promise((resolve, reject) => {
    console.log(userId,'userId');
    
    try {
      const url = `${agentUrls.getWallet}/${userId}`;

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
//   userId: string ,

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





// export const getNotification = (
//   userId:string
// ): Promise<ApiResponseOfMessage> => {
//   return new Promise((resolve, reject) => {
//     try {
//       const url = `${commenUrls.getNotifications}/${userId}`;

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