import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function ScrollMesh() {
  const { scene } = useGLTF("/NeonSol.glb");
  const modelRef = useRef();
  const [scrollFactor, setScrollFactor] = useState(0.01);

  useEffect(() => {
    const handleWheel = (event) => {
      setScrollFactor((prev) => Math.max(0.001, prev + event.deltaY * -0.00001));
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = window.scrollY * scrollFactor;
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={scene} ref={modelRef} position={[0, 0, -2]} />
      <OrbitControls />
    </Canvas>
  );
}
