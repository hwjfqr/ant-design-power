import CountdownButton from './CountdownButton';
import TagSelector from './TagSelector';
import ModalForm from './ModalForm';
import ModalDetail from './ModalDetail';
import QuickRangePicker from './QuickRangePicker';
import EditableTag from './EditableTag';
import EditableTree from './EditableTree';
import ProgressLoading from './ProgressLoading';
import ReactiveTable from './ReactiveTable';

/* 
  解决编译出错问题的参考：
    https://github.com/umijs/father/issues/227
    https://stackoverflow.com/questions/45468683/error-at-node-modules-types-react-dom-subsequent-variable-declarations-mus
*/

export {
  CountdownButton,
  TagSelector,
  ModalForm,
  ModalDetail,
  QuickRangePicker,
  EditableTag,
  EditableTree,
  ProgressLoading,
  ReactiveTable as TableList, // 组件更名，兼容旧版本。
  ReactiveTable,
};
export default {
  CountdownButton,
  TagSelector,
  ModalForm,
  ModalDetail,
  QuickRangePicker,
  EditableTag,
  EditableTree,
  ProgressLoading,
  TableList: ReactiveTable,
  ReactiveTable,
};
