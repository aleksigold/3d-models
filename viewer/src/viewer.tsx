import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js';
import { useParams } from 'react-router';
import { FloatButton } from 'antd';
import { CloudDownloadOutlined, GithubOutlined } from '@ant-design/icons';

const Model = () => {
  const { model } = useParams();
  const result = useLoader(ThreeMFLoader, `models/${model}`);

  return <primitive object={result} />;
};

const Viewer = () => {
  const { model } = useParams();

  console.log(model);

  if (!model) {
    return;
  }

  const download = async () => {
    if (!model) {
      return;
    }

    const response = await fetch(`/models/${model}`);
    const blob = await response.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = model;
    a.click();
  };

  return (
    <>
      <Canvas camera={{ up: [0, 0, 1], position: [-50, -125, 50] }}>
        <ambientLight intensity={1} />
        <directionalLight intensity={2} position={[-1, -2.5, 1]} />
        <Model />
        <OrbitControls />
      </Canvas>
      <FloatButton.Group>
        <FloatButton onClick={download} icon={<CloudDownloadOutlined />} />
        <FloatButton
          icon={<GithubOutlined />}
          href={`https://github.com/aleksigold/3d-models/blob/main/models/${model.replace('3mf', 'py')}`}
        />
      </FloatButton.Group>
    </>
  );
};

export default Viewer;
