import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} scale={2}>
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.6, 32, 32]} position={[-2, 1, -1]}>
          <MeshDistortMaterial color="#4ade80" distort={0.3} speed={1.5} />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <Sphere args={[0.5, 32, 32]} position={[2, -1, 0]}>
          <MeshDistortMaterial color="#f472b6" distort={0.5} speed={2} />
        </Sphere>
      </Float>
    </Canvas>
  );
}

