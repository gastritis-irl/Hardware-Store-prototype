import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';

type SizeSelectorProps = {
  onStart: (size: number) => void;
};

export function SizeSelector(props: SizeSelectorProps) {
  const { onStart } = props;
  const [size, setSize] = useState(4);

  return (
    <div>
      <TextField
        label="Tábla mérete"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={size}
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            setSize(parseInt(e.target.value, 10));
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={() => onStart(size)}>
        Játék kezdése
      </Button>
    </div>
  );
}
