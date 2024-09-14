import React from "react";

interface Boost {
  emoji: string;
  description: string;
  points: number;
}

interface BoostListProps {
  boosts: Boost[];
}

const BoostList: React.FC<BoostListProps> = ({ boosts }) => {
  // Sum the total points to calculate the multiplier
  const totalPoints = boosts.reduce((total, boost) => total + boost.points, 0);
  const multiplier = (1 + totalPoints / 100).toFixed(2); // Assume multiplier logic

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#ff4500",
          }}
        >
          🔥 Your Boosts 🔥
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "0",
          }}
        >
          {boosts.map((boost, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ fontSize: "24px" }}>{boost.emoji}</span>
              <span
                style={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginRight: "10px",
                }}
              >
                {boost.description}
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#ff4500",
                }}
              >
                +{boost.points} points
              </span>
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ff4500",
          }}
        >
          <span>Total Boost Multiplier: </span>
          <span style={{ fontSize: "24px" }}>{multiplier}x</span>
        </div>
      </div>
    </div>
  );
};

export default BoostList;
