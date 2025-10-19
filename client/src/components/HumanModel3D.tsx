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
    underweight: { bodyScale: 0.75, muscleScale: 0.7, torsoWidth: 0.85, waistScale: 0.7, hipScale: 0.75, accentColor: 0x4facfe },
    normal: { bodyScale: 1.0, muscleScale: 1.0, torsoWidth: 1.0, waistScale: 0.85, hipScale: 1.0, accentColor: 0x00f2c3 },
    overweight: { bodyScale: 1.25, muscleScale: 1.15, torsoWidth: 1.3, waistScale: 1.25, hipScale: 1.3, accentColor: 0xffd93d },
    obese: { bodyScale: 1.5, muscleScale: 1.35, torsoWidth: 1.6, waistScale: 1.6, hipScale: 1.6, accentColor: 0xff6b9d }
  };
  
  const config = categoryMap[category as keyof typeof categoryMap] || categoryMap.normal;
  
  // More realistic skin tone with subtle variation
  const skinTone = 0xf5d5c5;
  
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: skinTone,
    metalness: 0.05,
    roughness: 0.9,
    emissive: config.accentColor,
    emissiveIntensity: 0.1
  });

  const highlightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(skinTone).multiplyScalar(0.95),
    metalness: 0.1,
    roughness: 0.85,
    emissive: config.accentColor,
    emissiveIntensity: 0.15
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2817,
    metalness: 0.3,
    roughness: 0.6
  });

  // More realistic head with proper proportions
  const headGeometry = new THREE.SphereGeometry(0.38, 32, 32);
  headGeometry.scale(1, 1.2, 1); // More natural head shape
  const head = new THREE.Mesh(headGeometry, skinMaterial);
  head.position.y = 2.35;
  group.add(head);

  // Hair - realistic hairstyle
  const hairGeometry = new THREE.SphereGeometry(0.39, 32, 32);
  hairGeometry.scale(1, 0.9, 1);
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.copy(head.position);
  hair.position.y += 0.1;
  group.add(hair);

  // Ears
  const createEar = (posX: number) => {
    const earGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    earGeometry.scale(0.5, 1, 0.3);
    const ear = new THREE.Mesh(earGeometry, skinMaterial);
    ear.position.set(posX, 2.35, 0);
    return ear;
  };
  group.add(createEar(-0.35), createEar(0.35));

  // Facial features
  const faceGroup = new THREE.Group();
  faceGroup.position.copy(head.position);
  
  // Eye sockets and eyes with more detail
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.5
  });
  const irisMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x4a6fa5,
    metalness: 0.8,
    roughness: 0.2
  });
  const pupilMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    metalness: 1.0,
    roughness: 0.1
  });

  const createEye = (posX: number) => {
    const eyeGroup = new THREE.Group();
    
    // Eye white
    const eyeWhite = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      eyeWhiteMaterial
    );
    eyeWhite.scale.z = 0.5;
    
    // Iris
    const iris = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 16, 16),
      irisMaterial
    );
    iris.position.z = 0.04;
    
    // Pupil
    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 12, 12),
      pupilMaterial
    );
    pupil.position.z = 0.05;
    
    eyeGroup.add(eyeWhite, iris, pupil);
    eyeGroup.position.set(posX, 0.1, 0.32);
    return eyeGroup;
  };
  
  faceGroup.add(createEye(-0.13), createEye(0.13));
  
  // Nose with realistic structure
  const noseBridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.15, 0.05),
    skinMaterial
  );
  noseBridge.position.set(0, 0.02, 0.34);
  faceGroup.add(noseBridge);
  
  const noseTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 16, 16),
    skinMaterial
  );
  noseTip.position.set(0, -0.06, 0.36);
  noseTip.scale.set(0.8, 0.7, 1);
  faceGroup.add(noseTip);
  
  // Nostrils
  const createNostril = (posX: number) => {
    const nostril = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0x2c1810, metalness: 0, roughness: 1 })
    );
    nostril.position.set(posX, -0.08, 0.35);
    nostril.scale.set(0.7, 0.5, 0.5);
    return nostril;
  };
  faceGroup.add(createNostril(-0.03), createNostril(0.03));
  
  // Mouth
  const mouthGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.02);
  const mouth = new THREE.Mesh(
    mouthGeometry,
    new THREE.MeshStandardMaterial({ color: 0xc97d7d, metalness: 0.2, roughness: 0.8 })
  );
  mouth.position.set(0, -0.18, 0.33);
  faceGroup.add(mouth);
  
  // Lips
  const upperLip = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.025, 0.03),
    new THREE.MeshStandardMaterial({ color: 0xd99999, metalness: 0.1, roughness: 0.7 })
  );
  upperLip.position.set(0, -0.17, 0.33);
  faceGroup.add(upperLip);
  
  const lowerLip = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.03, 0.03),
    new THREE.MeshStandardMaterial({ color: 0xd99999, metalness: 0.1, roughness: 0.7 })
  );
  lowerLip.position.set(0, -0.195, 0.33);
  faceGroup.add(lowerLip);
  
  // Eyebrows
  const createEyebrow = (posX: number) => {
    const eyebrow = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.02, 0.01),
      hairMaterial
    );
    eyebrow.position.set(posX, 0.2, 0.33);
    eyebrow.rotation.z = posX > 0 ? -0.1 : 0.1;
    return eyebrow;
  };
  faceGroup.add(createEyebrow(-0.13), createEyebrow(0.13));
  
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

  // Hips with more realistic shape
  const hips = new THREE.Mesh(
    new THREE.SphereGeometry(0.42 * config.hipScale, 32, 16),
    skinMaterial
  );
  hips.scale.set(1.1, 0.55, 0.9);
  hips.position.y = 0.15;
  group.add(hips);
  
  // Gluteus (buttocks) for realistic back view
  const glutes = new THREE.Mesh(
    new THREE.SphereGeometry(0.22 * config.hipScale, 24, 16),
    skinMaterial
  );
  glutes.scale.set(0.8, 0.9, 1.2);
  glutes.position.set(0, 0.1, -0.15);
  group.add(glutes);

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
    
    // Hand with palm
    const palm = new THREE.Mesh(
      new THREE.BoxGeometry(0.11 * config.muscleScale, 0.14, 0.06),
      skinMaterial
    );
    palm.position.set(posX, 0.43, 0);
    
    // Fingers
    const fingerMaterial = skinMaterial;
    const createFinger = (offsetX: number, offsetY: number, length: number) => {
      const finger = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012 * config.muscleScale, 0.01 * config.muscleScale, length, 8),
        fingerMaterial
      );
      finger.position.set(posX + offsetX, 0.35 + offsetY, 0);
      return finger;
    };
    
    const fingers = [
      createFinger(-0.04, 0, 0.08),  // Index
      createFinger(-0.02, 0.01, 0.09), // Middle
      createFinger(0.01, 0, 0.08),   // Ring
      createFinger(0.03, -0.01, 0.07), // Pinky
      createFinger(-0.06, 0.04, 0.06)  // Thumb (positioned differently)
    ];
    
    armGroup.add(upperArm, elbow, forearm, palm, ...fingers);
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
    
    // More realistic foot
    const footBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.13 * config.bodyScale, 0.07, 0.22),
      skinMaterial
    );
    footBase.position.set(posX, -1.46, 0.09);
    
    // Toes
    const toesGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const toe = new THREE.Mesh(
        new THREE.SphereGeometry(0.015 * config.bodyScale, 8, 8),
        skinMaterial
      );
      toe.scale.set(1, 0.6, 1.2);
      toe.position.set(
        posX - 0.04 * config.bodyScale + (i * 0.02 * config.bodyScale),
        -1.46,
        0.2
      );
      toesGroup.add(toe);
    }
    
    legGroup.add(thigh, knee, calf, ankle, footBase, toesGroup);
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
