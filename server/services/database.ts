import { User, Patient, Doctor } from "../models/user";
import { userData, patientData, doctorData } from "../../data/mockData";

function generateUserID() {
    return Math.max(...userData.map(user => user.userID)) + 1;
}

export async function signUp(username: string, password: string, role: number) {
    if (!username || !password || role === undefined) {
        throw new Error("All fields are required (username, password, role).");
    }

    const existingUser = userData.find(user => user.username === username);
    if (existingUser) {
        throw new Error("Username is already taken.");
    }

    const newUser = {
        userID: generateUserID(),
        username,
        password,
        role, // 0 for Doctor, 1 for Patient
    };

    userData.push(newUser);
    return newUser;
}

export async function login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Both username and password are required.");
    }
  
    const user = userData.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new Error("Invalid username or password.");
    }

    return { userID: user.userID, username: user.username, role: user.role };
}

export async function deleteUser(userID: number): Promise<void> {
    // Validate input
    if (!userID) {
        throw new Error("A valid userID is required.");
    }
  
    // Find the user
    const userIndex = userData.findIndex(user => user.userID === userID);
    if (userIndex === -1) {
        throw new Error(`User with ID ${userID} not found.`);
    }
  
    // Check user role and delete from related tables
    const user = userData[userIndex];
    if (user.role === 0) {
        const doctorIndex = doctorData.findIndex(doc => doc.docID === userID);
        if (doctorIndex !== -1) {
            doctorData.splice(doctorIndex, 1);
        }
    } else if (user.role === 1) {
        const patientIndex = patientData.findIndex(patient => patient.patientID === userID);
        if (patientIndex !== -1) {
            patientData.splice(patientIndex, 1);
        }
    }
  
    // remove user from userData
    userData.splice(userIndex, 1);
  
    console.log(`User with ID ${userID} deleted successfully.`);
}


// import mysql from 'mysql2/promise';
// import bcrypt from 'bcrypt';

// // Create a connection pool to the MySQL database
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// // Helper function to hash passwords
// async function hashPassword(password: string): Promise<string> {
//     return await bcrypt.hash(password, 10);
// }

// // Helper function to compare passwords
// async function comparePasswords(inputPassword: string, storedPassword: string): Promise<boolean> {
//     return await bcrypt.compare(inputPassword, storedPassword);
// }

// // Sign up a new user
// export async function signUp(username: string, password: string, role: number = 1) {
//     if (!username || !password) {
//         throw new Error("All fields are required (username, password).");
//     }

//     const connection = await pool.getConnection();
//     try {
//         // Check if the username already exists
//         const [existingUsers] = await connection.query(
//             'SELECT * FROM User WHERE username = ?',
//             [username]
//         );

//         if ((existingUsers as any[]).length > 0) {
//             throw new Error("Username is already taken.");
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user into the database
//         const [result] = await connection.query(
//             'INSERT INTO User (username, password, role) VALUES (?, ?, ?)',
//             [username, hashedPassword, role]
//         );

//         // Return the new user data
//         return {
//             userID: (result as any).insertId,
//             username,
//             role,
//         };
//     } catch (error) {
//         console.error("Error in signUp function:", error);
//         throw error;
//     } finally {
//         connection.release();
//     }
// }

// // Login a user
// export async function login(username: string, password: string) {
//     if (!username || !password) {
//         throw new Error("Both username and password are required.");
//     }

//     const connection = await pool.getConnection();
//     try {
//         const [users] = await connection.query(
//             'SELECT * FROM User WHERE username = ?',
//             [username]
//         );

//         if ((users as any[]).length === 0) {
//             throw new Error("Invalid username or password.");
//         }

//         const user = (users as any[])[0];
//         const isPasswordValid = await comparePasswords(password, user.password);

//         if (!isPasswordValid) {
//             throw new Error("Invalid username or password.");
//         }

//         return { userID: user.id, username: user.username, role: user.role };
//     } finally {
//         connection.release();
//     }
// }

// // Delete a user
// export async function deleteUser(userID: number): Promise<void> {
//     if (!userID) {
//         throw new Error("A valid userID is required.");
//     }

//     const connection = await pool.getConnection();
//     try {
//         await connection.beginTransaction();

//         // Delete user-related data based on role
//         const [userRows] = await connection.query(
//             'SELECT role FROM User WHERE id = ?',
//             [userID]
//         );

//         if ((userRows as any[]).length === 0) {
//             throw new Error(`User with ID ${userID} not found.`);
//         }

//         const { role } = (userRows as any[])[0];
//         if (role === 2) {
//             await connection.query('DELETE FROM Doctor WHERE docID = ?', [userID]);
//         } else if (role === 1) {
//             await connection.query('DELETE FROM Patient WHERE patientID = ?', [userID]);
//         }

//         // Delete user from the `User` table
//         await connection.query('DELETE FROM User WHERE id = ?', [userID]);

//         await connection.commit();
//         console.log(`User with ID ${userID} deleted successfully.`);
//     } catch (error) {
//         await connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     }
// }
