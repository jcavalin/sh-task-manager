const technicianType = 'TECHNICIAN';
const managerType = 'MANAGER';

function isManagerUser(user) {
    return user.role === managerType;
}

export {
    technicianType,
    managerType,
    isManagerUser
}