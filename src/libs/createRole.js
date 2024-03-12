import Role from '../services/role.service.js';

const createDefaultRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) return;
        const roles = ['worker', 'admin'];
        for (const role of roles) {
            await Role.create({ name: role });
        }
    } catch (error) {
        return error;
    }
}

export default createDefaultRoles;