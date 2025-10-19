import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type HumanModel3DProps = {
  bmiCategory?: 'underweight' | 'normal' | 'overweight' | 'obese';
  height?: number;
  weight?: number;
};

export default function HumanModel3D({ bmiCategory = 'normal', height = 170, weight = 70 }: HumanModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const isRotatingRef = useRef(true);
  const [showDragHint, setShowDragHint] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4facfe, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const model = createHumanModel(bmiCategory, height, weight);
    scene.add(model);
    modelRef.current = model;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (modelRef.current && isRotatingRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (modelRef.current && sceneRef.current) {
      sceneRef.current.remove(modelRef.current);
      
      modelRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      const newModel = createHumanModel(bmiCategory, height, weight);
      sceneRef.current.add(newModel);
      modelRef.current = newModel;
    }
  }, [bmiCategory, height, weight]);

  const handleMouseDown = () => {
    isRotatingRef.current = false;
    setShowDragHint(false);
  };

  const handleMouseUp = () => {
    isRotatingRef.current = true;
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        data-testid="canvas-3d-model"
      />
      {showDragHint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
          Drag to rotate
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <div className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md capitalize">
          {bmiCategory}
        </div>
      </div>
    </div>
  );
}

function createHumanModel(category: string, height: number, weight: number): THREE.Group {
  const group = new THREE.Group();
  
  const categoryMap = {
    underweight: { bodyScale: 0.7, color: 0x87ceeb },
    normal: { bodyScale: 1.0, color: 0x90ee90 },
    overweight: { bodyScale: 1.3, color: 0xffa500 },
    obese: { bodyScale: 1.6, color: 0xff6b6b }
  };
  
  const config = categoryMap[category as keyof typeof categoryMap] || categoryMap.normal;
  
  const skinMaterial = new THREE.MeshPhongMaterial({
    color: config.color,
    shininess: 30,
    transparent: true,
    opacity: 0.9
  });

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    skinMaterial
  );
  head.position.y = 2.2;
  group.add(head);

  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.4 * config.bodyScale,
      0.5 * config.bodyScale,
      1.2,
      32
    ),
    skinMaterial
  );
  torso.position.y = 1.2;
  group.add(torso);

  const abdomen = new THREE.Mesh(
    new THREE.SphereGeometry(0.45 * config.bodyScale, 32, 32),
    skinMaterial
  );
  abdomen.scale.y = 0.6;
  abdomen.position.y = 0.6;
  group.add(abdomen);

  const createLimb = (width: number, length: number, posX: number, posY: number) => {
    const limb = new THREE.Mesh(
      new THREE.CylinderGeometry(width, width * 0.9, length, 16),
      skinMaterial
    );
    limb.position.set(posX, posY, 0);
    return limb;
  };

  const leftArm = createLimb(0.12 * config.bodyScale, 1.0, -0.55 * config.bodyScale, 1.2);
  const rightArm = createLimb(0.12 * config.bodyScale, 1.0, 0.55 * config.bodyScale, 1.2);
  group.add(leftArm, rightArm);

  const leftLeg = createLimb(0.15 * config.bodyScale, 1.2, -0.25 * config.bodyScale, -0.2);
  const rightLeg = createLimb(0.15 * config.bodyScale, 1.2, 0.25 * config.bodyScale, -0.2);
  group.add(leftLeg, rightLeg);

  const glowGeometry = new THREE.SphereGeometry(0.42, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: config.color,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.copy(head.position);
  glow.scale.multiplyScalar(1.3);
  group.add(glow);

  group.scale.set(0.8, 0.8, 0.8);
  group.position.y = -1;

  return group;
}
