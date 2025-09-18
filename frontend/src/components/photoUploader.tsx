import { Button } from "@mui/material";
import React, { useState } from "react";

interface UploadPhotoProps {
  catId: string;
  currentPhotoUrl?: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ catId, currentPhotoUrl }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentPhotoUrl || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); 
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:3001/cats/${catId}/photo`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        alert("Upload successful!");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading photo");
    } finally {
      setLoading(false);
    }
  };

  //update photo pfp

  return (
    <div style={{ textAlign: "center" }}>
      <h4>Add photo to cat</h4>

      {preview && (
        <img
          src={preview}
          alt="Cat preview"
          style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "50%" }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="upload-photo-input"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-photo-input">
        <Button component="span" variant="contained">
          Choose Photo
        </Button>
      </label>
      <Button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default UploadPhoto;
