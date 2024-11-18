// import { User, Patient, Doctor } from "../models/user";
// import { userData, patientData, doctorData } from "../../data/mockData";

import pool from "../config/connection";

// function generateUserID() {
//     return Math.max(...userData.map(user => user.userID)) + 1;
// }

export async function signUp(username: string, password: string, role: number) {
    if (!username || !password || role === undefined) {
        throw new Error("All fields are required (username, password, role).");
    }

    const [existingUser]: any = await pool.query(
        `SELECT * FROM users WHERE username = '${username}'`,
    );
    
    if ((existingUser as any[]).length > 0) {
        throw new Error("Username is already taken.");
    }
    
    const [result]: any = await pool.query(
        `INSERT INTO users (username, password, role) VALUES ('${username}', '${password}', '${role}')`,
    );
    
    return { userID: result.insertId, username, role };

}

export async function login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Both username and password are required.");
    }
  
    const [users]: any = await pool.query(
        `SELECT userID, username, role FROM users WHERE username = '${username}' AND password = '${password}'`
        );

        if (users.length === 0) {
        throw new Error("Invalid username or password.");
        }

        return users[0];
}

export async function deleteUser(userID: number) {
    const [result]: any = await pool.query(
    `DELETE FROM users WHERE userID = ${userID}`
    );

    if (result.affectedRows === 0) {
    throw new Error(`User with ID ${userID} not found.`);
    }

    return `User with ID ${userID} deleted successfully.`;
}

export async function getAllUsers() {
    const [users]: any = await pool.query("SELECT userID, username, role FROM users");
    return users;
}

export async function updateUserPassword(userID: number, newPassword: string) {
    const [result]: any = await pool.query(
        `UPDATE users SET password = '${newPassword}' WHERE userID = ${userID}`
    );

    if (result.affectedRows === 0) {
        throw new Error(`User with ID ${userID} not found.`);
    }

    return `Password for User with ID ${userID} updated successfully.`;
}
    
export default { signUp, login, deleteUser, getAllUsers, updateUserPassword };




// example usage 

// (async () => {
//     try {
//       // Sign up a new user
//       const newUser = await signUp("newUser123", "securePass", 1);
//       console.log("User signed up:", newUser);
  
//       // Log in as the new user
//       const loggedInUser = await login("newUser123", "securePass");
//       console.log("User logged in:", loggedInUser);
//     } catch (error) {
//       if (error instanceof Error) {
//         // Handle Error type
//         console.error(error.message);
//       } else {
//         // Handle unexpected error type
//         console.error("An unknown error occurred:", error);
//       }
//     }
//   })();

// (async () => {
//     try {
//       // Delete user with userID 2
//       await deleteUser(2);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error(error.message);
//       }
//     }
//   })();