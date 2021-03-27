import React, { useMemo, useState } from "react";
import { parse } from "papaparse";

import "./UploadCsv.css";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/UIElements/Button";
const UploadCsv = () => {
  const [highlighted, setHighlighted] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const columns = useMemo(() => {
    const header = [];
    if (headers.length > 0) {
      headers.forEach((h) => {
        header.push({ Header: h, accessor: h });
      });
    }
    return header;
  }, [headers]);
  // const columns = [
  //   {
  //     Header: "Reference Number",
  //     accessor: "refern",
  //   },
  //   {
  //     Header: "Address Type",
  //     accessor: "addressType",
  //   },
  //   {
  //     Header: "Address",
  //     accessor: "add",
  //   },
  //   {
  //     Header: "Category",
  //     accessor: "category_of_goods",
  //   },
  //   {
  //     Header: "City",
  //     accessor: "city",
  //   },
  //   {
  //     Header: "Pin code",
  //     accessor: "pin",
  //   },
  //   {
  //     Header: "State",
  //     accessor: "state",
  //   },
  //   {
  //     Header: "Consignee Name",
  //     accessor: "client_name",
  //   },
  //   {
  //     Header: "Phone",
  //     accessor: "phone",
  //   },
  //   {
  //     Header: "Weight",
  //     accessor: "weight",
  //   },
  //   {
  //     Header: "Payment",
  //     accessor: "payment_mode",
  //   },
  //   {
  //     Header: "Package Amount",
  //     accessor: "total_amount",
  //   },
  //   {
  //     Header: "COD Amount",
  //     accessor: "code_amount",
  //   },
  //   {
  //     Header: "Product to be Shipped",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Return Address",
  //     accessor: "return_add",
  //   },
  //   {
  //     Header: "Return Pin",
  //     accessor: "return_pin",
  //   },
  //   {
  //     Header: "fragile_shipment",
  //     accessor: "fragile_shipment",
  //   },
  //   {
  //     Header: "Seller Name",
  //     accessor: "seller_name",
  //   },
  //   {
  //     Header: "Seller Address",
  //     accessor: "seller_add",
  //   },
  //   {
  //     Header: "Seller CST No",
  //     accessor: "seller_gst_tin",
  //   },
  //   {
  //     Header: "Seller TIN",
  //     accessor: "seller_tin",
  //   },
  //   {
  //     Header: "Invoice No",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Invoice Date",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Quantity",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Commodity Value",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Tax Value",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Category of Goods",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Seller_GST_TIN",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "HSN_Code",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Return Reason",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Vendor Pickup Location",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "EWBN",
  //     accessor: "email",
  //   },
  //   {
  //     Header: "Age",
  //     accessor: "email",
  //   },
  //
  // ];
  const result = useMemo(() => data, [data]);
  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              OKAY
            </Button>
          </React.Fragment>
        }
      >
        <p>Please Provide a CSV or Excel file</p>
      </Modal>
      <h1 className=".center">Contact Import</h1>
      <div
        className={`dropzone ${highlighted && "highlight"} `}
        onDragOver={(e) => {
          e.preventDefault();
          setHighlighted(true);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          setData([]);
          setHeaders([]);
          console.log(e.dataTransfer.files);
          Array.from(e.dataTransfer.files)
            // .filter(
            //   (file) =>
            //     file.type === "text/csv" ||
            //     "application/vnd.ms-excel" ||
            //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            // )
            .forEach(async (file) => {
              console.log(file.type === "application/vnd.ms-excel");
              const type =
                file.type === "text/csv" ||
                "application/vnd.ms-excel" ||
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                "application/vnd.ms-excel"
                  ? true
                  : false;
              console.log(type);
              if (!type) {
                showDeleteWarningHandler();
              } else {
                const text = await file.text();
                const result = parse(text);
                const withHeaders = parse(text, { header: true });
                setHeaders((existing) => [...existing, ...result.data[0]]);
                setData((existing) => [...existing, ...withHeaders.data]);
              }
            });
        }}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
      >
        <h1>{data.length > 0 && "YOU CAN ALSO "}DROP HERE</h1>

        <div>
          {data.length > 0 && (
            <ReactTable
              data={result}
              columns={columns}
              defaultPageSize={6}
              pageSizeOptions={[2, 4, 6]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UploadCsv;
