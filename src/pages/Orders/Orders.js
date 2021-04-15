import React, { useEffect } from "react";

import { useMediaQuery, useTheme } from "@material-ui/core";
import CustomizedTable from "../../components/CustomizedTable/CustomizedTable";
import CustomizedAccordion from "../../components/CustomizedAccordian/CustomizedAccordian";
import { userOrdersFetch } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

function createData(
  orderId,
  waybill,
  company,
  consignee,
  type,
  pickedOn,
  statusType,
  status
) {
  return {
    orderId,
    waybill,
    company,
    consignee,
    type,
    pickedOn,
    statusType,
    status,
  };
}

const body = [
  createData(
    1,
    8436410000022,
    "Delhivery",
    "Pravin malik",
    "Pre-paid",
    "2/11/21, 2:35 PM",
    "Delivered",
    "Delivered"
  ),
  createData(
    4,
    8436410000033,
    "DTDC",
    "Prashant singh",
    "Pre-paid",
    "2/10/21, 6:34 PM",
    "Delivered",
    "Delivered"
  ),
  createData(
    7,
    8436410000011,
    "Delhivery",
    "Pravin Malik",
    "Pre-paid",
    "2/4/21, 1:19 PM",
    "Undelivered",
    "Not Picked"
  ),
  createData(
    9,
    8436410000044,
    "Delhivery",
    "Rahul yadav",
    "COD",
    "2/11/21, 2:35 PM",
    "Undelivered",
    "Not Picked"
  ),
];
const head = [
  { id: "id", label: "Order Id" },
  { id: "waybill", label: "Waybill" },
  { id: "company", label: "Company" },
  { id: "consignee", label: "Consignee" },
  { id: "type", label: "type" },
  { id: "picked", label: "Picked On" },
  { id: "statusType", label: "Status Type" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

const Orders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.userOrders);
  useEffect(() => {
    dispatch(userOrdersFetch(1));
  }, [dispatch]);
  console.log(userOrders.orders);
  // if (userOrders.orders.length !== 0) {
  //   userOrders.orders.map((order) =>
  //     Object.keys(order).map((key) => console.log(order[key]))
  //   );
  // }
  return (
    <>
      <h1>Orders</h1>
      <CustomizedTable headItems={head} bodyItems={body} actions />
    </>
  );
};
export default Orders;
