import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';

interface Props {
  model: string | undefined;
}

const Model = ({ model }: Props) => {
  const result = useLoader(ThreeMFLoader, `models/${model}`);

  return <primitive object={result} />;
};

const Viewer = ({ model }: Props) => {
  if (!model) {
    return;
  }

  return (
    <Canvas camera={{ up: [0, 0, 1], position: [-50, -125, 50] }}>
      <ambientLight intensity={1} />
      <directionalLight intensity={2} position={[-1, -2.5, 1]} />
      <Model model={model} />
      <OrbitControls />
    </Canvas>
  );
};

export default Viewer;
