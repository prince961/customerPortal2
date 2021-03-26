import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/useHttpClient";
import GetPincodeDetails from "../../shared/util/GetPincodeDetails";
import { useDropzone } from "react-dropzone";
import base64 from "base-64";
const Create = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  var consigneePincodeEntered = false;
  const [title, setTitle] = useState("1");
  const [body, setBody] = useState("1");
  const [author, setAuthor] = useState("mario");
  const history = useHistory();
  const codType = "Prepaid";
  const userID = "API logistics";

  /*
  
  const [returnState,setReturnState] = useState('');
  const [returnCity,setReturnCity] = useState('');*/
  const [paymentMode, setPaymentMode] = useState("prepaid");
  const [consigneePincode, setConsigneePincode] = useState();
  const [consigneeCity, setConsigneeCity] = useState("null");
  const [consigneeState, setConsigneeState] = useState("null");
  const [consigneeAddress, setConsigneeAddress] = useState("null");
  const [consigneeName, setConsigneeName] = useState("null");
  const [consigneePhone, setConsigneePhone] = useState("7045814007");
  const [consigneeEmail, setConsigneeEmail] = useState("null");

  //orderDetails
  const [orderReferenceNumber, setOrderReferenceNumber] = useState("null");
  const [orderNumberOfItems, setNumberOfItems] = useState(1);
  const [orderWeightInGrams, setOrderWeightInGrams] = useState(500);
  const [orderCommodityValue, setCommodityValue] = useState("null");
  const [orderTaxValue, setTaxValue] = useState("null");
  const [orderTotalValue, setTotalValue] = useState("null");
  const [orderCODValue, setCODValue] = useState("null");
  const [orderProductDescription, setOrderProductDescription] = useState(
    "null"
  );
  const [orderProductCategory, setOrderProductCategory] = useState("null");
  const [orderHSNCode, setOrderHSNCode] = useState("null");
  const [orderMarkAsFragile, setOrderMarkAsFragile] = useState(false);

  //sellerDetails
  const [
    sellerDetailsSameAsRegistered,
    setSellerDetailsSameAsRegistered,
  ] = useState(true);
  const [sellerName, setSellerName] = useState("null");
  const [sellerGSTIN, setSellerGSTIN] = useState("null");
  const [sellerAddress, setSellerAddress] = useState("null");
  const [invoiceNumer, setInvoicenumber] = useState("null");

  //gettingTodaysdate
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "/" + dd + "/" + mm;
  const [invoiceDate, setInvoiceDate] = useState(today);

  //pickupDetails
  const [pickupPincode, setPickupPincode] = useState("null");
  const [pickupCity, setPickupCity] = useState("null");
  const [pickupState, setPickupState] = useState("null");
  const [pickupAddress, setPickupAddress] = useState("null");
  const [pickupPhone, setPickupPhone] = useState("null");

  //ReturnDetails
  const [returnPincode, setReturnPincode] = useState("null");
  const [returnCity, setReturnCity] = useState("null");
  const [returnState, setReturnState] = useState("null");
  const [returnAddress, setReturnAddress] = useState("null");
  const [returnPhone, setReturnPhone] = useState("null");
  const [returnToOrigin, setReturnToOrigin] = useState(true);

  //const { id } = useParams();
  //const { data, error, isPending } = useFetch('http://localhost:9000/pincode/122002');
  //console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    convertFormToJson();
    /*
    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      // history.go(-1);
      history.push('/');
    })*/
  };

  const convertFormToJson = () => {
    //shipmentObject
    const shipment = {
      addressType: "Home",
    };
    shipment.add = consigneeAddress;
    shipment.phone = consigneePhone;
    shipment.payment_mode = codType;
    shipment.name = consigneeName;
    shipment.pin = consigneePincode;
    shipment.order = orderReferenceNumber;
    shipment.consignee_gst_amount = orderTotalValue;
    shipment.integrated_gst_amount = orderTotalValue;
    shipment.seller_gst_tin = sellerGSTIN;
    shipment.gst_cess_amount = orderTaxValue;
    shipment.client_name = userID;
    shipment.tax_value = orderTaxValue;
    shipment.seller_tin = sellerGSTIN;
    shipment.seller_gst_amount = orderTaxValue;
    shipment.seller_inv = invoiceNumer;
    shipment.city = consigneeCity;
    shipment.commodity_value = orderCommodityValue;
    shipment.weight = orderWeightInGrams;
    shipment.return_state = returnState;
    shipment.seller_name = sellerName;
    shipment.fragile_shipment = orderMarkAsFragile;
    shipment.return_city = returnCity;
    shipment.return_phone = returnPhone;
    shipment.category_of_goods = orderProductCategory;
    shipment.cod_amount = orderCODValue;
    shipment.return_country = "India";
    shipment.state = consigneeState;
    shipment.dangerous_good = false;
    shipment.order_date = invoiceDate;
    shipment.return_add = returnAddress;
    shipment.total_amount = orderTotalValue;
    shipment.seller_add = sellerAddress;
    shipment.country = "India";
    shipment.return_pin = returnPincode;
    shipment.return_name = sellerName;
    shipment.quantity = orderNumberOfItems;

    //pickupObject
    const pickup_location = {
      name: "mohit",
      country: "India",
      phone: "7045814007",
    };
    pickup_location.city = pickupCity;
    pickup_location.address = pickupAddress;
    pickup_location.pincode = pickupPincode;
    console.log(JSON.stringify(pickup_location));

    var shipmentString = JSON.stringify(shipment);

    console.log("ShipmentString: " + shipmentString);
    var shipmentObject = shipmentString.slice(11);
    console.log(shipmentObject);
    const jsonObjectForServer = { shipments: [JSON.parse(shipmentString)] };

    jsonObjectForServer.pickup_location = pickup_location;
    console.log(JSON.stringify(jsonObjectForServer));

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + btoa("Mohit:Same"));
    console.log(headers.get("Authorization"));

    fetch("http://api.apilogistics.in:4000/api/orders", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonObjectForServer),
    }).then(async (response) => {
      try {
        const data = await response.text();
        console.log("response data?", data);
      } catch (error) {
        console.log("Error happened here!");
        console.error(error);
      }
    });

    //"{\"shipments\":[{\"add\":\"M25,NelsonMarg\",\"address_type\":\"home\",\"phone\":1234567890,\"payment_mode\":\"Prepaid\/COD\/Pickup\/REPL\",\"name\":\"name-of-the-consignee\",\"pin\":325007,\"order\":\"orderid\",\"consignee_gst_amount\":\"for ewaybill-incase of intra-state required only\",\"integrated_gst_amount\":\"for ewaybill-incase of intra-state required only\",\"ewbn\":\"if ewbn is there no need to send additional keys for generating ewaybill only if the total package amount is greater than or equal to 50k\",\"consignee_gst_tin\":\"consignee_gst_tin\",\"seller_gst_tin\":\"seller_gst_tin\",\"client_gst_tin\":\"client_gst_tin\",\"hsn_code\":\"Required for ewaybill-hsn_code\",\"gst_cess_amount\":\"for ewaybill-gst_cess_amount\",\"client\":\"client-name-as-registered-with-delhivery\",\"tax_value\":\"taxvalue\",\"seller_tin\":\"sellertin\",\"seller_gst_amount\":\"for ewaybill-incase of intra-state required only\",\"seller_inv\":\"sellerinv\",\"city\":\"Kota\",\"commodity_value\":\"commodityvalue\",\"weight\":\"1000\",\"return_state\":\"returnstate\",\"document_number\":\"for ewaybill-document_number,only mandatory in case of ewbn\",\"od_distance\":\"ditance between origin and destination\",\"sales_tax_form_ack_no\":\"ackno.\",\"document_type\":\"for ewaybill-document_type,only mandatory in case of ewbn\",\"seller_cst\":\"sellercst\",\"seller_name\":\"sellername\",\"fragile_shipment\":\"true\",\"return_city\":\"returncity\",\"return_phone\":\"returnphone\",\"qc\":{\"item\":[{\"images\":\"img1-static image url\",\"color\":\"Color of the product\",\"reason\":\"Damaged Product\/Return reason of the product\",\"descr\":\"description of the product\",\"ean\":\"EAN no. that needs to be checked for a product (apparels)\",\"imei\":\"IMEI no. that needs to be checked for a product (mobile phones)\",\"brand\":\"Brand of the product\",\"pcat\":\"Product category like mobile, apparels etc.\",\"si\":\"special instruction for FE\"}]},\"shipment_height\":10,\"shipment_width\":11,\"shipment_length\":12,\"category_of_goods\":\"categoryofgoods\",\"cod_amount\":2125,\"return_country\":\"returncountry\",\"document_date\":\"for ewaybill-datetime,mandatory in case of ewbn\",\"taxable_amount\":\"for ewaybill-taxable_amount in case of multiple items only\",\"products_desc\":\"for ewaybill-mandatory,incase of intra-state required only\",\"state\":\"Rajasthan\",\"dangerous_good\":\"True\/False\",\"waybill\":\"waybillno.(trackingid)\",\"consignee_tin\":\"consigneetin\",\"order_date\":\"2017-05-20 12:00:00\",\"return_add\":\"returnaddress\",\"total_amount\":21840,\"seller_add\":\"selleradd\",\"country\":\"India\",\"return_pin\":\"returnpin\",\"extra_parameters\":{\"return_reason\":\"string\"},\"return_name\":\"name\",\"supply_sub_type\":\"for ewaybill-supply_sub_type,mandatory in case of ewbn\",\"plastic_packaging\":\"true\/false\",\"quantity\":\"quantity\"}],\"pickup_location\":{\"name\":\"client-warehouse-name-as-registered-with-delhivery\",\"city\":\"city\",\"pin\":\"pin-code\",\"country\":\"country\",\"phone\":\"phoneno.\",\"add\":\"+}}"
  };

  const handleConsigneePincode = async (event) => {
    const userName = "Mohit";
    const pass = "Same";
    console.log(event.target.value);
    var consigneePincode = event.target.value;
    if (consigneePincode > 100000) {
      setConsigneePincode(consigneePincode);
      // try {
      //   const data = await fetch(`http://localhost:4000/api/pincode/201001`);
      //   console.log(data.body);
      //   setConsigneeCity(data.CITY);
      //   setConsigneeState(data.STATE);
      //   console.log("city:" + data.CITY);
      // } catch (err) {
      //   if (err.name === "AbortError") {
      //     console.log("fetch aborted");
      //   } else {
      //     // auto catches network / connection error
      //     //setIsPending(false);
      //     //setError(err.message);
      //     console.log(err.message);
      //   }
      // }
      try {
        const data = await sendRequest(
          `http://localhost:4000/api/pincode/${consigneePincode}`,
          "GET",
          null,
          { Authorization: "Basic " + base64.encode(`${userName}:${pass}`) }
        );

        setConsigneeCity(data.body[0].CITY);
        setConsigneeState(data.body[0].STATE);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReturnPincode = async (event) => {
    const userName = "Mohit";
    const pass = "Same";
    console.log(event.target.value);
    var returnPincode = event.target.value;
    if (returnPincode > 100000) {
      setReturnPincode(returnPincode);
      try {
        const data = await sendRequest(
          `http://localhost:4000/api/pincode/${consigneePincode}`,
          "GET",
          null,
          { Authorization: "Basic " + base64.encode(`${userName}:${pass}`) }
        );

        setConsigneeCity(data.body[0].CITY);
        setConsigneeState(data.body[0].STATE);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePickupPincode = async (event) => {
    const userName = "Mohit";
    const pass = "Same";
    console.log(event.target.value);
    var pickupPincode = event.target.value;
    if (pickupPincode > 100000) {
      setPickupPincode(pickupPincode);
      // fetch("http://localhost:9000/pincode/" + pickupPincode)
      //   .then((res) => {
      //     //console.log(res.json());
      //     return res.json();
      //   })
      //   .then((data) => {
      //     setPickupCity(data.CITY);
      //     setPickupState(data.STATE);
      //     console.log("city:" + data.CITY);
      //   })
      //   .catch((err) => {
      //     if (err.name === "AbortError") {
      //       console.log("fetch aborted");
      //     } else {
      //       // auto catches network / connection error
      //       //setIsPending(false);
      //       //setError(err.message);
      //       console.log(err.message);
      //     }
      //   });
      try {
        const data = await sendRequest(
          `http://localhost:4000/api/pincode/${consigneePincode}`,
          "GET",
          null,
          { Authorization: "Basic " + base64.encode(`${userName}:${pass}`) }
        );

        setConsigneeCity(data.body[0].CITY);
        setConsigneeState(data.body[0].STATE);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCommodityValue = (event) => {
    console.log(event.target.value);
    var commodity_value = event.target.value;
    setTaxValue(commodity_value * 0.18);
    setTotalValue(commodity_value * 1.18);
    setCODValue(commodity_value * 1.18);
  };

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    );
  }

  /*
  const { error, isPending, data } = useFetch('http://localhost:9000/pincode/'+122002);
    var cityFromPincode = data.CITY;
    setConsigneeCity(cityFromPincode);*/

  return (
    <div className="create">
      <h2>Book a new shipment</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        <label>Forward/Reverse Type:</label>
        <select>
          <option value="Forward" selected>
            {" "}
            Forward
          </option>
          <option value="Reverse">Reverse</option>
        </select>

        <label>COD Type:</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="COD">COD</option>
          <option value="Prepaid" selected>
            Prepaid
          </option>
        </select>
        <h2>Consignee(To) Details</h2>
        <div className="flexbox-container">
          <div className="customer-details-left">
            <label>Consignee pincode*</label>
            <input
              type="number"
              min="100000"
              max="999999"
              required
              //value = {consigneePincode}
              onChange={handleConsigneePincode}
            ></input>

            <label>Consignee State*</label>
            <select value={consigneeState}>
              <option selected value></option>
              <option value="DELHI">DELHI</option>
              <option value="HARYANA">HARYANA</option>
              <option value="KARNATAKA">KARNATAKA</option>
              <option value="PUNJAB">PUNJAB</option>
              <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
              <option value="UTTAR PRADESH">UTTAR PRADESH</option>
              <option value="CHANDIGARH">CHANDIGARH</option>
              <option value="MAHARASHTRA">MAHARASHTRA</option>
              <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>
              <option value="JAMMU AND KASHMIR">JAMMU AND KASHMIR</option>
              <option value="UTTARAKHAND">UTTARAKHAND</option>
              <option value="RAJASTHAN">RAJASTHAN</option>
              <option value="ASSAM">ASSAM</option>
              <option value="GUJARAT">GUJARAT</option>
              <option value="TAMIL NADU">TAMIL NADU</option>
              <option value="GOA">GOA</option>
              <option value="CHHATTISGARH">CHHATTISGARH</option>
              <option value="MADHYA PRADESH">MADHYA PRADESH</option>
              <option value="TELANGANA">TELANGANA</option>
              <option value="PONDICHERY">PONDICHERY</option>
              <option value="KERALA">KERALA</option>
              <option value="WEST BENGAL">WEST BENGAL</option>
              <option value="MANIPUR">MANIPUR</option>
              <option value="SIKKIM">SIKKIM</option>
              <option value="BIHAR">BIHAR</option>
              <option value="ANDAMAN & NICOBAR">ANDAMAN & NICOBAR</option>
              <option value="ORISSA">ORISSA</option>
              <option value="NAGALAND">NAGALAND</option>
              <option value="ARUNACHAL PRADESH">ARUNACHAL PRADESH</option>
              <option value="MEGHALAYA">MEGHALAYA</option>
              <option value="TRIPURA">TRIPURA</option>
              <option value="JHARKHAND">JHARKHAND</option>
              required
            </select>

            <label>Consignee City*</label>
            <input type="text" value={consigneeCity} required></input>

            <label>Consignee Address*</label>
            <input
              type="text"
              required
              value={consigneeAddress}
              onChange={(e) => setConsigneeAddress(e.target.value)}
            />
          </div>
          <div className="customer-details-right">
            <label>Consignee Name*</label>
            <input
              type="text"
              required
              value={consigneeName}
              onChange={(e) => setConsigneeName(e.target.value)}
            />

            <label>Consignee Phone*</label>
            <input
              type="number"
              required
              value={consigneePhone}
              onChange={(e) => setConsigneePhone(e.target.value)}
            />

            <label>Consignee Email</label>
            <input
              type="text"
              value={consigneeEmail}
              onChange={(e) => setConsigneeEmail(e.target.value)}
            />
          </div>
        </div>

        <h2>Order Details</h2>
        <div className="flexbox-container">
          <div className="customer-details-left">
            <label>Reference number*</label>
            <input
              type="text"
              required
              value={orderReferenceNumber}
              onChange={(e) => setOrderReferenceNumber(e.target.value)}
            ></input>
            <label>Number of items*</label>
            <input
              type="number"
              defaultValue="1"
              required
              value={orderNumberOfItems}
              onChange={(e) => setNumberOfItems(e.target.value)}
            ></input>

            <label>Weight in Grams*</label>
            <input
              type="number"
              required
              value={orderWeightInGrams}
              onChange={(e) => setOrderWeightInGrams(e.target.value)}
            />
          </div>
          <div className="customer-details-mid">
            <label>Commodity Value*</label>
            <input
              type="number"
              required
              //value = {orderCommodityValue}
              onChange={handleCommodityValue}
            ></input>

            <label>Tax Value*</label>
            <input
              type="number"
              required
              value={orderTaxValue}
              onChange={(e) => setTaxValue(e.target.value)}
            ></input>

            <label>Total Value*</label>
            <input
              type="number"
              required
              value={orderTotalValue}
              onChange={(e) => setTotalValue(e.target.value)}
            ></input>

            <label>COD Amount*</label>
            <input
              type="number"
              required
              value={orderCODValue}
              onChange={(e) => setCODValue(e.target.value)}
            />
          </div>
          <div className="customer-details-right">
            <label>Product Description*</label>
            <input
              type="text"
              required
              value={orderProductDescription}
              onChange={(e) => setOrderProductDescription(e.target.value)}
            />

            <label>Product Category*</label>
            <input
              type="text"
              required
              value={orderProductCategory}
              onChange={(e) => setOrderProductCategory(e.target.value)}
            />

            <label>Mark as fragile</label>
            <input
              value={orderMarkAsFragile}
              type="checkbox"
              onChange={(e) => setOrderMarkAsFragile(e.target.value)}
            />

            <label>HSN Code</label>
            <input
              type="text"
              value={orderHSNCode}
              onChange={(e) => setOrderHSNCode(e.target.value)}
            />
          </div>
        </div>

        <h2>Seller Details</h2>
        <div className="flexbox-container">
          <div className="customer-details-left">
            <label>Is the seller details same as registered details?</label>
            <select
              onChange={(e) => setSellerDetailsSameAsRegistered(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false} selected>
                No
              </option>
            </select>
          </div>
          <div className="customer-details-mid">
            <label>Seller Name*</label>
            <input
              type="text"
              required
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            ></input>

            <label>Seller Address*</label>
            <textarea
              type="text"
              required
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
            ></textarea>

            <label>Seller GSTIN</label>
            <input
              type="text"
              size="15"
              value={sellerGSTIN}
              onChange={(e) => setSellerGSTIN(e.target.value)}
            ></input>
          </div>

          <div className="customer-details-right">
            <label>Invoice number</label>
            <input
              type="text"
              value={invoiceNumer}
              onChange={(e) => setInvoicenumber(e.target.value)}
            />

            <label>Invoice date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
        </div>

        <h2>Pickup and Return Details</h2>
        <div className="flexbox-container">
          <div className="customer-details-left"></div>
          <div className="customer-details-mid">
            <label>Pickup Address</label>
            <select></select>

            <label>pickup pincode*</label>
            <input
              type="number"
              min="100000"
              max="999999"
              required
              onChange={handlePickupPincode}
            ></input>

            <label>Pickup State*</label>
            <select
              value={pickupState}
              onChange={(e) => setPickupState(e.target.value)}
            >
              <option hidden disabled selected value></option>
              <option selected value></option>
              <option value="DELHI">DELHI</option>
              <option value="HARYANA">HARYANA</option>
              <option value="KARNATAKA">KARNATAKA</option>
              <option value="PUNJAB">PUNJAB</option>
              <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
              <option value="UTTAR PRADESH">UTTAR PRADESH</option>
              <option value="CHANDIGARH">CHANDIGARH</option>
              <option value="MAHARASHTRA">MAHARASHTRA</option>
              <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>
              <option value="JAMMU AND KASHMIR">JAMMU AND KASHMIR</option>
              <option value="UTTARAKHAND">UTTARAKHAND</option>
              <option value="RAJASTHAN">RAJASTHAN</option>
              <option value="ASSAM">ASSAM</option>
              <option value="GUJARAT">GUJARAT</option>
              <option value="TAMIL NADU">TAMIL NADU</option>
              <option value="GOA">GOA</option>
              <option value="CHHATTISGARH">CHHATTISGARH</option>
              <option value="MADHYA PRADESH">MADHYA PRADESH</option>
              <option value="TELANGANA">TELANGANA</option>
              <option value="PONDICHERY">PONDICHERY</option>
              <option value="KERALA">KERALA</option>
              <option value="WEST BENGAL">WEST BENGAL</option>
              <option value="MANIPUR">MANIPUR</option>
              <option value="SIKKIM">SIKKIM</option>
              <option value="BIHAR">BIHAR</option>
              <option value="ANDAMAN & NICOBAR">ANDAMAN & NICOBAR</option>
              <option value="ORISSA">ORISSA</option>
              <option value="NAGALAND">NAGALAND</option>
              <option value="ARUNACHAL PRADESH">ARUNACHAL PRADESH</option>
              <option value="MEGHALAYA">MEGHALAYA</option>
              <option value="TRIPURA">TRIPURA</option>
              <option value="JHARKHAND">JHARKHAND</option>
              required
            </select>

            <label>Pickup City*</label>
            <input
              type="text"
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              required
            />

            <label>Pickup Address*</label>
            <textarea
              type="text"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
          </div>

          <div className="customer-details-right">
            <label>Return to Origin:</label>
            <select
              value={returnToOrigin}
              onChange={(e) => setReturnToOrigin(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Return pincode*</label>
            <input
              type="number"
              min="100000"
              max="999999"
              required
              onChange={handleReturnPincode}
            ></input>

            <label>Return State*</label>
            <select value={returnState}>
              <option selected value></option>
              <option value="DELHI">DELHI</option>
              <option value="HARYANA">HARYANA</option>
              <option value="KARNATAKA">KARNATAKA</option>
              <option value="PUNJAB">PUNJAB</option>
              <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
              <option value="UTTAR PRADESH">UTTAR PRADESH</option>
              <option value="CHANDIGARH">CHANDIGARH</option>
              <option value="MAHARASHTRA">MAHARASHTRA</option>
              <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>
              <option value="JAMMU AND KASHMIR">JAMMU AND KASHMIR</option>
              <option value="UTTARAKHAND">UTTARAKHAND</option>
              <option value="RAJASTHAN">RAJASTHAN</option>
              <option value="ASSAM">ASSAM</option>
              <option value="GUJARAT">GUJARAT</option>
              <option value="TAMIL NADU">TAMIL NADU</option>
              <option value="GOA">GOA</option>
              <option value="CHHATTISGARH">CHHATTISGARH</option>
              <option value="MADHYA PRADESH">MADHYA PRADESH</option>
              <option value="TELANGANA">TELANGANA</option>
              <option value="PONDICHERY">PONDICHERY</option>
              <option value="KERALA">KERALA</option>
              <option value="WEST BENGAL">WEST BENGAL</option>
              <option value="MANIPUR">MANIPUR</option>
              <option value="SIKKIM">SIKKIM</option>
              <option value="BIHAR">BIHAR</option>
              <option value="ANDAMAN & NICOBAR">ANDAMAN & NICOBAR</option>
              <option value="ORISSA">ORISSA</option>
              <option value="NAGALAND">NAGALAND</option>
              <option value="ARUNACHAL PRADESH">ARUNACHAL PRADESH</option>
              <option value="MEGHALAYA">MEGHALAYA</option>
              <option value="TRIPURA">TRIPURA</option>
              <option value="JHARKHAND">JHARKHAND</option>
              required
            </select>

            <label>Return City*</label>
            <input type="text" value={returnCity} required />

            <label>Return Address*</label>
            <textarea
              type="text"
              required
              value={returnAddress}
              onChange={(e) => setReturnAddress(e.target.value)}
            />
          </div>
        </div>

        <button>Add shipment</button>
      </form>
    </div>
  );
};

export default Create;
