import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

// get cats
async function getCat(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as any).user;
    
    const { data, error } = await supabase
      .from('cats')
      .select('id, name, age, breed, gender')
      .eq('user_id', user.id)

      if (error) {
        console.error('Supabase fetch error:', error);
        res.status(400).json({ error: error.message });
        return;
      }

    res.status(200).json({ cats: data });
  } catch(error) {
    res.status(500).json({ error: 'Server error' });
  }
}

//add cats

async function addCat(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as any).user;

    const { name, age, breed, gender } = req.body;
    const ageNumber = Number(age);

    console.log('Incoming body:', req.body);
    console.log('Authenticated user:', (req as any).user);

    if (!name || !ageNumber || !breed || !gender) {
        res.status(400).json({ error: 'Please fill in all fields' });
        return;
    }

    const { data, error } = await supabase
      .from('cats')
      .insert([{ name, age: ageNumber, breed, gender, user_id: user.id }]); 

    if (error) {
      console.error('Supabase insert error:', error);
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ message: 'Cat added successfully!', cat: data });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

//remove cat

export { addCat, getCat};