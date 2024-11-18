import { User, Patient, Doctor } from "../models/user";
import { userData, patientData, doctorData } from "../../data/mockData";
import pool from './connection';  // Importing pool from the connection file

// Helper function to generate a unique User ID
function generateUserID() {
    return Math.max(...userData.map(user => user.userID)) + 1;
}

// Sign Up Endpoint
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

// Login Endpoint
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

// Update User Endpoint
export const updateUser = async (
    userID: number,
    fieldsToUpdate: Partial<{ username: string; password: string; role: number }>
) => {
    try {
        // Generate dynamic query based on the fields to be updated
        const updates = Object.keys(fieldsToUpdate)
            .map((key) => `${key} = ?`)
            .join(', ');

        const values = Object.values(fieldsToUpdate);

        if (updates) {
            const query = `UPDATE users SET ${updates} WHERE id = ?`;
            const [result]: any = await pool.execute(query, [...values, userID]); // Use the imported `pool`

            // Check if rows were affected (user exists)
            if (result.affectedRows > 0) {
                // Fetch and return the updated user
                const [rows]: any = await pool.execute('SELECT * FROM users WHERE id = ?', [userID]);
                return rows[0]; // Return the first user (assuming `id` is unique)
            }
        }

        return null; // No updates or user not found
    } catch (error) {
        console.error("Error in updateUser service:", error);
        throw error;
    }
};

// Delete User Endpoint
export async function deleteUser(userID: number): Promise<void> {
    if (!userID) {
        throw new Error("A valid userID is required.");
    }

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

    // Remove user from userData
    userData.splice(userIndex, 1);

    console.log(`User with ID ${userID} deleted successfully.`);
}

// import { User, Patient, Doctor } from "../models/user";
// import { userData, patientData, doctorData } from "../../data/mockData";
// import pool from './connection';

// function generateUserID() {
//     return Math.max(...userData.map(user => user.userID)) + 1;
// }

// export async function signUp(username: string, password: string, role: number) {
//     if (!username || !password || role === undefined) {
//         throw new Error("All fields are required (username, password, role).");
//     }

//     const existingUser = userData.find(user => user.username === username);
//     if (existingUser) {
//         throw new Error("Username is already taken.");
//     }

//     const newUser = {
//         userID: generateUserID(),
//         username,
//         password,
//         role, // 0 for Doctor, 1 for Patient
//     };

//     userData.push(newUser);
//     return newUser;
// }

// export async function login(username: string, password: string) {
//     if (!username || !password) {
//       throw new Error("Both username and password are required.");
//     }
  
//     const user = userData.find(u => u.username === username && u.password === password);
//     if (!user) {
//       throw new Error("Invalid username or password.");
//     }

//     return { userID: user.userID, username: user.username, role: user.role };
// }

// export async function deleteUser(userID: number): Promise<void> {
//     // Validate input
//     if (!userID) {
//         throw new Error("A valid userID is required.");
//     }
  
//     // Find the user
//     const userIndex = userData.findIndex(user => user.userID === userID);
//     if (userIndex === -1) {
//         throw new Error(`User with ID ${userID} not found.`);
//     }
  
//     // Check user role and delete from related tables
//     const user = userData[userIndex];
//     if (user.role === 0) {
//         const doctorIndex = doctorData.findIndex(doc => doc.docID === userID);
//         if (doctorIndex !== -1) {
//             doctorData.splice(doctorIndex, 1);
//         }
//     } else if (user.role === 1) {
//         const patientIndex = patientData.findIndex(patient => patient.patientID === userID);
//         if (patientIndex !== -1) {
//             patientData.splice(patientIndex, 1);
//         }
//     }
  
//     // remove user from userData
//     userData.splice(userIndex, 1);
  
//     console.log(`User with ID ${userID} deleted successfully.`);
// }



// export const updateUser = async (
//     userID: number,
//     fieldsToUpdate: Partial<{ username: string; password: string; role: number }>
// ) => {
//     try {
//         // Generate dynamic query based on the fields to be updated
//         const updates = Object.keys(fieldsToUpdate)
//             .map((key) => `${key} = ?`)
//             .join(', ');

//         const values = Object.values(fieldsToUpdate);

//         if (updates) {
//             const query = `UPDATE users SET ${updates} WHERE id = ?`;
//             const [result]: any = await pool.execute(query, [...values, userID]); // Fix: Use `any` if the type isn't defined

//             // Check if rows were affected (user exists)
//             if (result.affectedRows > 0) {
//                 // Fetch and return the updated user
//                 const [rows]: any = await pool.execute('SELECT * FROM users WHERE id = ?', [userID]);
//                 return rows[0]; // Return the first user (assuming `id` is unique)
//             }
//         }

//         return null; // No updates or user not found
//     } catch (error) {
//         console.error("Error in updateUser service:", error);
//         throw error;
//     }
// };
