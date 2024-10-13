import React from "react";

const LogoOutline: React.FC = () => {
  return (
    <svg
      className="fixed inset-0 w-full h-full z-0 opacity-10"
      viewBox="0 0 68.38 63.53"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <mask id="shine-mask">
          <path
            fill="none"
            stroke="white"
            stroke-width="4"
            d="M54.47.04c-7.67,0-13.9,6.23-13.91,13.9
          -2.95-1.8-6.26-3.05-9.79-3.6L36.7,0H17.05L4.13,22.43
          C1.55,26.66,0,31.51,0,36.78c0,14.77,11.98,26.75,26.74,26.75
          s26.64-11.98,26.64-26.75c0-3.23-.58-6.32-1.63-9.18
          .88.17,1.78.27,2.71.27,7.67,0,13.91-6.24,13.91-13.91S62.14.04,54.47.04Z
          M26.74,46.08c-5.16,0-9.3-4.13-9.3-9.3s4.13-9.29,9.3-9.29
          s9.19,4.13,9.19,9.29-4.13,9.3-9.19,9.3Z
          M54.47,19.77c-3.21,0-5.81-2.61-5.81-5.81s2.61-5.81,5.81-5.81
          s5.81,2.61,5.81,5.81-2.61,5.81-5.81,5.81Z"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 200 0 200; 0 0 200 0; 200 0 0 200"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;200;400"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </mask>
      </defs>

      <path
        id="logo"
        fill="none"
        stroke="#FF6600"
        strokeWidth="2"
        filter="url(#glow)"
        d="M54.47.04c-7.67,0-13.9,6.23-13.91,13.9
-2.95-1.8-6.26-3.05-9.79-3.6L36.7,0H17.05L4.13,22.43
C1.55,26.66,0,31.51,0,36.78c0,14.77,11.98,26.75,26.74,26.75
s26.64-11.98,26.64-26.75c0-3.23-.58-6.32-1.63-9.18
.88.17,1.78.27,2.71.27,7.67,0,13.91-6.24,13.91-13.91S62.14.04,54.47.04Z
M26.74,46.08c-5.16,0-9.3-4.13-9.3-9.3s4.13-9.29,9.3-9.29
s9.19,4.13,9.19,9.29-4.13,9.3-9.19,9.3Z
M54.47,19.77c-3.21,0-5.81-2.61-5.81-5.81s2.61-5.81,5.81-5.81
s5.81,2.61,5.81,5.81-2.61,5.81-5.81,5.81Z"
      />
      <animate
        attributeName="stroke-width"
        values="2;4;2"
        dur="3s"
        repeatCount="indefinite"
      />
    </svg>
  );
};

export default LogoOutline;
