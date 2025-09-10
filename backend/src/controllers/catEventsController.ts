import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

// Types
interface CatEventBody {
  catId: string;
  title: string;
  date: string;
  type: string;
  notes?: string;
}

// Get events
async function getEvent(req: Request, res: Response): Promise<void> {
  try {

    const { data, error } = await supabase
      .from('catevents')
      .select('*')

    if (error) {
      console.error('Supabase fetch error:', error);
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ catEvents: data });
  } catch (error) {
    console.error('Server error in getEvent:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Create event
async function addEvent(req: Request, res: Response): Promise<void> {
  try {
    console.log('Received body in addEvent:', req.body);
    const { catId, title, date, type, notes }: CatEventBody = req.body;

    if (!catId || !title || !date || !type) {
      res.status(400).json({ error: 'Please fill in all required fields' });
      return;
    }

    // Check cat exists
    const { data: catCheck, error: catError } = await supabase
      .from('cats')
      .select('id')
      .eq('id', catId)
      .single();

    if (catError || !catCheck) {
      res.status(400).json({ error: 'Invalid catId, cat does not exist' });
      return;
    }

    // Keep date as YYYY-MM-DD
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const insertPayload = {
      cat_id: catId,
      title,
      date: formattedDate,
      type,
      notes,
    };

    console.log('Insert payload:', insertPayload);

    const { data, error } = await supabase
      .from('catevents')
      .insert([insertPayload])
      .select(); 

    console.log('Supabase insert returned data:', data);

    if (error) {
      console.error('Supabase insert error:', error);
      res.status(400).json({ error: error.message || 'Insert failed' });
      return;
    }

    res.status(201).json({ message: 'Event added', catEvent: data });
  } catch (error) {
    console.error('Server error in addEvent:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


// Delete event
async function deleteEvent(req: Request, res: Response): Promise<void> {
  try {
    const cats = (req as any).cats;
    const { eventId } = req.body;

    if (!eventId) {
      res.status(400).json({ error: 'Event Id is needed' });
      return;
    }

    const { data, error } = await supabase
      .from('catevents')
      .delete()
      .eq('id', eventId)
      .eq('cat_id', cats.id)
      .select();

    if (error) {
      console.error('Supabase deletion error:', error);
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ events: data });
  } catch (error) {
    console.error('Server error in deleteEvent:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { getEvent, addEvent, deleteEvent };
