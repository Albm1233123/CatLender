import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabaseClient";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

async function getPhoto(req: Request, res: Response): Promise<void> {
    // ya ya get photo
}

// upload photo
export const uploadPhoto = [
  upload.single("file"), 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const catId = req.params.catId as string;
      const file = req.file;

      if (!catId) {
        res.status(400).json({ error: "catId is required" });
        return;
      }

      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const { error: uploadError } = await supabase
        .storage
        .from("cats")
        .upload(`cats/${catId}.png`, file.buffer, { upsert: true });

      if (uploadError) {
        res.status(500).json({ error: uploadError.message });
        return;
      }

      const { data } = supabase
        .storage
        .from("cats")
        .getPublicUrl(`cats/${catId}.png`);

      if (!data || !data.publicUrl) {
        res.status(500).json({ error: "Failed to get public URL" });
        return;
      }

      res.status(200).json({ url: data.publicUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];