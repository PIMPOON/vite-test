import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from 'three';

interface ModelViewerProps {
  src?: string;
  modelPath?: string;
  className?: string;
}

const DefaultModel = () => {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color="#00bcd4"
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
};

const GLTFModel = ({
  url,
  controlsRef,
}: {
  url: string;
  controlsRef: React.RefObject<any>;
}) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (controlsRef.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);
      controlsRef.current.minDistance = maxDimension * 0.5;
      controlsRef.current.maxDistance = maxDimension * 5;
    }
  }, [scene, controlsRef]);

  return <primitive object={scene} />;
};

export const ModelViewer = ({
  className,
  src,
  modelPath,
}: ModelViewerProps) => {
  const rawUrl = src ?? modelPath;
  // Prefix runtime asset paths with Vite base on project pages
  const resolvedUrl = rawUrl
    ? (rawUrl.startsWith("/") ? `${import.meta.env.BASE_URL}${rawUrl.slice(1)}` : rawUrl)
    : undefined;

  const controlsRef = useRef<any>(null);

  return (
    <div className={className}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.01} far={1000} />
        <Suspense fallback={<DefaultModel />}>
          <Stage environment="city" intensity={0.6} adjustCamera>
            {resolvedUrl ? (
              <GLTFModel url={resolvedUrl} controlsRef={controlsRef} />
            ) : (
              <DefaultModel />
            )}
          </Stage>
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableDamping
          dampingFactor={0.08}
          minDistance={3}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};
