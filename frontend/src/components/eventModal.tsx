import React, { useState, useEffect } from "react";
import { Modal, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CatSelector from "../components/catSelector";

export type Cat = {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  avatar: string;
};

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  cats: Cat[];
  selectedCat: Cat | null;
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat | null>>;
  onAddEvent: (catId: number, title: string, date: string, type: string, note?: string) => void;
}

function EventModal({ open, onClose, cats, selectedCat, setSelectedCat, onAddEvent }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");

  // Update selectedCat if cats change
  useEffect(() => {
    if (!selectedCat && cats.length > 0) setSelectedCat(cats[0]);
  }, [cats, selectedCat, setSelectedCat]);

  const handleAddEvent = () => {
    if (!selectedCat) return;
    onAddEvent(selectedCat.id, title, date, type, note);
    setTitle("");
    setDate("");
    setType("");
    setNote("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: 2, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <h2>Add Event</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {cats.length > 0 && selectedCat && (
            <CatSelector cats={cats} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
          )}

          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth size="small" />
          <TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth size="small" />
          <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth size="small" />
          <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} fullWidth size="small" />

          <Button variant="contained" onClick={handleAddEvent}>Add Event</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventModal;
