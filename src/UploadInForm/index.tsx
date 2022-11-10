import React, { useState, useEffect, ReactNode } from 'react';
import { Upload, Button, message, UploadFile } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/es/upload/index';

export type FileListType = {
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件 URL
   */
  url?: string;
  uid?: string;
  [prop: string]: any;
}[];
export type UploadInFormProps = {
  /**
   * 值（由 Form 控制），格式为 name（文件名）、url（文件 URL）。
   */
  value?: FileListType;
  /**
   * 上传文件改变时的回调（由 Form 控制）。
   */
  onChange?: (fileList?: FileListType) => void;
  /**
   * 用于将接收到的文件数据，转换为 value 所适配的格式（判断文件上传响应内容，提取 name 与 url，并返回）。
   */
  transform: (
    fileList: UploadFile<any>[],
    info: UploadChangeParam,
  ) => FileListType;
  /**
   * 文件上传后的回调，用于根据文件上传信息执行其他逻辑（例如错误提示等）。
   */
  changedCallback?: (info: UploadChangeParam) => void;
  children?: ReactNode;
} & UploadProps;
function UploadInForm({
  value,
  onChange,
  transform,
  changedCallback = (info) => {
    if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传出错`);
    }
  },
  children,
  ...rest
}: UploadInFormProps) {
  const [fileList, setFileList] = useState<FileListType | undefined>([]);

  useEffect(() => {
    setFileList(value);
  }, [value]);

  return (
    <>
      <Upload
        fileList={(fileList || []).map((item, idx) => ({
          uid: String(idx),
          ...item,
        }))}
        onChange={(info) => {
          const {
            file: { status },
          } = info;
          console.log(info);
          if (status === 'done' || status === 'removed') {
            const result = transform(info.fileList, info);
            onChange && onChange(result);
          } else {
            setFileList(info.fileList);
          }
          changedCallback(info);
        }}
        {...rest}
      >
        {children || <Button>上传</Button>}
      </Upload>
    </>
  );
}

export default UploadInForm;
