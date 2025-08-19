import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

// get event
async function getEvent(req: Request, res: Response): Promise<void> {
    try{
        const cats = (req as any).cats;
        
        const { data, error } = await supabase
            .from('cats')
            .select('id, title, date, type, notes')
            .eq('cat_id', cats.id)

        if(error) {
            console.error('Supabase fetch error:', error);
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(200).json({ catEvents: data });
    } catch(error) {
        res.status(500).json({ error: 'Server error '});
    }
}

// create event
async function addEvent(req: Request, res: Response): Promise<void> {
    try{
        const cats = (req as any).cats;
        
        const {title, date, type, notes} = req.body;
        
        if(!title || !date || !type) {
            res.status(400).json({ error: 'Please fill in all fields' });
            return;
        }

        const { data, error } = await supabase
            .from('catEvents')
            .insert([{ title, date, type, notes}]);

        if(error) {
            console.error('Supabase insert error:', error);
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(201).json({ message: 'Event added', catEvent:data});
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// delete event
async function deleteEvent(req: Request, res: Response): Promise<void> {
    try{
        const cats = (req as any).cats;
        const { eventId } = req.body;

        if(!eventId) {
            res.status(400).json({ error: 'Event Id is needed '});
            return;
        }

        const { data, error } = await supabase
            .from('catEvents')
            .delete()
            .eq('id', eventId.id)
            .eq('cat_id', cats.id)
            .select()

        if(error) {
            console.error('Supabase deletion error', error);
            res.status(400).json({ error: error.message });
            return;
        }
        
        res.status(200).json({ events: data});
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export { getEvent, addEvent, deleteEvent };
