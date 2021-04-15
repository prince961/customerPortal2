import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";

const TrackData = ({ Shipment }) => {
  console.log(Shipment);
  const renderDetails = (Shipment) => (
    <>
      <Typography variant="h4">Order Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          AWB - {Shipment.AWB}
        </Grid>
        <Grid item xs={12}>
          Sender Name - {Shipment.SenderName}
        </Grid>
        <Grid item xs={12}>
          Status - {Shipment.Status.Status}
        </Grid>
        <Grid item xs={12}>
          Order Type - {Shipment.OrderType}
        </Grid>
        <Grid item xs={12}>
          Reciever Name - {Shipment.Consignee.Name}
          <br />
          Reciever Country - {Shipment.Consignee.Country}
          <br />
          Reciever City - {Shipment.Consignee.City}
          <br />
          Reciever Pincode - {Shipment.Consignee.Pincode}
          <br />
          Reciever Address1 - {Shipment.Consignee.Address1}
        </Grid>
      </Grid>
    </>
  );

  return <Paper style={{ padding: 16 }}>{renderDetails(Shipment)}</Paper>;
};

export default TrackData;
