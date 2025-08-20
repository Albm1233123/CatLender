import React from 'react';
import { Select, MenuItem, Avatar, Typography, Box } from '@mui/material';

type Cat = {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  avatar: string;
};

type CatSelectorProps = {
  cats: Cat[];
  selectedCat: Cat | null;
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat | null>>;
};

function CatSelector({ cats, selectedCat, setSelectedCat }: CatSelectorProps) {

  const handleChange = (event: any) => {
    const selected = cats.find(cat => cat.id === event.target.value);
    if (selected) setSelectedCat(selected);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography variant="h6" gutterBottom>
        Selected Cat: {selectedCat?.name ?? 'None'}
      </Typography>

      <Select
        fullWidth
        value={selectedCat?.id ?? ''}
        onChange={handleChange}
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {selectedCat ? (
              <>
                <Avatar src={selectedCat.avatar} alt={selectedCat.name} />
                <Typography>{selectedCat.name}</Typography>
              </>
            ) : (
              <Typography>None</Typography>
            )}
          </Box>
        )}
      >
        {cats.map(cat => (
          <MenuItem key={cat.id} value={cat.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={cat.avatar} alt={cat.name} />
              <Typography>{cat.name} ({cat.breed})</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default CatSelector;
