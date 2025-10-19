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
    underweight: { bodyScale: 0.75, muscleScale: 0.7, torsoWidth: 0.85, waistScale: 0.7, accentColor: 0x4facfe },
    normal: { bodyScale: 1.0, muscleScale: 1.0, torsoWidth: 1.0, waistScale: 0.85, accentColor: 0x00f2c3 },
    overweight: { bodyScale: 1.25, muscleScale: 1.15, torsoWidth: 1.3, waistScale: 1.25, accentColor: 0xffd93d },
    obese: { bodyScale: 1.5, muscleScale: 1.35, torsoWidth: 1.6, waistScale: 1.6, accentColor: 0xff6b9d }
  };
  
  const config = categoryMap[category as keyof typeof categoryMap] || categoryMap.normal;
  
  // Realistic skin tones based on category
  const skinTone = 0xf4c2a5;
  
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: skinTone,
    metalness: 0.1,
    roughness: 0.8,
    emissive: config.accentColor,
    emissiveIntensity: 0.15
  });

  const highlightMaterial = new THREE.MeshStandardMaterial({
    color: skinTone,
    metalness: 0.2,
    roughness: 0.7,
    emissive: config.accentColor,
    emissiveIntensity: 0.25
  });

  // Head with more realistic shape
  const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  headGeometry.scale(1, 1.15, 0.95); // Make head slightly oval
  const head = new THREE.Mesh(headGeometry, skinMaterial);
  head.position.y = 2.3;
  group.add(head);

  // Facial features
  const faceGroup = new THREE.Group();
  faceGroup.position.copy(head.position);
  
  // Eyes
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2c3e50,
    metalness: 0.9,
    roughness: 0.1
  });
  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.12, 0.08, 0.3);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.12, 0.08, 0.3);
  faceGroup.add(leftEye, rightEye);
  
  // Nose
  const noseGeometry = new THREE.ConeGeometry(0.04, 0.12, 8);
  const nose = new THREE.Mesh(noseGeometry, skinMaterial);
  nose.position.set(0, -0.02, 0.32);
  nose.rotation.x = Math.PI / 2;
  faceGroup.add(nose);
  
  group.add(faceGroup);

  // Neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.18, 0.25, 16),
    skinMaterial
  );
  neck.position.y = 2.0;
  group.add(neck);

  // Upper chest (clavicle area)
  const upperChest = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * config.torsoWidth, 0.2, 0.25),
    highlightMaterial
  );
  upperChest.position.y = 1.75;
  group.add(upperChest);

  // Chest/Torso - more anatomical shape
  const chestGeometry = new THREE.CylinderGeometry(
    0.35 * config.torsoWidth,
    0.4 * config.waistScale,
    0.8,
    32
  );
  const chest = new THREE.Mesh(chestGeometry, skinMaterial);
  chest.position.y = 1.3;
  chest.scale.z = 0.6;
  group.add(chest);

  // Pectoral/breast area detail
  const pectoralLeft = new THREE.Mesh(
    new THREE.SphereGeometry(0.15 * config.muscleScale, 16, 16),
    highlightMaterial
  );
  pectoralLeft.position.set(-0.15 * config.torsoWidth, 1.5, 0.12);
  pectoralLeft.scale.z = 0.6;
  const pectoralRight = new THREE.Mesh(
    new THREE.SphereGeometry(0.15 * config.muscleScale, 16, 16),
    highlightMaterial
  );
  pectoralRight.position.set(0.15 * config.torsoWidth, 1.5, 0.12);
  pectoralRight.scale.z = 0.6;
  group.add(pectoralLeft, pectoralRight);

  // Abdomen with realistic curvature
  const abdomenGeometry = new THREE.SphereGeometry(0.38 * config.waistScale, 32, 32);
  const abdomen = new THREE.Mesh(abdomenGeometry, skinMaterial);
  abdomen.scale.set(1, 0.7, 0.8);
  abdomen.position.y = 0.75;
  group.add(abdomen);

  // Waist definition
  const waist = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.32 * config.waistScale,
      0.38 * config.waistScale,
      0.35,
      32
    ),
    skinMaterial
  );
  waist.position.y = 0.5;
  waist.scale.z = 0.7;
  group.add(waist);

  // Hips
  const hips = new THREE.Mesh(
    new THREE.SphereGeometry(0.4 * config.bodyScale, 32, 16),
    skinMaterial
  );
  hips.scale.set(1, 0.5, 0.8);
  hips.position.y = 0.2;
  group.add(hips);

  // Shoulders with more definition
  const createShoulder = (posX: number) => {
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.18 * config.muscleScale, 16, 16),
      highlightMaterial
    );
    shoulder.position.set(posX, 1.65, 0);
    return shoulder;
  };
  
  const leftShoulder = createShoulder(-0.45 * config.torsoWidth);
  const rightShoulder = createShoulder(0.45 * config.torsoWidth);
  group.add(leftShoulder, rightShoulder);

  // Arms with proper joints
  const createArm = (posX: number) => {
    const armGroup = new THREE.Group();
    
    // Upper arm
    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * config.muscleScale, 0.09 * config.muscleScale, 0.55, 16),
      skinMaterial
    );
    upperArm.position.set(posX, 1.35, 0);
    
    // Elbow joint
    const elbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.10 * config.muscleScale, 12, 12),
      highlightMaterial
    );
    elbow.position.set(posX, 1.05, 0);
    
    // Forearm
    const forearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09 * config.muscleScale, 0.07 * config.muscleScale, 0.5, 16),
      skinMaterial
    );
    forearm.position.set(posX, 0.75, 0);
    
    // Hand
    const hand = new THREE.Mesh(
      new THREE.BoxGeometry(0.12 * config.muscleScale, 0.18, 0.08),
      skinMaterial
    );
    hand.position.set(posX, 0.42, 0);
    
    armGroup.add(upperArm, elbow, forearm, hand);
    return armGroup;
  };

  const leftArmGroup = createArm(-0.52 * config.torsoWidth);
  const rightArmGroup = createArm(0.52 * config.torsoWidth);
  group.add(leftArmGroup, rightArmGroup);

  // Legs with proper anatomy
  const createLeg = (posX: number) => {
    const legGroup = new THREE.Group();
    
    // Thigh with muscle definition
    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14 * config.bodyScale, 0.12 * config.bodyScale, 0.7, 16),
      skinMaterial
    );
    thigh.position.set(posX, -0.25, 0);
    
    // Knee
    const knee = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 * config.bodyScale, 12, 12),
      highlightMaterial
    );
    knee.position.set(posX, -0.62, 0);
    
    // Calf with proper taper
    const calf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * config.bodyScale, 0.08 * config.bodyScale, 0.65, 16),
      skinMaterial
    );
    calf.position.set(posX, -1.0, 0);
    
    // Ankle
    const ankle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07 * config.bodyScale, 0.07 * config.bodyScale, 0.1, 12),
      skinMaterial
    );
    ankle.position.set(posX, -1.35, 0);
    
    // Foot
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.12 * config.bodyScale, 0.08, 0.25),
      skinMaterial
    );
    foot.position.set(posX, -1.45, 0.08);
    
    legGroup.add(thigh, knee, calf, ankle, foot);
    return legGroup;
  };

  const leftLeg = createLeg(-0.2 * config.bodyScale);
  const rightLeg = createLeg(0.2 * config.bodyScale);
  group.add(leftLeg, rightLeg);

  // Subtle glow effect based on health status
  const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: config.accentColor,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const bodyGlow = new THREE.Mesh(glowGeometry, glowMaterial);
  bodyGlow.position.y = 1.0;
  bodyGlow.scale.set(1.5 * config.bodyScale, 2.5, 1);
  group.add(bodyGlow);

  // Subtle particle effect at key points
  const addGlowPoint = (x: number, y: number, z: number) => {
    const pointGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({
        color: config.accentColor,
        transparent: true,
        opacity: 0.6
      })
    );
    pointGlow.position.set(x, y, z);
    group.add(pointGlow);
  };

  // Add glow points at joints
  addGlowPoint(0, 2.3, 0); // Head
  addGlowPoint(0, 1.3, 0); // Chest
  addGlowPoint(0, 0.5, 0); // Abdomen

  group.scale.set(0.75, 0.75, 0.75);
  group.position.y = -0.5;

  return group;
}
