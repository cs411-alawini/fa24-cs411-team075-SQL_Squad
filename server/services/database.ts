
import pool from './connection';



// function generateUserID() {
//     return Math.max(...userData.map(user => user.userID)) + 1;
// }

export async function signUp(username: string, password: string) {
    if (!username || !password) {
        throw new Error("All fields are required (username, password).");
    }

    const [existingUser]: any = await pool.query(
        `SELECT * FROM User WHERE userName = '${username}'`,
    );
    
    if ((existingUser as any[]).length > 0) {
        throw new Error("Username is already taken.");
    }
    
    const [result]: any = await pool.query(
        `INSERT INTO User (username, password) VALUES ('${username}', '${password}')`
    );
    
    return { userID: result.insertId, username};

}

export async function login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Both username and password are required.");
    }

    
  
    const [users]: any = await pool.query(
        `SELECT userID, userName, role FROM User WHERE userName = '${username}' AND password = '${password}'`
        );

        if (users.length === 0) {
        throw new Error("Invalid username or password.");
        }
        console.log(username, password);
        return users[0];
}

export async function deleteUser(userID: number) {
    const [result]: any = await pool.query(
    `DELETE FROM User WHERE userID = ${userID}`
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

export async function updateUser(userID: number, updates: { username?: string; password?: string; role?: number }) {
    const fieldsToUpdate = [];
    if (updates.username) fieldsToUpdate.push(`username = '${updates.username}'`);
    if (updates.password) fieldsToUpdate.push(`password = '${updates.password}'`);
    if (updates.role !== undefined) fieldsToUpdate.push(`role = ${updates.role}`);
    
    if (fieldsToUpdate.length === 0) {
        throw new Error("No fields provided to update.");
    }

    const query = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE userID = ${userID}`;
    const [result]: any = await pool.query(query);

    if (result.affectedRows === 0) {
        throw new Error(`User with ID ${userID} not found.`);
    }

    const [updatedUser]: any = await pool.query(`SELECT userID, username, role FROM users WHERE userID = ${userID}`);
    return updatedUser[0];
}


