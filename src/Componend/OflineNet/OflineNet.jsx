import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OfflineNet() {
  useEffect(() => {
    const toastId = toast.warning("Enternet Not Conction", {
      position: "bottom-center",
      autoClose: false,   
      closeOnClick: false,
      draggable: false,
    });

    
    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  return null; // مفيش UI
}