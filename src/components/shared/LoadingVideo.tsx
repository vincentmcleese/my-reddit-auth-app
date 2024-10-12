import React, { useEffect, useRef } from "react";

const LoadingVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-gradient-to-r from-[#FF4500] to-[#FF5722] rounded-2xl p-8">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-24 h-24"
          preload="auto"
        >
          <source src="/videos/6Dloading.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LoadingVideo;
