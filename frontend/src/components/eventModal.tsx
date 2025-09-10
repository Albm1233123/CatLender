import React, { useState, useEffect } from "react";
import { Modal, Box, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CatSelector from "../components/catSelector";
import { Cat } from "../types/cat";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  cats: Cat[];
  selectedCat: Cat | null;
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat | null>>;
  onAddEvent?: (catId: string, title: string, date: string, type: string, note?: string) => void;
}

function EventModal({ open, onClose, cats, selectedCat, setSelectedCat, onAddEvent }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // default today
  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!selectedCat && cats.length > 0) setSelectedCat(cats[0]);
  }, [cats, selectedCat, setSelectedCat]);

  const handleAddEvent = async () => {
    if (!selectedCat) return;

    if (!title || !date || !type) {
      setStatusMessage("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/api/events/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          catId: selectedCat.id,
          title,
          date,
          type,
          notes: note,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("Event added successfully!");
        if (onAddEvent) {
          onAddEvent(selectedCat.id, title, date, type, note);
        }
        setTitle("");
        setDate(new Date().toISOString().slice(0, 10));
        setType("");
        setNote("");
        onClose();
      } else {
        setStatusMessage(result.error || "Event addition failed");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      setStatusMessage("Server error");
    }
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cats.length > 0 && selectedCat && (
            <CatSelector cats={cats} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
          )}

          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth size="small" />
          <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth size="small" />
          <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth size="small" />
          <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} fullWidth size="small" />

          <Button variant="contained" onClick={handleAddEvent}>Add Event</Button>

          {statusMessage && <Box sx={{ mt: 1, color: "red" }}>{statusMessage}</Box>}
        </Box>
      </Box>
    </Modal>
  );
}

export default EventModal;
