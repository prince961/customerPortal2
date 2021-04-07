import React, { useMemo } from "react";

import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const Dropzone = ({ setFiles, setModal, setSelecting, setSingle }) => {
  const onDragHandler = (files) => {
    setModal(false);
    setSelecting(true);
    setSingle(false);
    setFiles(files);
  };
  const accept =
    "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: accept,
  });

  console.log(acceptedFiles);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.xlsx and *.csv files will be accepted)</em>
      </div>
      <aside>
        {/* <ul>{acceptedFileItems}</ul> */}
        {acceptedFiles.length > 0
          ? onDragHandler(acceptedFiles)
          : fileRejections.length > 0 && (
              <p style={{ color: "red " }}>Please Upload a CSV or Excel File</p>
            )}
      </aside>
    </div>
  );
};

export default Dropzone;
