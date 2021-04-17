import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import CustomizedTable from "../CustomizedTable/CustomizedTable";
const useStyles = makeStyles({
  scanList: {
    margin: 4,
    padding: "8 0",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "50px",
  },
});
const head = [
  { id: "status", label: "Status" },
  { id: "scan-info", label: "Scan Info" },
  { id: "remarks", label: "Remarks" },
];
const createBody = (status, info, remarks) => ({ status, info, remarks });
const TrackScans = ({ Shipment: { Scans } }) => {
  const classes = useStyles();
  console.log(Scans);
  const body = [];
  if (Scans.length > 0) {
    Scans.forEach((scan) => {
      const { Scan, ScanDateTime, ScannedLocation } = scan.ScanDetail;
      body.push(createBody(Scan, ScanDateTime, ScannedLocation));
    });
  }
  return (
    <Paper className={classes.scanList}>
      <div className={classes.header}>
        <Typography variant="h5">Detailed Scans</Typography>
      </div>

      <CustomizedTable headItems={head} bodyItems={body} maxHeight={400} />
    </Paper>
  );
};

export default TrackScans;
