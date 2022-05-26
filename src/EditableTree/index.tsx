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

export type DataNodeType = DataNode & {
  children?: DataNodeType[];
  [prop: string]: any;
};
type TreeEditingMethodType = {
  addItem?: (nodeInfo: DataNodeType) => void;
  editItem?: (nodeInfo: DataNodeType) => void;
  deleteItem?: (nodeInfo: DataNodeType) => void;
};
interface EditableTreeProps extends TreeProps {
  /**
   * 树数据
   */
  treeData: DataNodeType[];
  /**
   * 右键菜单项对应的回调
   */
  treeEditingMethod?: TreeEditingMethodType;
  /**
   * 自定义右键菜单项
   */
  renderRightClickMenuItem?: (
    menu: ReactNode[],
    nodeInfo: DataNodeType,
    treeEditingMethod: TreeEditingMethodType,
  ) => ReactNode;
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
    nodeInfo: DataNodeType;
    children: ReactNode;
  }
  const TreeRightClickMenu = ({
    nodeInfo,
    children,
  }: TreeRightClickMenuProps) => {
    const menu = [
      <Menu.Item
        icon={<PlusCircleOutlined />}
        key="add"
        onClick={() => {
          addItem && addItem(nodeInfo);
        }}
      >
        添加
      </Menu.Item>,
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => {
          editItem && editItem(nodeInfo);
        }}
      >
        修改
      </Menu.Item>,
      <Menu.Item
        key="delete"
        icon={<MinusCircleOutlined />}
        danger
        onClick={() => {
          deleteItem && deleteItem(nodeInfo);
        }}
      >
        删除
      </Menu.Item>,
    ];
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
              : renderRightClickMenuItem(menu, nodeInfo, treeEditingMethod)}
          </Menu>
        }
        trigger={['contextMenu']}
        {...dropdownProps}
      >
        <span>{children}</span>
      </Dropdown>
    );
  };
  const dataTransform: (data: DataNodeType[]) => DataNodeType[] = (data) => {
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

function updateTreeNode(
  treeData: DataNodeType[],
  key: string | number,
  callback: (node: DataNodeType) => DataNodeType,
) {
  const dfs = (node: DataNodeType[]): DataNodeType[] => {
    return node.map((item: DataNodeType) => {
      if (item.key === key) {
        const d = callback(item);
        return d;
      }
      return {
        ...item,
        children: (item.children || []).length ? dfs(item.children!) : null,
      };
    }) as DataNodeType[];
  };
  return dfs(treeData);
}

function deleteTreeNode(treeData: DataNodeType[], key: string | number) {
  const dfs = (node: DataNodeType[]): DataNodeType[] => {
    return node
      .filter((item) => {
        if (item.key === key) {
          return false;
        }
        return true;
      })
      .map((item) => {
        if ((item.children || []).length) {
          return {
            ...item,
            children: dfs(item.children!),
          };
        }
        return item;
      }) as DataNodeType[];
  };
  return dfs(treeData);
}
EditableTree.updateTreeNode = updateTreeNode;
EditableTree.deleteTreeNode = deleteTreeNode;

export default EditableTree;
