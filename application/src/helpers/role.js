const technicianRole = 'TECHNICIAN';
const managerRole = 'MANAGER';

function isManagerUser(user) {
    return user.role === managerRole;
}

export {
    technicianRole,
    managerRole,
    isManagerUser
}