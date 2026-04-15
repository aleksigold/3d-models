import { createRoot } from 'react-dom/client';
import Viewer from './viewer';
import { FloatButton, Layout, Menu } from 'antd';
import { ComponentProps, useState } from 'react';

import 'antd/dist/reset.css';
import { CloudDownloadOutlined, GithubOutlined } from '@ant-design/icons';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('No app container found');
}

const items = Object.keys(import.meta.glob('../../output/*.3mf'))
  .map((model) => {
    const file = model.split('/').at(-1);

    if (!file) {
      return;
    }

    return {
      label: file,
      key: file,
    };
  })
  .filter((item): item is { label: string; key: string } => !!item);

const App = () => {
  const [currentModel, setCurrentModel] = useState<string>();
  const [isMenuCollapsed, setMenuCollapsed] = useState<boolean>(false);

  const selectedKeys = currentModel ? [currentModel] : [];

  const download = async () => {
    if (!currentModel) {
      return;
    }

    const response = await fetch(`/models/${currentModel}`);
    const blob = await response.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = currentModel;
    a.click();
  };

  const onClick: ComponentProps<typeof Menu>['onClick'] = ({ key }) => {
    setCurrentModel(key);
    setMenuCollapsed(true);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#001529' }}>
        <Layout.Sider
          width={375}
          collapsible={true}
          collapsed={isMenuCollapsed}
          onCollapse={setMenuCollapsed}
        >
          <Menu items={items} onClick={onClick} selectedKeys={selectedKeys} />
        </Layout.Sider>
        <Layout.Content>
          <Viewer model={currentModel} />
        </Layout.Content>
      </Layout>
      {currentModel ? (
        <FloatButton.Group>
          <FloatButton onClick={download} icon={<CloudDownloadOutlined />} />
          <FloatButton
            icon={<GithubOutlined />}
            href={`https://github.com/aleksigold/3d-models/blob/main/models/${currentModel.replace('3mf', 'py')}`}
          />
        </FloatButton.Group>
      ) : (
        ''
      )}
    </>
  );
};

createRoot(app).render(<App />);
