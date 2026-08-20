// const findByEmployeeId = async (employeeId, tenantId) => {
//     const [rows] = await db.query(
//         `
//         SELECT id, employee_id
//         FROM users
//         WHERE employee_id = ?
//         AND tenant_id = ?
//         LIMIT 1
//         `,
//         [employeeId, tenantId]
//     );

//     return rows[0] || null;
// };

// const findByEmail = async (email, tenantId) => {
//     const [rows] = await db.query(
//         `
//         SELECT id, email
//         FROM users
//         WHERE email = ?
//         AND tenant_id = ?
//         LIMIT 1
//         `,
//         [email, tenantId]
//     );

//     return rows[0] || null;
// };
// const createUser = async (userData) => {
//     const {
//         tenantId,
//         departmentId,
//         roleId,
//         employeeId,
//         name,
//         email
//     } = userData;

//     const [result] = await db.query(
//         `
//         INSERT INTO users
//         (
//             tenant_id,
//             department_id,
//             role_id,
//             employee_id,
//             name,
//             email
//         )
//         VALUES (?, ?, ?, ?, ?, ?)
//         `,
//         [
//             tenantId,
//             departmentId,
//             roleId,
//             employeeId,
//             name,
//             email
//         ]
//     );
    

//     return result.insertId;
// };
 


// module.exports = {createUser ,findByEmail ,findByEmployeeId }