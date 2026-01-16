// src/components/StarfieldBackground.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef, useMemo } from "react";

function Stars({ count = 200 }) {
  const groupRef = useRef();

  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20,
      ],
      scale: Math.random() * 0.05 + 0.01,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    groupRef.current.rotation.x = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <Sphere key={i} args={[1, 8, 8]} scale={star.scale} position={star.position}>
          <meshBasicMaterial color="white" />
        </Sphere>
      ))}
    </group>
  );
}

export default function StarfieldBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <ambientLight intensity={0.2} />
      <Stars count={300} />
    </Canvas>
  );
}
