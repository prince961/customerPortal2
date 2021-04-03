import React, { useEffect, useMemo, useState } from "react";
import { parse } from "papaparse";

import "./UploadCsv.css";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { COLUMN } from "../util/columns";

const UploadCsv = ({ files }) => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  const result = useMemo(() => data, [data]);

  useEffect(() => {
    if (!files) {
      //   showDeleteWarningHandler();
      return;
    } else {
      files.forEach(async (file) => {
        const text = await file.text();
        const result = parse(text);
        const withHeaders = parse(text, { header: true });
        setHeaders((existing) => [...existing, ...result.data[0]]);

        setData((existing) => [...existing, ...withHeaders.data]);
      });
    }
  }, [files]);

  return (
    <>
      <div>
        {data.length > 0 &&
          (headers.length === 37 ? (
            <ReactTable
              data={result}
              columns={COLUMN}
              defaultPageSize={6}
              pageSizeOptions={[2, 4, 6]}
            />
          ) : (
            <div className="center" style={{ border: "2px solid red" }}>
              <p style={{ color: "red" }}>
                Column must be same Please ReUpload the file
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default UploadCsv;
