
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useTexture, PerspectiveCamera, useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface BookProps {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  color: string;
  bookId: string;
  setHovered: (title: string) => void;
}

const Book = ({ position, rotation, title, color, bookId, setHovered }: BookProps) => {
  const bookRef = useRef<THREE.Group>(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  
  // Texture for book cover
  const texture = useTexture('/placeholder.svg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.15, 0.15);
  
  // Create book materials with enhanced visuals
  const materials = {
    cover: new THREE.MeshStandardMaterial({ 
      color: color,
      roughness: 0.3,
      metalness: 0.2,
      map: texture,
      envMapIntensity: 0.8
    }),
    spine: new THREE.MeshStandardMaterial({ 
      color: color,
      roughness: 0.3,
      metalness: 0.2,
      map: texture,
      envMapIntensity: 0.8
    }),
    page: new THREE.MeshStandardMaterial({ 
      color: '#f1e9db',
      roughness: 0.8,
      metalness: 0.1
    }),
    gold: new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.2,
      metalness: 0.8,
      envMapIntensity: 1.5
    })
  };
  
  // Handle hover and click with enhanced animations
  useFrame((state) => {
    if (!bookRef.current) return;
    
    if (active) {
      const t = state.clock.getElapsedTime();
      bookRef.current.rotation.x = Math.sin(t / 4) * 0.12;
      bookRef.current.rotation.y = Math.sin(t / 2) * 0.15 + rotation[1];
      bookRef.current.position.y = position[1] + Math.sin(t / 2) * 0.08;
    }
  });
  
  useEffect(() => {
    if (!bookRef.current) return;
    
    if (active) {
      const timeline = gsap.timeline();
      timeline.to(bookRef.current.rotation, { 
        y: rotation[1] + Math.PI * 0.15,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
      timeline.to(bookRef.current.position, { 
        y: position[1] + 0.2,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");
      timeline.to(bookRef.current.scale, { 
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5");
    } else {
      gsap.to(bookRef.current.rotation, { 
        y: rotation[1],
        duration: 0.6,
        ease: "power2.out"
      });
      gsap.to(bookRef.current.position, { 
        y: position[1],
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(bookRef.current.scale, { 
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [active, position, rotation]);
  
  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={position}
    >
      <group 
        ref={bookRef} 
        rotation={rotation}
        onClick={() => navigate(`/books/${bookId}`)}
        onPointerOver={() => {
          setActive(true);
          setHovered(title);
        }}
        onPointerOut={() => {
          setActive(false);
          setHovered('');
        }}
      >
        {/* Book Cover */}
        <mesh material={materials.cover}>
          <boxGeometry args={[1.5, 2.2, 0.15]} />
        </mesh>
        
        {/* Book Pages */}
        <mesh position={[-0.65, 0, 0]} material={materials.page}>
          <boxGeometry args={[0.1, 2.1, 0.13]} />
        </mesh>
        
        {/* Book Spine */}
        <mesh position={[-0.75, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={materials.spine}>
          <boxGeometry args={[0.15, 2.2, 0.1]} />
        </mesh>
        
        {/* Gold decoration on cover */}
        <mesh position={[0, 0, 0.08]} material={materials.gold}>
          <boxGeometry args={[1.2, 0.1, 0.01]} />
        </mesh>
        
        {/* Title on spine */}
        <Text
          position={[-0.78, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          color="#ffffff"
          fontSize={0.12}
          maxWidth={1.5}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtM.woff"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
};

// Frame component for the photo
const PhotoFrame = () => {
  const frameRef = useRef<THREE.Group>(null);
  
  // Create materials for the frame
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#8D6E63',
    roughness: 0.3,
    metalness: 0.4,
    envMapIntensity: 1
  });
  
  const photoTexture = useTexture('/placeholder.svg');
  
  useFrame(({ clock }) => {
    if (frameRef.current) {
      const t = clock.getElapsedTime();
      frameRef.current.rotation.y = Math.sin(t / 4) * 0.1;
      frameRef.current.position.y = Math.sin(t / 3) * 0.05 + 3;
    }
  });
  
  return (
    <Float 
      speed={2} 
      rotationIntensity={0.3} 
      floatIntensity={0.5}
      position={[0, 3, -2]}
    >
      <group ref={frameRef} scale={[1.5, 1.5, 1.5]}>
        {/* Frame */}
        <mesh material={frameMaterial}>
          <boxGeometry args={[2.2, 2.8, 0.1]} />
        </mesh>
        
        {/* Photo */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2, 2.6]} />
          <meshStandardMaterial map={photoTexture} />
        </mesh>
        
        {/* Frame decoration */}
        <mesh position={[0, 0, 0.15]} material={new THREE.MeshStandardMaterial({ color: '#FFD700', metalness: 0.8 })}>
          <torusGeometry args={[0.8, 0.05, 16, 100]} />
        </mesh>
        
        {/* Text */}
        <Text
          position={[0, -1.6, 0.16]}
          color="#FFD700"
          fontSize={0.15}
          maxWidth={2}
          lineHeight={1}
          letterSpacing={0.05}
          textAlign="center"
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtM.woff"
        >
          Srila Prabhupada
        </Text>
      </group>
    </Float>
  );
};

const Books = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState('');
  
  // Enhanced books data with more varied positions
  const books = [
    { id: 'bg', title: 'Bhagavad Gita', color: '#F57C00', position: [-2.5, 0, 0] as [number, number, number], rotation: [0, 0.2, 0] as [number, number, number] },
    { id: 'sb', title: 'Srimad Bhagavatam', color: '#7E69AB', position: [0, -0.2, 0.5] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
    { id: 'cc', title: 'Chaitanya Charitamrita', color: '#8D6E63', position: [2.5, 0, 0] as [number, number, number], rotation: [0, -0.2, 0] as [number, number, number] },
  ];
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <>
      <Environment preset="sunset" />
      
      <group ref={groupRef}>
        {books.map((book) => (
          <Book
            key={book.id}
            bookId={book.id}
            title={book.title}
            color={book.color}
            position={book.position}
            rotation={book.rotation}
            setHovered={setHovered}
          />
        ))}
      </group>
      
      <PhotoFrame />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      <spotLight
        position={[-10, 5, -10]}
        angle={0.15}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <directionalLight 
        position={[0, 10, 5]} 
        intensity={0.6} 
        castShadow 
      />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
    </>
  );
};

const BookCanvas = () => {
  return (
    <div className="h-[600px] md:h-[700px] w-full relative overflow-hidden bg-gradient-to-b from-orange-50 to-amber-100">
      <Canvas dpr={[1, 2]} shadows>
        <Books />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="font-heading text-xl text-primary-foreground bg-primary/80 inline-block px-6 py-2 rounded-full shadow-lg backdrop-blur-sm">
          Click on a book to explore Srila Prabhupada's wisdom
        </p>
      </div>
    </div>
  );
};

export default BookCanvas;
