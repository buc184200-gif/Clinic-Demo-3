import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils, Group, CatmullRomCurve3 } from 'three';
import { Instances, Instance, Float } from '@react-three/drei';

export function SpineModel({ scrollProgress = 0, isMobile = false }) {
  const groupRef = useRef<Group>(null);
  const { mouse, viewport } = useThree();

  // Create points for the spine curve
  const curvePoints = useMemo(() => {
    const points = [];
    // Approximate spinal curve (cervical, thoracic, lumbar, sacrum)
    for (let i = 0; i < 24; i++) {
      const t = i / 23;
      // S-curve formula
      const y = MathUtils.lerp(12, -12, t);
      let x = 0;
      let z = 0;
      
      if (t < 0.3) {
        // Cervical (lordosis)
        z = Math.sin(t * Math.PI * 3) * 0.5;
      } else if (t < 0.7) {
        // Thoracic (kyphosis)
        z = Math.sin((t - 0.3) * Math.PI * 2.5) * -1.5;
      } else {
        // Lumbar (lordosis)
        z = Math.sin((t - 0.7) * Math.PI * 3) * 1.0;
      }
      points.push(new Vector3(x, y, z));
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Base rotation (slow continuous)
    const time = state.clock.getElapsedTime();
    
    // Interactive mouse rotation (desktop only)
    if (!isMobile) {
      const targetRotationX = (mouse.y * Math.PI) / 8;
      const targetRotationY = (mouse.x * Math.PI) / 8 + (time * 0.1);
      
      groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetRotationX, 4, delta);
      groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetRotationY, 4, delta);
    } else {
      groupRef.current.rotation.y = time * 0.15;
    }

    // Scroll based separation/animation logic
    // Stage 1 (0): Normal
    // Stage 2 (0.2): Closer to lumbar
    // Stage 3 (0.4): Disc highlighted
    // Stage 4 (0.6): Vertebrae separate
    // Stage 5 (0.8): Nerve visible
    // Stage 6 (1.0): Realigned
    
    // Animate individual vertebrae separation based on scroll
    let separation = 0;
    if (scrollProgress > 0.5 && scrollProgress < 0.9) {
      // Peak separation at 0.7
      separation = Math.sin((scrollProgress - 0.5) * Math.PI / 0.4) * 0.5;
    }
    
    // We update instances by accessing them through children if needed, 
    // but React Three Fiber handles positions via props generally.
    // For performance, we'll keep it simple: group moves/rotates slightly based on scroll.
    const targetY = scrollProgress > 0.1 && scrollProgress < 0.4 ? 4 : 0; // move down to show lumbar
    groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, targetY, 2, delta);
  });

  // Calculate colors and scales for visual interest
  const getVertebraProps = (index: number, pos: Vector3) => {
    const t = index / 24;
    // Scale grows towards lumbar, shrinks at sacrum
    const baseScale = 0.6 + Math.sin(t * Math.PI) * 0.6;
    
    // Calculate separation based on scrollProgress
    // Let's create a visual separation in the lumbar region (index 15-20)
    let yOffset = 0;
    if (scrollProgress > 0.5 && scrollProgress < 0.9 && index >= 15 && index <= 20) {
       yOffset = (index - 17.5) * Math.sin((scrollProgress - 0.5) * Math.PI / 0.4) * 0.8;
    }
    
    return {
      position: [pos.x, pos.y + yOffset, pos.z] as [number, number, number],
      scale: baseScale
    };
  };

  return (
    <group ref={groupRef} scale={isMobile ? 0.6 : 1}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Instances
          limit={24}
          range={24}
          castShadow
          receiveShadow
        >
          {/* Stylized Vertebra geometry */}
          <cylinderGeometry args={[1, 1.2, 0.6, 6]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            roughness={0.7} 
            metalness={0.1}
            envMapIntensity={1}
            transparent
            opacity={0.9}
          />
          {curvePoints.map((pos, i) => {
            const props = getVertebraProps(i, pos);
            return (
              <Instance
                key={`vert-${i}`}
                position={props.position}
                scale={props.scale}
                rotation={[Math.PI/2, 0, 0]}
              />
            );
          })}
        </Instances>
        
        {/* Intervertebral Discs */}
        <Instances limit={23} range={23}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 12]} />
          <meshPhysicalMaterial 
            color="#DCEBE3"
            emissive="#176B4D"
            emissiveIntensity={0.2}
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            transparent
            opacity={0.8}
          />
          {curvePoints.slice(0, 23).map((pos, i) => {
            const nextPos = curvePoints[i + 1];
            const midY = (pos.y + nextPos.y) / 2;
            const midZ = (pos.z + nextPos.z) / 2;
            
            // Highlight a specific disc based on scroll
            let scale = 0.6 + Math.sin((i / 24) * Math.PI) * 0.5;
            let emissiveColor = "#0B1019";
            
            if (scrollProgress > 0.3 && scrollProgress < 0.7 && i === 18) {
              scale *= 1.2;
              emissiveColor = "#176B4D"; // Green glow when highlighted
            }
            
            let yOffset = 0;
            if (scrollProgress > 0.5 && scrollProgress < 0.9 && i >= 15 && i <= 19) {
               yOffset = (i - 17) * Math.sin((scrollProgress - 0.5) * Math.PI / 0.4) * 0.8;
            }

            return (
              <Instance
                key={`disc-${i}`}
                position={[0, midY + yOffset, midZ]}
                scale={scale}
                rotation={[Math.PI/2, 0, 0]}
                color={scrollProgress > 0.3 && scrollProgress < 0.7 && i === 18 ? "#176B4D" : "#ffffff"}
              />
            );
          })}
        </Instances>

        {/* Abstract Nerve Pathway */}
        <mesh position={[0, -2, -1]}>
          <tubeGeometry args={[
             new CatmullRomCurve3(curvePoints),
             64, 
             0.05, 
             8, 
             false
          ]} />
          <meshBasicMaterial 
            color="#0D4F38" 
            transparent 
            opacity={scrollProgress > 0.7 && scrollProgress < 0.9 ? 0.8 : 0} 
          />
        </mesh>
      </Float>
    </group>
  );
}
