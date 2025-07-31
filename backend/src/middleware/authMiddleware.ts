import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabaseClient';

const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

interface AuthRequest extends Request {
  user?: any; 
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded: any = jwt.verify(token, secret);

        const { data: user, error } = await supabase
        .from('users')
        .select('id, email, first_name')
        .eq('email', decoded.email)
        .single();

        if (error || !user) {
            res.status(401).json({ error: 'Unauthorized: User not found' });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};

export default authMiddleware;
