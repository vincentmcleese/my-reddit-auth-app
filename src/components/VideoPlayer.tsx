// components/VideoPlayer.tsx
import React from "react";

const VideoPlayer: React.FC = () => {
  return (
    <div>
      <video
        width="100%" // Adjust the width or height as needed
        height="auto"
        autoPlay // Automatically play the video when the page loads
        muted // Mute the video initially
        loop // Loop the video once it ends
        playsInline // Ensures it plays inline on mobile devices
      >
        <source src="/videos/welcome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
