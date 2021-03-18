import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";


const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
         
            <TableCell ><strong>NOM</strong></TableCell>
            <TableCell ><strong>CATEGORIE</strong></TableCell>
            <TableCell ><strong>IMAGE</strong></TableCell>
            <TableCell ><strong>PRIX</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, price,categories ,image}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell className="pl-3 fw-normal">{categories[0].name}</TableCell>
            <TableCell className="pl-3 fw-normal"><img src={`http://localhost/Images/${image.name}`} style={{ width: '50%', maxHeight: '150px' }} /></TableCell>
            <TableCell className="pl-3 fw-normal">{price}</TableCell>
            
             
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
