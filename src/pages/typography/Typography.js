import React from "react";
import { Grid } from "@material-ui/core";


// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import Table from '../dashboard/components/Table/Table'

export default function TypographyPage() {
  var classes = useStyles();

  return (


    <>
   <Grid item xs={10}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            
          </Widget>
        </Grid>
    </>
  );
}
