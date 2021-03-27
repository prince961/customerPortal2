
import React from "react";
import { parse } from "papaparse";
import { useDropzone } from 'react-dropzone';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";






const UploadCsv = () => {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
   // { email: "fake@gmail.com", name: "Fake", phone: "100" },
  ]);
  const columns = [{
    Header: 'Reference Number',
    accessor: 'refern'
  }, {
    Header: 'Address Type',
    accessor: 'addressType'
  }, {
    Header: 'Address',
    accessor: 'add'
  },
  {
    Header: 'City',
    accessor: 'city'
  },
  {
    Header: 'Pin code',
    accessor: 'pin'
  },
  {
    Header: 'State',
    accessor: ''
  },
  {
    Header: 'Consignee Name',
    accessor: 'email'
  },
  {
    Header: 'Phone',
    accessor: 'email'
  },
  {
    Header: 'Weight',
    accessor: 'email'
  },
  {
    Header: 'Payment',
    accessor: 'email'
  },
  {
    Header: 'Package Amount',
    accessor: 'email'
  },
  {
    Header: 'COD Amount',
    accessor: 'email'
  },
  {
    Header: 'Product to be Shipped',
    accessor: 'email'
  },
  {
    Header: 'Return Address',
    accessor: 'email'
  },
  {
    Header: 'Return Pin',
    accessor: 'email'
  },
  {
    Header: 'fragile_shipment',
    accessor: 'email'
  },
  {
    Header: 'Seller Name',
    accessor: 'email'
  },
  {
    Header: 'Seller Address',
    accessor: 'email'
  },
  {
    Header: 'Seller CST No',
    accessor: 'email'
  },
  {
    Header: 'Seller TIN',
    accessor: 'email'
  },
  {
    Header: 'Invoice No',
    accessor: 'email'
  },
  {
    Header: 'Invoice Date',
    accessor: 'email'
  },
  {
    Header: 'Quantity',
    accessor: 'email'
  },
  {
    Header: 'Commodity Value',
    accessor: 'email'
  },
  {
    Header: 'Tax Value',
    accessor: 'email'
  },
  {
    Header: 'Category of Goods',
    accessor: 'email'
  },
  {
    Header: 'Seller_GST_TIN',
    accessor: 'email'
  },
  {
    Header: 'HSN_Code',
    accessor: 'email'
  },
  {
    Header: 'Return Reason',
    accessor: 'email'
  },
  {
    Header: 'Vendor Pickup Location',
    accessor: 'email'
  },
  {
    Header: 'EWBN',
    accessor: 'email'
  },
  {
    Header: 'Age',
    accessor: 'email'
  },
  {
    Header: 'Age',
    accessor: 'email'
  },
  ]

  return (
    <div>
      <h1 className="text-center text-4xl">Contact Import</h1>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
          }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, { header: true });
              setContacts((existing) => [...existing, ...result.data]);
            });
        }}
      >
        DROP HERE
      </div>



      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            <strong>{contact.name}</strong>: {contact.email, contact.phone}
          </li>
        ))}
      </ul>

      <div>
        <ReactTable
          data={contacts}
          columns={columns}
        //defaultPageSize = {contacts.length}  
        //pageSizeOptions = {[2,4, 6]}  
        />
      </div>

    </div>




  );
}



export default UploadCsv;