import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";

// Membuat interface yang memperluas EdgeProps dan menambahkan properti arrowCount
interface EdgeAnimationArrowProps extends EdgeProps {
  arrowCount?: number;
}

export function EdgeAnimationArrow({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  arrowCount = 1, // Parameter untuk menentukan jumlah arrow dengan default 3
}: EdgeAnimationArrowProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Membuat array dengan panjang sesuai arrowCount
  const arrows = Array.from({ length: arrowCount }, (_, index) => {
    // Menghitung durasi dan offset untuk setiap arrow
    const duration = 2; // Durasi dalam detik
    const offset = (index / arrowCount) * duration;

    return (
      <path
        key={`arrow-${id}-${index}`}
        d="M0,-3 L6,0 L0,3"
        fill="#099268"
        stroke="#099268"
        strokeWidth="1"
      >
        <animateMotion
          dur={`${duration}s`}
          begin={`${offset}s`}
          repeatCount="indefinite"
          path={edgePath}
          rotate="auto"
        />
      </path>
    );
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {arrows}
    </>
  );
}
