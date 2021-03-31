import React, { useState } from "react";
import "./Dropzone.css";
const Dropzone = ({ setFile, setModal, setSelecting, setSingle }) => {
  const [highlighted, setHighlighted] = useState(false);

  const [error, setError] = useState(false);
  const onDragHandler = () => {
    setModal(false);
    setSelecting(true);
    setSingle(false);
  };

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

  return (
    <div
      className={`dropzone ${highlighted && "highlight"} `}
      onDragOver={(e) => {
        e.preventDefault();
        setHighlighted(true);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setHighlighted(false);

        Array.from(e.dataTransfer.files).forEach((file) => {
          console.log(file.type === "application/vnd.ms-excel");
          const type =
            file.type === "text/csv" ||
            "application/vnd.ms-excel" ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            "application/vnd.ms-excel"
              ? true
              : false;
          if (!type) {
            setError(true);
            return;
          } else {
            setFile(file);
            onDragHandler();
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
      <h1>DROP HERE</h1>
      {error && <p>Please Upload a CSV or excel file</p>}
    </div>
  );
};

export default Dropzone;
