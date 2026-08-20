import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import { Float } from '@react-three/drei';

export function KneeModel({ scrollProgress = 0 }) {
  const groupRef = useRef<Group>(null);
  const femurRef = useRef<Group>(null);
  const tibiaRef = useRef<Group>(null);
  const { isMobile } = useThree((state) => ({ isMobile: state.viewport.width < 5 }));

  // Stage 1 (0): Complete knee joint appears.
  // Stage 2 (0.2): Rotates into a side view.
  // Stage 3 (0.4): Patella becomes slightly transparent.
  // Stage 4 (0.6): Ligaments are highlighted.
  // Stage 5 (0.8): Meniscus and cartilage become visible.
  // Stage 6 (1.0): Joint bends naturally.

  useFrame((state, delta) => {
    if (!groupRef.current || !femurRef.current || !tibiaRef.current) return;

    // Rotation (Stage 2)
    const targetRotY = scrollProgress > 0.1 ? Math.PI / 3 : 0;
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);

    // Bending (Stage 6)
    // The tibia bends relative to the femur
    const bendAngle = scrollProgress > 0.8 ? -Math.PI / 4 : 0;
    tibiaRef.current.rotation.x = MathUtils.damp(tibiaRef.current.rotation.x, bendAngle, 3, delta);
  });

  const boneMaterial = (
    <meshStandardMaterial 
      color="#FFFFFF" 
      roughness={0.6} 
      metalness={0.1}
      transparent
      opacity={0.9}
    />
  );

  const cartilageMaterial = (
    <meshPhysicalMaterial 
      color="#DCEBE3"
      emissive="#176B4D"
      roughness={0.2}
      transmission={0.9}
      thickness={0.5}
      transparent
      opacity={scrollProgress > 0.7 ? 0.8 : 0}
    />
  );

  const ligamentMaterial = (
    <meshStandardMaterial 
      color={scrollProgress > 0.5 ? "#176B4D" : "#FFFFFF"} 
      roughness={0.8}
      transparent
      opacity={scrollProgress > 0.5 ? 0.9 : 0.3}
      emissive={scrollProgress > 0.5 ? "#176B4D" : "#000000"}
      emissiveIntensity={scrollProgress > 0.5 ? 0.2 : 0}
    />
  );

  const patellaOpacity = scrollProgress > 0.3 ? 0.2 : 0.9;

  return (
    <group ref={groupRef} scale={isMobile ? 0.8 : 1.2} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* Femur (Upper Bone) */}
        <group ref={femurRef} position={[0, 2, 0]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.8, 1, 4, 16]} />
            {boneMaterial}
          </mesh>
          {/* Condyles (Bottom of Femur) */}
          <mesh position={[-0.5, 0, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            {boneMaterial}
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            {boneMaterial}
          </mesh>
          
          {/* Femoral Cartilage */}
          <mesh position={[-0.5, -0.1, 0.1]} scale={1.05}>
            <sphereGeometry args={[0.7, 16, 16, 0, Math.PI, 0, Math.PI/2]} />
            {cartilageMaterial}
          </mesh>
          <mesh position={[0.5, -0.1, 0.1]} scale={1.05}>
            <sphereGeometry args={[0.7, 16, 16, 0, Math.PI, 0, Math.PI/2]} />
            {cartilageMaterial}
          </mesh>
        </group>

        {/* Tibia & Fibula (Lower Bones) - Pivots at the joint [0, 1.5, 0] */}
        <group position={[0, 1.5, 0]}>
          <group ref={tibiaRef} position={[0, -1.5, 0]}>
            {/* Tibia Plateau */}
            <mesh position={[0, 1.3, 0]}>
              <cylinderGeometry args={[1.1, 0.9, 0.4, 16]} />
              {boneMaterial}
            </mesh>
            {/* Tibia Shaft */}
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[0.7, 0.6, 4, 16]} />
              {boneMaterial}
            </mesh>
            
            {/* Meniscus */}
            <mesh position={[-0.5, 1.55, 0]} rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.4, 0.1, 8, 16, Math.PI]} />
              {cartilageMaterial}
            </mesh>
            <mesh position={[0.5, 1.55, 0]} rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.4, 0.1, 8, 16, Math.PI]} />
              {cartilageMaterial}
            </mesh>

            {/* Patella (Kneecap) - Attached loosely to tibia movement via patellar tendon */}
            <mesh position={[0, 2, 1.2]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                roughness={0.6} 
                transparent
                opacity={patellaOpacity}
              />
            </mesh>
            
            {/* Patellar Tendon */}
            <mesh position={[0, 1.5, 1.1]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
              {ligamentMaterial}
            </mesh>
          </group>
        </group>

        {/* ACL / PCL Ligaments (Abstract) */}
        <mesh position={[0, 1.7, 0]} rotation={[0.5, 0, 0.2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          {ligamentMaterial}
        </mesh>
        <mesh position={[0, 1.7, -0.2]} rotation={[-0.5, 0, -0.2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          {ligamentMaterial}
        </mesh>
        
        {/* LCL / MCL */}
        <mesh position={[-1, 1.7, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          {ligamentMaterial}
        </mesh>
        <mesh position={[1, 1.7, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          {ligamentMaterial}
        </mesh>

      </Float>
    </group>
  );
}
