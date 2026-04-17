import { Menu as AMenu } from 'antd';
import { ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router';

const items = Object.keys(import.meta.glob('../../output/*.3mf'))
  .map((file) => file.split('/').at(-1))
  .filter((file): file is string => !!file)
  .map((file) => {
    return {
      label: file,
      key: file,
    };
  });

interface Props {
  setCollapsed: (collapsed: boolean) => void;
}

const Menu = ({ setCollapsed }: Props) => {
  const { model } = useParams();
  const navigate = useNavigate();

  const selectedKeys = model ? [model] : [];

  const onClick: ComponentProps<typeof AMenu>['onClick'] = ({ key }) => {
    setCollapsed(true);
    navigate(`/${key}`);
  };

  return <AMenu items={items} onClick={onClick} selectedKeys={selectedKeys} />;
};

export default Menu;
