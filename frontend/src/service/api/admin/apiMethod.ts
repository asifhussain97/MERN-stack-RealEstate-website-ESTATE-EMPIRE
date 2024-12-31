import { ApiResponse, propertyType, signupInputs } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { adminUrls } from "../endpoint";
export const postLogin = (userData: signupInputs): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.login, userData)
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


  
export const refreshAccessToken = (refreshToken:string|null|undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.refreshToken}`;
 

      apiCall("post", url, {refreshToken})
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

  export const getAllUserDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getUserData}`;
   
  
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

  export const getAllAgentDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getAgentData}`;
   
  
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

  export const addProperty = (data: propertyType): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.addProperty,data)
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
  export const blockProperty = (propertyId: number|string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.blockProperty, {propertyId})
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
  export const blockUser = (userId: string): Promise<ApiResponse> => {
    console.log("blockUser called with userId:", userId); // Debug

    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.blockUser, {userId})
          .then((response) => {
            console.log("blockUser API response:", response); // Debug

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
  export const verifyLocation = (locationId: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.verifyLocation, {locationId})
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
  export const cancelRequest = (requestId: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.cancelRequest, { requestId })
          .then((response) => {
            resolve(response);
            console.log(response); // Debugging
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: "500", message: "Something went wrong." });
      }
    });
  };
  

  export const getAllPropertyDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getProperty}`;
   
  
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

//   export const getAllVenderDeatails = (
//   ): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         const url = `${adminUrls.getVenderData}`;
   
  
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

  

//   export const addEvent = (data: eventType): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         apiCall("post", adminUrls.addEvent,data)
//           .then((response) => {
//             resolve(response);
//             console.log(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Somethings wrong." });
//       }
//     });
//   };

//   export const getAllEventDeatails = (
//   ): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         const url = `${adminUrls.getEvent}`;
   
  
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

  
//   export const blockEvent = (eventId: number|string): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         apiCall("post", adminUrls.blockEvent, {eventId})
//           .then((response) => {
//             resolve(response);
//             console.log(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Somethings wrong." });
//       }
//     });
//   };

//   export const addVenderType = (data: venderType): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         apiCall("post", adminUrls.addVenterType,data)
//           .then((response) => {
//             resolve(response);
//             console.log(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Somethings wrong." });
//       }
//     });
//   };


//   export const blockVenterType = (vendertypetId: number): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         apiCall("post", adminUrls.blockVenterType, {vendertypetId})
//           .then((response) => {
//             resolve(response);
//             console.log(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Somethings wrong." });
//       }
//     });
//   };

  
//   export const getAllVenderType = (
//   ): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         const url = `${adminUrls.getVenterType}`;
   
  
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


  
//   export const verifyVender = (venderId: string): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//       try {
//         apiCall("post", adminUrls.verifyVender, {venderId})
//           .then((response) => {
//             resolve(response);
//             console.log(response);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       } catch (error) {
//         resolve({ status: "500", message: "Somethings wrong." });
//       }
//     });
//   };