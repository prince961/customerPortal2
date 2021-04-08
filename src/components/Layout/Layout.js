import React from "react";
import Navigation from "../Navigation/Navigation";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const SideMenuItems = [
    { name: "Your Orders", icon: "shipping-fast", route: "orders" },
    { name: "Dashboard", icon: "chart-pie", route: "dashboard" },
    { name: "Rate Calculator", icon: "calculator", route: "rate" },

    { name: "Order Tracking", icon: "truck-moving", route: "track" },
  ];

  return (
    <div className={classes.root}>
      <Navigation items={SideMenuItems} />;
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
