import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type HumanModel3DProps = {
  bmiCategory?: 'underweight' | 'normal' | 'overweight' | 'obese';
  height?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
};

export default function HumanModel3D({ 
  bmiCategory = 'normal', 
  height = 170, 
  weight = 70,
  gender = 'male',
  activityLevel = 'moderate'
}: HumanModel3DProps) {
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

    const model = createHumanModel(bmiCategory, height, weight, gender, activityLevel);
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
      
      const newModel = createHumanModel(bmiCategory, height, weight, gender, activityLevel);
      sceneRef.current.add(newModel);
      modelRef.current = newModel;
    }
  }, [bmiCategory, height, weight, gender, activityLevel]);

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

function createHumanModel(
  category: string, 
  height: number, 
  weight: number, 
  gender: string, 
  activityLevel: string
): THREE.Group {
  const group = new THREE.Group();
  
  // Gender-based body proportions
  const genderConfigs = {
    male: {
      shoulderWidth: 1.3,
      hipWidth: 0.88,
      waistWidth: 0.95,
      torsoTaper: 1.0,
      chestDepth: 1.05,
      breastSize: 0,
      pelvisWidth: 0.85,
      shoulderHeight: 0
    },
    female: {
      shoulderWidth: 0.9,
      hipWidth: 1.3,
      waistWidth: 0.7,
      torsoTaper: 0.75,
      chestDepth: 0.85,
      breastSize: 0.18,
      pelvisWidth: 1.2,
      shoulderHeight: -0.05
    },
    other: {
      shoulderWidth: 1.1,
      hipWidth: 1.05,
      waistWidth: 0.82,
      torsoTaper: 0.88,
      chestDepth: 0.95,
      breastSize: 0.08,
      pelvisWidth: 1.0,
      shoulderHeight: 0
    }
  };
  
  // Activity level affects muscle definition and body fat
  const activityConfigs = {
    sedentary: {
      muscleDefinition: 0.75,
      bodyFat: 1.25,
      muscleScale: 0.88,
      definitionIntensity: 0.08
    },
    light: {
      muscleDefinition: 0.88,
      bodyFat: 1.12,
      muscleScale: 0.95,
      definitionIntensity: 0.11
    },
    moderate: {
      muscleDefinition: 1.0,
      bodyFat: 1.0,
      muscleScale: 1.0,
      definitionIntensity: 0.15
    },
    active: {
      muscleDefinition: 1.15,
      bodyFat: 0.9,
      muscleScale: 1.12,
      definitionIntensity: 0.2
    },
    'very-active': {
      muscleDefinition: 1.3,
      bodyFat: 0.82,
      muscleScale: 1.22,
      definitionIntensity: 0.25
    }
  };
  
  // BMI category configurations
  const categoryMap = {
    underweight: { bodyScale: 0.75, muscleScale: 0.7, torsoWidth: 0.85, waistScale: 0.7, hipScale: 0.75, accentColor: 0x4facfe },
    normal: { bodyScale: 1.0, muscleScale: 1.0, torsoWidth: 1.0, waistScale: 0.85, hipScale: 1.0, accentColor: 0x00f2c3 },
    overweight: { bodyScale: 1.25, muscleScale: 1.15, torsoWidth: 1.3, waistScale: 1.25, hipScale: 1.3, accentColor: 0xffd93d },
    obese: { bodyScale: 1.5, muscleScale: 1.35, torsoWidth: 1.6, waistScale: 1.6, hipScale: 1.6, accentColor: 0xff6b9d }
  };
  
  const genderConfig = genderConfigs[gender as keyof typeof genderConfigs] || genderConfigs.male;
  const activityConfig = activityConfigs[activityLevel as keyof typeof activityConfigs] || activityConfigs.moderate;
  const bmiConfig = categoryMap[category as keyof typeof categoryMap] || categoryMap.normal;
  
  // Combine all configurations for final body composition
  const config = {
    ...bmiConfig,
    muscleScale: bmiConfig.muscleScale * activityConfig.muscleScale,
    waistScale: bmiConfig.waistScale * activityConfig.bodyFat,
    hipScale: bmiConfig.hipScale * genderConfig.hipWidth,
    torsoWidth: bmiConfig.torsoWidth * genderConfig.shoulderWidth,
    definitionIntensity: activityConfig.definitionIntensity,
    breastSize: genderConfig.breastSize,
    pelvisWidth: genderConfig.pelvisWidth,
    shoulderHeight: genderConfig.shoulderHeight,
    chestDepth: genderConfig.chestDepth
  };
  
  // Photorealistic skin material with subsurface scattering simulation
  const skinTone = 0xffd4ba;
  const skinShadow = 0xdba588;
  
  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: skinTone,
    metalness: 0.0,
    roughness: 0.65,
    clearcoat: 0.1,
    clearcoatRoughness: 0.5,
    reflectivity: 0.2,
    sheen: 0.3,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color(0xffe0d0),
    emissive: config.accentColor,
    emissiveIntensity: 0.02
  });

  const muscleMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(skinTone).multiplyScalar(0.92),
    metalness: 0.0,
    roughness: 0.6,
    clearcoat: 0.15,
    clearcoatRoughness: 0.4,
    reflectivity: 0.25,
    sheen: 0.4,
    sheenRoughness: 0.7,
    sheenColor: new THREE.Color(0xffd0c0),
    emissive: config.accentColor,
    emissiveIntensity: config.definitionIntensity * 0.5
  });

  const hairMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x3d2817,
    metalness: 0.1,
    roughness: 0.4,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3
  });

  // Photorealistic head with proper anatomical proportions (64 segments for smoothness)
  const headGeometry = new THREE.SphereGeometry(0.36, 64, 64);
  headGeometry.scale(1, 1.15, 0.98);
  const head = new THREE.Mesh(headGeometry, skinMaterial);
  head.position.y = 2.32;
  head.castShadow = true;
  head.receiveShadow = true;
  group.add(head);

  // Realistic hair with natural flow
  const hairGeometry = new THREE.SphereGeometry(0.37, 48, 48);
  hairGeometry.scale(1.05, 0.92, 1.02);
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.copy(head.position);
  hair.position.y += 0.08;
  hair.castShadow = true;
  group.add(hair);

  // Anatomically correct ears
  const createEar = (posX: number) => {
    const earGroup = new THREE.Group();
    
    const earOuter = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 24, 24),
      skinMaterial
    );
    earOuter.scale.set(0.55, 1.05, 0.35);
    
    const earInner = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      skinMaterial
    );
    earInner.scale.set(0.6, 0.8, 0.4);
    earInner.position.z = 0.015;
    
    earGroup.add(earOuter, earInner);
    earGroup.position.set(posX, 2.32, 0.05);
    earGroup.castShadow = true;
    return earGroup;
  };
  group.add(createEar(-0.34), createEar(0.34));

  // Facial features
  const faceGroup = new THREE.Group();
  faceGroup.position.copy(head.position);
  
  // Photorealistic eyes with proper materials
  const eyeWhiteMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xfff8f0,
    metalness: 0.0,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5
  });
  const irisMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x5a7fa8,
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    reflectivity: 0.8,
    emissive: 0x1a2f48,
    emissiveIntensity: 0.15
  });
  const pupilMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x000000,
    metalness: 0.5,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    reflectivity: 1.0
  });

  const createEye = (posX: number) => {
    const eyeGroup = new THREE.Group();
    
    // Eye socket (subtle depression)
    const eyeSocket = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 32, 32),
      muscleMaterial
    );
    eyeSocket.scale.set(1, 0.8, 0.4);
    eyeSocket.position.z = -0.02;
    
    // Eyelids (upper and lower)
    const upperLid = new THREE.Mesh(
      new THREE.SphereGeometry(0.062, 24, 24),
      skinMaterial
    );
    upperLid.scale.set(1, 0.35, 0.6);
    upperLid.position.set(0, 0.035, 0.015);
    
    const lowerLid = new THREE.Mesh(
      new THREE.SphereGeometry(0.062, 24, 24),
      skinMaterial
    );
    lowerLid.scale.set(1, 0.25, 0.6);
    lowerLid.position.set(0, -0.032, 0.015);
    
    // Eyeball
    const eyeWhite = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 32, 32),
      eyeWhiteMaterial
    );
    eyeWhite.scale.z = 0.85;
    eyeWhite.position.z = 0.02;
    
    // Iris with depth
    const iris = new THREE.Mesh(
      new THREE.CircleGeometry(0.03, 32),
      irisMaterial
    );
    iris.position.z = 0.055;
    
    // Pupil
    const pupil = new THREE.Mesh(
      new THREE.CircleGeometry(0.015, 24),
      pupilMaterial
    );
    pupil.position.z = 0.056;
    
    // Cornea reflection
    const cornea = new THREE.Mesh(
      new THREE.SphereGeometry(0.057, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        reflectivity: 1.0,
        ior: 1.4
      })
    );
    cornea.scale.z = 0.9;
    cornea.position.z = 0.02;
    
    eyeGroup.add(eyeSocket, eyeWhite, iris, pupil, cornea, upperLid, lowerLid);
    eyeGroup.position.set(posX, 0.1, 0.31);
    return eyeGroup;
  };
  
  faceGroup.add(createEye(-0.12), createEye(0.12));
  
  // Anatomically accurate nose with smooth curves
  const noseGroup = new THREE.Group();
  
  const noseBridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.032, 0.16, 24),
    skinMaterial
  );
  noseBridge.position.set(0, 0.02, 0.33);
  noseBridge.rotation.x = 0.1;
  
  const noseTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.048, 32, 32),
    skinMaterial
  );
  noseTip.position.set(0, -0.065, 0.355);
  noseTip.scale.set(0.85, 0.75, 1.1);
  
  const noseBase = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 24, 24),
    skinMaterial
  );
  noseBase.scale.set(1.2, 0.4, 0.7);
  noseBase.position.set(0, -0.09, 0.34);
  
  noseGroup.add(noseBridge, noseTip, noseBase);
  
  // Realistic nostrils with depth
  const createNostril = (posX: number) => {
    const nostrilGroup = new THREE.Group();
    
    const nostril = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 20, 20),
      new THREE.MeshPhysicalMaterial({ 
        color: 0x3d2420, 
        metalness: 0, 
        roughness: 0.95,
        clearcoat: 0.15
      })
    );
    nostril.scale.set(0.75, 0.6, 0.8);
    nostrilGroup.add(nostril);
    
    nostrilGroup.position.set(posX, -0.095, 0.345);
    return nostrilGroup;
  };
  noseGroup.add(createNostril(-0.028), createNostril(0.028));
  
  faceGroup.add(noseGroup);
  
  // Realistic mouth with proper lip structure
  const lipMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xd4857f, 
    metalness: 0.05, 
    roughness: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    sheen: 0.4,
    sheenColor: new THREE.Color(0xffa0a0)
  });
  
  const mouthGroup = new THREE.Group();
  
  // Upper lip with realistic curve
  const upperLipGeo = new THREE.SphereGeometry(0.075, 32, 32);
  upperLipGeo.scale(1.85, 0.28, 0.85);
  const upperLip = new THREE.Mesh(upperLipGeo, lipMaterial);
  upperLip.position.set(0, -0.165, 0.325);
  
  // Lower lip slightly larger
  const lowerLipGeo = new THREE.SphereGeometry(0.078, 32, 32);
  lowerLipGeo.scale(1.75, 0.32, 0.9);
  const lowerLip = new THREE.Mesh(lowerLipGeo, lipMaterial);
  lowerLip.position.set(0, -0.195, 0.328);
  
  // Mouth opening (dark line between lips)
  const mouthLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.008, 0.01),
    new THREE.MeshPhysicalMaterial({ color: 0x5d3530, metalness: 0, roughness: 1 })
  );
  mouthLine.position.set(0, -0.18, 0.328);
  
  mouthGroup.add(upperLip, lowerLip, mouthLine);
  faceGroup.add(mouthGroup);
  
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

  // Smooth, photorealistic neck with higher segments
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.165, 0.26, 48),
    skinMaterial
  );
  neck.position.y = 2.0;
  neck.castShadow = true;
  neck.receiveShadow = true;
  group.add(neck);

  // Upper chest (clavicle area)
  const upperChest = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * config.torsoWidth, 0.2, 0.25),
    muscleMaterial
  );
  upperChest.position.y = 1.75;
  group.add(upperChest);

  // Chest/Torso - smooth anatomical shape (64 segments for photorealism)
  const chestGeometry = new THREE.CylinderGeometry(
    0.34 * config.torsoWidth,
    0.38 * config.waistScale,
    0.78,
    64
  );
  const chest = new THREE.Mesh(chestGeometry, skinMaterial);
  chest.position.y = 1.3;
  chest.scale.z = 0.62 * config.chestDepth;
  chest.castShadow = true;
  chest.receiveShadow = true;
  group.add(chest);

  // Pectoral/breast area - smooth and anatomically accurate
  if (config.breastSize > 0) {
    // Female breast geometry with smooth curves (48 segments)
    const breastLeft = new THREE.Mesh(
      new THREE.SphereGeometry(0.115 + (config.breastSize * 0.07), 48, 48),
      skinMaterial
    );
    breastLeft.position.set(-0.125 * config.torsoWidth, 1.46, 0.18);
    breastLeft.scale.set(0.92, 1.08, 1.25);
    breastLeft.castShadow = true;
    breastLeft.receiveShadow = true;
    
    const breastRight = new THREE.Mesh(
      new THREE.SphereGeometry(0.115 + (config.breastSize * 0.07), 48, 48),
      skinMaterial
    );
    breastRight.position.set(0.125 * config.torsoWidth, 1.46, 0.18);
    breastRight.scale.set(0.92, 1.08, 1.25);
    breastRight.castShadow = true;
    breastRight.receiveShadow = true;
    
    group.add(breastLeft, breastRight);
  } else {
    // Male pectoral muscles with muscle definition (48 segments)
    const pectoralLeft = new THREE.Mesh(
      new THREE.SphereGeometry(0.14 * config.muscleScale, 48, 48),
      muscleMaterial
    );
    pectoralLeft.position.set(-0.15 * config.torsoWidth, 1.48, 0.13);
    pectoralLeft.scale.set(1, 0.95, 0.65);
    pectoralLeft.castShadow = true;
    pectoralLeft.receiveShadow = true;
    
    const pectoralRight = new THREE.Mesh(
      new THREE.SphereGeometry(0.14 * config.muscleScale, 48, 48),
      muscleMaterial
    );
    pectoralRight.position.set(0.15 * config.torsoWidth, 1.48, 0.13);
    pectoralRight.scale.set(1, 0.95, 0.65);
    pectoralRight.castShadow = true;
    pectoralRight.receiveShadow = true;
    
    group.add(pectoralLeft, pectoralRight);
  }

  // Smooth abdomen with realistic curvature (64 segments)
  const abdomenGeometry = new THREE.SphereGeometry(0.36 * config.waistScale, 64, 64);
  const abdomen = new THREE.Mesh(abdomenGeometry, skinMaterial);
  abdomen.scale.set(1.02, 0.68, 0.78);
  abdomen.position.y = 0.76;
  abdomen.castShadow = true;
  abdomen.receiveShadow = true;
  group.add(abdomen);

  // Smooth waist definition with proper taper (64 segments)
  const waist = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.31 * config.waistScale,
      0.36 * config.waistScale,
      0.34,
      64
    ),
    skinMaterial
  );
  waist.position.y = 0.52;
  waist.scale.z = 0.68;
  waist.castShadow = true;
  waist.receiveShadow = true;
  group.add(waist);

  // Smooth hips with gender-specific pelvis (64 segments)
  const hips = new THREE.Mesh(
    new THREE.SphereGeometry(0.40 * config.hipScale, 64, 64),
    skinMaterial
  );
  hips.scale.set(1.08 * config.pelvisWidth, 0.52, 0.88);
  hips.position.y = 0.16;
  hips.castShadow = true;
  hips.receiveShadow = true;
  group.add(hips);
  
  // Smooth glutes with realistic curves - gender-specific (48 segments)
  const glutes = new THREE.Mesh(
    new THREE.SphereGeometry(0.21 * config.hipScale, 48, 48),
    skinMaterial
  );
  glutes.scale.set(0.78 * config.pelvisWidth, 0.88, 1.18 + (config.breastSize * 0.28));
  glutes.position.set(0, 0.12, -0.16);
  glutes.castShadow = true;
  glutes.receiveShadow = true;
  group.add(glutes);

  // Smooth shoulders with muscle definition - gender-specific (48 segments)
  const createShoulder = (posX: number) => {
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.17 * config.muscleScale, 48, 48),
      muscleMaterial
    );
    shoulder.position.set(posX, 1.65 + config.shoulderHeight, 0);
    shoulder.castShadow = true;
    shoulder.receiveShadow = true;
    return shoulder;
  };
  
  const leftShoulder = createShoulder(-0.44 * config.torsoWidth);
  const rightShoulder = createShoulder(0.44 * config.torsoWidth);
  group.add(leftShoulder, rightShoulder);

  // Arms with proper joints
  const createArm = (posX: number) => {
    const armGroup = new THREE.Group();
    
    // Smooth upper arm (48 segments)
    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * config.muscleScale, 0.09 * config.muscleScale, 0.55, 48),
      skinMaterial
    );
    upperArm.position.set(posX, 1.35, 0);
    upperArm.castShadow = true;
    upperArm.receiveShadow = true;
    
    // Smooth elbow joint (32 segments)
    const elbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.10 * config.muscleScale, 32, 32),
      muscleMaterial
    );
    elbow.position.set(posX, 1.05, 0);
    elbow.castShadow = true;
    elbow.receiveShadow = true;
    
    // Smooth forearm (48 segments)
    const forearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09 * config.muscleScale, 0.07 * config.muscleScale, 0.5, 48),
      skinMaterial
    );
    forearm.position.set(posX, 0.75, 0);
    forearm.castShadow = true;
    forearm.receiveShadow = true;
    
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
    
    // Smooth thigh (48 segments)
    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14 * config.bodyScale, 0.12 * config.bodyScale, 0.7, 48),
      skinMaterial
    );
    thigh.position.set(posX, -0.25, 0);
    thigh.castShadow = true;
    thigh.receiveShadow = true;
    
    // Smooth knee (32 segments)
    const knee = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 * config.bodyScale, 32, 32),
      muscleMaterial
    );
    knee.position.set(posX, -0.62, 0);
    knee.castShadow = true;
    knee.receiveShadow = true;
    
    // Smooth calf (48 segments)
    const calf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11 * config.bodyScale, 0.08 * config.bodyScale, 0.65, 48),
      skinMaterial
    );
    calf.position.set(posX, -1.0, 0);
    calf.castShadow = true;
    calf.receiveShadow = true;
    
    // Smooth ankle (32 segments)
    const ankle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07 * config.bodyScale, 0.07 * config.bodyScale, 0.1, 32),
      skinMaterial
    );
    ankle.position.set(posX, -1.35, 0);
    ankle.castShadow = true;
    ankle.receiveShadow = true;
    
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
