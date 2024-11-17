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