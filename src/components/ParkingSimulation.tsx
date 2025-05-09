"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";

function ParkingScene({ step, setStep }: { step: number; setStep: React.Dispatch<React.SetStateAction<number>> }) {
  const carRef = useRef<THREE.Group>(null);
  const gateRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { scene: carModel } = useGLTF("/models/car.glb");
  const { scene: gateModel } = useGLTF("/models/gate.glb");

  useFrame(() => {
    if (carRef.current) {
      if (step === 1) {
        carRef.current.position.z += 0.05;
        if (carRef.current.position.z >= -1) setStep(2);
      } else if (step === 3) {
        carRef.current.position.z += 0.05; 
        if (carRef.current.position.z >= 3) setStep(4);
      }
    }

    if (gateRef.current && step === 2) {
      gateRef.current.rotation.x -= 0.02;
      if (gateRef.current.rotation.x <= -Math.PI / 4) setStep(3);
    }

    if (cameraRef.current) {
      if (step === 0) {
        cameraRef.current.position.set(0, 10, 15);
        cameraRef.current.lookAt(0, 0, 0);
      } else if (step === 1) {
        if (carRef.current) {
          cameraRef.current.position.lerp(
            new THREE.Vector3(carRef.current.position.x + 2, 2, carRef.current.position.z + 5),
            0.1
          );
          cameraRef.current.lookAt(carRef.current.position.x, carRef.current.position.y + 0.5, carRef.current.position.z);
        }
      } else if (step === 2) {
        cameraRef.current.position.lerp(new THREE.Vector3(0, 1, 2), 0.1);
        cameraRef.current.lookAt(0, 1, 0);
      } else if (step === 3) {
        if (carRef.current) {
          cameraRef.current.position.lerp(
            new THREE.Vector3(carRef.current.position.x + 5, 5, carRef.current.position.z + 5),
            0.1
          );
          cameraRef.current.lookAt(carRef.current.position);
        }
      }
    }
  });

  return (
    <group>
      <gridHelper args={[20, 20]} position={[0, 0, 0]} />
      <primitive object={carModel} ref={carRef} position={[-5, 0.5, 0]} scale={[1, 1, 1]} />
      <primitive object={gateModel} ref={gateRef} position={[0, 0, 0]} scale={[2, 2, 2]} />
      <PerspectiveCamera ref={cameraRef} position={[10, 5, 10]} makeDefault />
    </group>
  );
}

export default function ParkingSimulation() {
  const [step, setStep] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowPayment(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ParkingScene step={step} setStep={setStep} />
          <OrbitControls enabled={step === 0} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80">
        {step === 0 && (
          <button 
            onClick={() => setStep(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded mx-auto block"
          >
            Masuk
          </button>
        )}

        {step === 2 && (
          <button 
            onClick={() => setStep(3)}
            className="px-4 py-2 bg-green-500 text-white rounded mx-auto block"
          >
            Keluarkan Tiket
          </button>
        )}

        {showPayment && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button className="p-4 bg-yellow-500 text-white rounded">
              QRIS Tap
            </button>
            <button className="p-4 bg-purple-500 text-white rounded">
              Prepaid Card
            </button>
            <button className="p-4 bg-red-500 text-white rounded">
              E-wallet MPM
            </button>
            <button className="p-4 bg-indigo-500 text-white rounded">
              E-wallet CPM
            </button>
          </div>
        )}
      </div>
    </div>
  );
}