import { createRoot } from 'react-dom/client';
import Viewer from './viewer';
import { Layout } from 'antd';
import { useState } from 'react';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Menu from './menu';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('No app container found');
}

const App = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState<boolean>(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#001529' }}>
        <Layout.Sider
          width={375}
          collapsible={true}
          collapsed={isMenuCollapsed}
          onCollapse={setMenuCollapsed}
        >
          <Menu setCollapsed={setMenuCollapsed} />
        </Layout.Sider>
        <Layout.Content>
          <Routes>
            <Route path="/:model" element={<Viewer />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

createRoot(app).render(<App />);
