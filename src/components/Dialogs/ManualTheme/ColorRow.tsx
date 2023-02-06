import { TableCell, TableRow } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
  color: [key: string, value: string];
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorRow: React.FC<Props> = ({ color, handleBlur }) => {
  return (
    <TableRow>
      <TableCell>
        <input
          id={color[0]}
          name={color[0]}
          type="color"
          style={{ marginRight: '1rem', width: '25px', border: 'none', background: 'none' }}
          defaultValue={color[1]}
          onBlur={(e) => handleBlur(e)}
        /> 
        <label htmlFor={color[0]}>
          {color[0]}
        </label>
      </TableCell>
    </TableRow>
  );
};

export default ColorRow;
