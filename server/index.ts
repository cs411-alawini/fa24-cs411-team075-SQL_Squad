import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.get('/api/', (req:Request, res:Response) => {
    res.send('api');
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

export default app;

const handleLogin = async (username: string, password: string) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        const data = await response.json();
        // Store the token in localStorage or a secure storage method
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or home page
    } catch (error) {
        console.error('Login error:', error);
        // Handle error (show message to user)
    }
};