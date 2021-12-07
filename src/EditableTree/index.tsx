import React, { ReactNode } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import {
  PlusCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { DataNode, TreeProps } from 'antd/es/tree';
import { DropDownProps } from 'antd/es/dropdown';
import { MenuProps } from 'antd/es/menu';

interface EditableTreeProps extends TreeProps {
  /**
   * 右键菜单项对应的方法
   */
  treeEditingMethod?: {
    addItem?: (nodeInfo: DataNode) => void;
    editItem?: (nodeInfo: DataNode) => void;
    deleteItem?: (nodeInfo: DataNode) => void;
  };
  /**
   * 自定义右键菜单项
   */
  renderRightClickMenuItem?: (menu: ReactNode, nodeInfo: DataNode) => ReactNode;
  /**
   * 用于指定 Dropdown 组件的其他 API
   */
  dropdownProps?: DropDownProps;
  /**
   * 用于指定 Menu 组件的其他 API
   */
  menuProps?: MenuProps;
}
function EditableTree({
  treeEditingMethod = {},
  renderRightClickMenuItem,
  treeData: data,
  dropdownProps,
  menuProps,
  ...rest
}: EditableTreeProps) {
  const { addItem, editItem, deleteItem } = treeEditingMethod;
  interface TreeRightClickMenuProps {
    nodeInfo: DataNode;
    children: ReactNode;
  }
  const TreeRightClickMenu = ({
    nodeInfo,
    children,
  }: TreeRightClickMenuProps) => {
    const menu = (
      <>
        {addItem ? (
          <Menu.Item
            icon={<PlusCircleOutlined />}
            key="add"
            onClick={() => {
              addItem && addItem(nodeInfo);
            }}
          >
            添加
          </Menu.Item>
        ) : null}
        {editItem ? (
          <Menu.Item
            key="edit"
            icon={<EditOutlined />}
            onClick={async () => {
              editItem(nodeInfo);
            }}
          >
            修改
          </Menu.Item>
        ) : null}
        {deleteItem ? (
          <Menu.Item
            key="delete"
            icon={<MinusCircleOutlined />}
            danger
            onClick={async () => {
              deleteItem(nodeInfo);
            }}
          >
            删除
          </Menu.Item>
        ) : null}
      </>
    );
    return (
      <Dropdown
        overlay={
          <Menu
            onClick={({ domEvent }) => {
              domEvent.stopPropagation();
            }}
            {...menuProps}
          >
            {!renderRightClickMenuItem
              ? menu
              : renderRightClickMenuItem(menu, nodeInfo)}
          </Menu>
        }
        trigger={['contextMenu']}
        {...dropdownProps}
      >
        <span>{children}</span>
      </Dropdown>
    );
  };
  const dataTransform: (data: DataNode[]) => DataNode[] = (data) => {
    return data.map((item) => {
      const { title, children } = item;
      return {
        ...item,
        title: (
          <TreeRightClickMenu nodeInfo={{ ...item }}>
            {title}
          </TreeRightClickMenu>
        ),
        children: children ? dataTransform(children) : undefined,
      };
    });
  };
  const treeData = data ? dataTransform(data) : [];
  return <Tree treeData={treeData} {...rest}></Tree>;
}

export default EditableTree;
