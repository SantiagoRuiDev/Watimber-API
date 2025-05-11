import Organization from '../services/organization.service.js';


export const isOrganizationAdmin = async(req, res, next) => {
    try {
        let { organization } = req.params;

        if(organization == null || organization == undefined){
            organization = req.body.organization;
        }

        const fetchOrganization = await Organization.findOne({_id: organization});

        if(fetchOrganization){
            if(fetchOrganization.admin.equals(req.user._id)){
                next();
                return;
            } else {
                return res.status(403).json({error: "Only administradors can perform this action"});
            }
        } else {
            return res.status(404).json({error: "Organization not found, please try again"});
        }
        
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

export const isOrganizationMember = async(req, res, next) => {
    try {
        const { organization } = req.params;

        const fetchOrganization = await Organization.findOne({_id: organization});

        if(fetchOrganization){
            if(fetchOrganization.members.some((memb) => memb.equals(req.user._id)) || fetchOrganization.admin.equals(req.user._id)){
                next();
                return;
            } else {
                return res.status(403).json({error: "Only organization users can perform this action"});
            }
        } else {
            return res.status(404).json({error: "Organization not found, please try again"});
        }
        
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}
