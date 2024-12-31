import Drawer from "@mui/material/Drawer";
import { MdCancel, MdOutlineEventAvailable } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { toast } from "react-toastify";
import { getNotification } from "../../../service/api/agent/apiMethod";
import { notification } from "../../../utils/types";
import { useSocket } from "../../../utils/context/SocketContext";

type ModalProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
};

const Notification: React.FC<ModalProps> = ({ open, toggleDrawer }) => {
  const [notification, setNotification] = useState<notification[]>([]);

  const agent = useSelector((state: RootState) => state.agent);

  const { socket } = useSocket();
console.log(socket,'fdjfhjkdhk');

  useEffect(() => {
    console.log("Component mounted");

    socket?.on("responseNotification", (id) => {
      console.log("Received responseNotification:", id);
      
      getDetails();
    });

    return () => {
      socket?.off("responseNotification");
    };
  }, [socket, notification, setNotification]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (!agent.agentId) return;

      const response = await getNotification(agent.agentId);
      if (response && Array.isArray(response.data)) {
        console.log(response.data, "kkkk");

        setNotification(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <div
          className="w-[24rem]"
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <div>
            <div className="flex  justify-between mt-5 mx-5 gap-3">
              <p className="text-xl">Notification</p>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                <FaMinusCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto mt-5">
              {notification.map((value) => (
                <div
                  className={`flex items-start gap-3 mb-8 ${
                    value.isSeen ? "bg-[#DFF5EB]" : "bg-[#33d687]"
                  } mx-5 py-5`}
                >
                  <div className="flex my-auto items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {value.property == "cancelled" ? (
                      <MdCancel className="h-8 w-8" />
                    ) : (
                      <MdOutlineEventAvailable className="h-8 w-8" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 ">
                    <p className="text-sm font-medium">
                      New Property {value.property}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You have a new message from Jane Doe.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          0
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;