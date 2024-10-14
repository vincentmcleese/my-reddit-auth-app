import React from "react";

const LogoOutline: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-start p-4 md:p-8 pointer-events-none">
      <div className="w-full max-w-[50%] aspect-square">
        <svg
          className="w-full h-full"
          viewBox="-5 -5 78.38 83.53"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="outlineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feFlood
                floodColor="white"
                floodOpacity="0.5"
                result="glowColor"
              />
              <feComposite
                in="glowColor"
                in2="coloredBlur"
                operator="in"
                result="softGlow"
              />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id="shineGradient"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0)">
                <animate
                  attributeName="offset"
                  values="-0.2;1.2"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)">
                <animate
                  attributeName="offset"
                  values="-0.1;1.3"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="0%" stopColor="rgba(255,255,255,0)">
                <animate
                  attributeName="offset"
                  values="0;1.4"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <mask id="outlineMask">
              <path
                fill="none"
                stroke="white"
                strokeWidth="4"
                d="M54.47 5.04c-7.67 0-13.9 6.23-13.91 13.9
                -2.95-1.8-6.26-3.05-9.79-3.6L36.7 5H17.05L4.13 27.43
                C1.55 31.66 0 36.51 0 41.78c0 14.77 11.98 26.75 26.74 26.75
                s26.64-11.98 26.64-26.75c0-3.23-.58-6.32-1.63-9.18
                .88.17 1.78.27 2.71.27 7.67 0 13.91-6.24 13.91-13.91S62.14 5.04 54.47 5.04Z
                M26.74 51.08c-5.16 0-9.3-4.13-9.3-9.3s4.13-9.29 9.3-9.29
                s9.19 4.13 9.19 9.29-4.13 9.3-9.19 9.3Z
                M54.47 24.77c-3.21 0-5.81-2.61-5.81-5.81s2.61-5.81 5.81-5.81
                s5.81 2.61 5.81 5.81-2.61 5.81-5.81 5.81Z"
              />
            </mask>
          </defs>

          <path
            id="logo"
            fill="none"
            stroke="url(#outlineGradient)"
            strokeWidth="2.5"
            filter="url(#glow)"
            d="M54.47 5.04c-7.67 0-13.9 6.23-13.91 13.9
            -2.95-1.8-6.26-3.05-9.79-3.6L36.7 5H17.05L4.13 27.43
            C1.55 31.66 0 36.51 0 41.78c0 14.77 11.98 26.75 26.74 26.75
            s26.64-11.98 26.64-26.75c0-3.23-.58-6.32-1.63-9.18
            .88.17 1.78.27 2.71.27 7.67 0 13.91-6.24 13.91-13.91S62.14 5.04 54.47 5.04Z
            M26.74 51.08c-5.16 0-9.3-4.13-9.3-9.3s4.13-9.29 9.3-9.29
            s9.19 4.13 9.19 9.29-4.13 9.3-9.19 9.3Z
            M54.47 24.77c-3.21 0-5.81-2.61-5.81-5.81s2.61-5.81 5.81-5.81
            s5.81 2.61 5.81 5.81-2.61 5.81-5.81 5.81Z"
          />
          <rect
            x="-5"
            y="-5"
            width="78.38"
            height="83.53"
            fill="url(#shineGradient)"
            mask="url(#outlineMask)"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LogoOutline;
