import { useEffect } from "react";
import Swal from "sweetalert2";

const useCameraPermission = () => {
  useEffect(() => {
    async function getVideoStream() {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });

        if (permissionStatus.state === "denied") {
          console.error("Camera permission has been denied");
          Swal.fire({
            icon: "error",
            text: "Camera permission has been denied",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
      } catch (error) {
        console.error("Error checking camera permissions:", error);
        return;
      }

      let stream: MediaStream | null = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error("Error getting video stream:", error);
        return;
      }

      if (!stream || stream.getVideoTracks().length === 0) {
        console.error("Could not get a valid video track.");
        return;
      }
    }
    getVideoStream();
  }, []);
};

export default useCameraPermission;
