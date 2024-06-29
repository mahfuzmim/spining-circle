import React, { useState, useRef, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";

const Wheel = ({ names }) => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    drawWheel();
  }, [names]);

  const startSpin = () => {
    if (isSpinning || names?.length === 0) return;

    setIsSpinning(true);
    setSelectedName(null);

    const spinDuration = 5000; // Duration of spinning in milliseconds
    const spinAngle = Math.floor(Math.random() * 360) + 360 * 5; // Random spin angle for 5 rotations

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let start = Date.now();
    const spinAnimation = () => {
      const deltaTime = Date.now() - start;
      const spinProgress = deltaTime / spinDuration;

      const spinAngleCurrent = spinAngle * spinProgress;
      const spinAngleDelta = spinAngleCurrent % 360;

      drawWheel(spinAngleDelta);

      if (deltaTime < spinDuration) {
        requestAnimationFrame(spinAnimation);
      } else {
        setIsSpinning(false);
        determineWinner(spinAngleDelta);
      }
    };

    requestAnimationFrame(spinAnimation);
  };

  const drawWheel = (rotationAngle = 0) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const segmentAngle = (2 * Math.PI) / names?.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    names?.forEach((name, index) => {
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(
        radius,
        radius,
        radius,
        index * segmentAngle + rotationAngle,
        (index + 1) * segmentAngle + rotationAngle
      );
      ctx.fillStyle = getRandomColor();
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(index * segmentAngle + rotationAngle + segmentAngle / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px Arial";
      ctx.fillText(name, radius * 0.6, 0);
      ctx.restore();
    });

    // Draw the fixed indicator
    drawIndicator(ctx, radius);
  };

  const drawIndicator = (ctx, radius) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius - 15, 10); // Position the indicator above the wheel
    ctx.lineTo(radius + 15, 10);
    ctx.lineTo(radius, 40);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  };

  const determineWinner = (finalAngle) => {
    const segmentAngle = 360 / names?.length;
    const normalizedAngle = (finalAngle + 90) % 360;
    const selectedSegmentIndex = Math.floor(normalizedAngle / segmentAngle);
    setSelectedName(names[selectedSegmentIndex]);
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="wheel-container">
      <canvas ref={canvasRef} width={400} height={400} />
      <button
        className="spinner-button"
        onClick={startSpin}
        disabled={isSpinning}
      >
        Spin
      </button>
      {selectedName && (
        <div className="wniner-label">
          Winner: <span>{selectedName}</span>
        </div>
      )}
    </div>
  );
};

// const randomColor = () => {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   return { r, g, b };
// };

// const toRad = (deg) => deg * (Math.PI / 180.0);

export default Wheel;
