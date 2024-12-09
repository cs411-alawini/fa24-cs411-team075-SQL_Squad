import { Router, Request, Response } from 'express';
import { signUp, login, deleteUser, updateUser } from '../services/database';

const router = Router();

// Sign-Up Route
router.post('/signup', async (req: Request, res: Response) => {
    const { username, password} = req.body;

    try {
        const newUser = await signUp(username, password|| 1);
        res.status(201).json({ message: 'User signed up successfully!', user: newUser });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    //console.log(username, password)
// Simulating a role check for simplicity. In a real-world application, you would likely use a middleware for this.
    try {
       
        const user = await login(username, password);
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid credentials.' });
    }
});

// Delete User Route
router.delete('/delete', async (req: Request, res: Response): Promise<void> => {
    let { userID } = req.body; 
    console.log("router.delete userId:", userID);
    userID = parseInt(userID, 10);

    if (isNaN(userID)) {
        res.status(400).json({ error: 'Invalid userID. It must be a number.' });
    }


    try {
        await deleteUser(userID);
        res.status(200).json({ message: `User with ID ${userID} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// Update Profile Route
router.put('/update', async (req: Request, res: Response) => {
    // const userID = parseInt(req.body.userID);
    const { userID, username, password, role } = req.body;
    console.log("router.put:", userID, username, password, role);

    try {
        const updatedUser = await updateUser(userID, { username, password, role });
        res.status(200).json({ message: `User with ID ${userID} updated successfully.`, user: updatedUser });
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

export default router;
