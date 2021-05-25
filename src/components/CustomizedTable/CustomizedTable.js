import {
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { TableCell, withStyles } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#424642",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomizedTable = ({
  headItems,
  bodyItems,
  actions,
  maxHeight,
  select,
}) => {
  const classes = useStyles();
  // console.log(body);
  if (bodyItems.length === 0) {
    return <div>No such item</div>;
  }
  console.log(bodyItems);
  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: maxHeight }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headItems.map((headItem) => (
                <StyledTableCell key={headItem.id} align="left">
                  {headItem.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyItems.map((bodyItem) => (
              <TableRow onClick={() => select(bodyItem)}>
                {Object.keys(bodyItem).map((key, index) => (
                  <StyledTableCell key={bodyItem + key + index}>
                    {bodyItem[key]}
                  </StyledTableCell>
                ))}
                {actions && (
                  <StyledTableCell key={"btn"}>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      aria-label="contained primary button group"
                    >
                      <Button>
                        <Edit />
                      </Button>
                      <Button>
                        <Delete />
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomizedTable;
