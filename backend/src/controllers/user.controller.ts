import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get user
async function getUser(req: Request, res: Response): Promise<void> {

    try {
        const { email } = req.body;
    
        const { data, error } = await supabase
        .from('users')
        .select('email, first_name')
        .eq('email', email)
        .single();

        if(error) {
            res.status(400).json({error: error.message});
            return;
        }
        
        res.status(200).json({message: 'User profile fetched', user: data});
    } catch(error) {
        res.status(500).json({error: 'server error'});
    }
}

// register user
async function register(req: Request, res: Response): Promise<void> {

    try{
        const { firstName, email, password } = req.body;

        if(!firstName || !email || !password) {
            res.status(400).json({error: 'Please fill in all fields'});
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([{first_name: firstName, email, password_hash: hashPassword}]);

        if(error) {
            res.status(400).json({error: error.message});
            return;
        }

        res.status(201).json({message: 'User registered successfully', user: data});
        // send back to login page 
    } catch(error) {
        res.status(500).json({error: 'server error'});
    }
}

// login user
async function login(req: Request, res: Response): Promise<void> {
    
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const { email, password } = req.body;
        console.log('Login body:', req.body); 

        if (!email || !password) {
        res.status(400).json({ error: 'Please fill in all fields' });
        return;
        }

        const { data, error } = await supabase
        .from('users')
        .select('email, password_hash')
        .eq('email', email)
        .single();
        
        console.log('Supabase result:', { data, error });

        if (error || !data) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
        }

        const isMatch = await bcrypt.compare(password, data.password_hash);

        if (!isMatch) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
        }

        // Generate JWT token
        const token = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({message: 'Login successful', token, });
    } catch (error) {
        res.status(500).json({ error: 'server error' });
  }
}

export { login, register, getUser };