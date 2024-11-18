// server/routes/auth.ts
import { Router, Request, Response } from 'express';
import { signUp, login, deleteUser } from '../services/database';
import { User, Patient, Doctor } from "../models/user";

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    try {
        const newUser = await signUp(username, password, role || 1);
        res.status(201).json({ message: 'User signed up successfully!', user: newUser });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});



router.post('/login', async (req: Request, res: Response) => {
    // Login logic
    const { username, password } = req.body;
    // if (!username || !password) {
    //     return res.status(400).json({ error: 'Invalid input. Please provide username and password.' });
    // }
    
    try {
        const user = await login(username, password);
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid credentials.' });
        // console.log("Invalid");
    }
});

router.delete('/delete/:userID', async (req: Request, res: Response) => {
    const userID = parseInt(req.params.userID);
  
    try {
        await deleteUser(userID);
        res.status(200).json({ message: `User with ID ${userID} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

export default router;