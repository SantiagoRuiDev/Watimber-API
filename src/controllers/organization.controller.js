import Organization from "../services/organization.service.js";
import User from "../services/user.service.js";

export const getOrganizations = async (req, res) => {
  try {
    const uuid = req.user._id;

    const fetchRawOrganizations = await Organization.find({}).populate(
      "members",
      "-password"
    );

    let filteredOrganizations = fetchRawOrganizations.filter(
      (org) => org.admin.equals(uuid) || org.members.some(member => member._id.equals(uuid))
    );

    filteredOrganizations = filteredOrganizations.map((org) => {
      return {
        _id: org._id,
        name: org.name,
        admin: org.admin,
        members: org.members,
        requestUserIsAdmin: org.admin.equals(req.user._id)
      }
    })

    return res.status(200).json({ organizations: filteredOrganizations });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrganizationByIdentifier = async (req, res) => {
  try {
    const uuid = req.params.id;

    const fetchOrganization = await Organization.find({ _id: uuid }).populate(
      "members",
      "-password"
    );

    return res.status(200).json({ organization: fetchOrganization });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const uuid = req.user._id;
    const name = req.body.name;

    const userHaveMultiple = await Organization.find({ admin: uuid });

    if (userHaveMultiple.length > 0) {
      throw new Error("You have an organization already created");
    }

    const schemaOrganization = new Organization({
      admin: uuid,
      name: name,
    });

    await schemaOrganization.save();

    return res
      .status(200)
      .json({ message: "Organization has been successfully created" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const setOrganizationMember = async (req, res) => {
  try {
    const uuid = req.body.organization;
    const userEmail = req.body.email;

    const findUser = await User.findOne({ email: userEmail });

    if (!findUser) {
      throw new Error("User not found, please try with an valid one");
    }

    const organization = await Organization.findOne({ _id: uuid });

    if (!organization) {
      throw new Error("Organization not found, please try with an valid one");
    }

    // Verifica si el usuario ya es miembro
    if (!organization.members.some((member) => member.equals(findUser._id))) {
      // Crea una nueva copia del array con el nuevo miembro
      const updatedMembers = [...organization.members, findUser._id];

      // Actualiza la organización
      await Organization.updateOne(
        { _id: uuid },
        { $set: { members: updatedMembers } }
      );
    }

    return res.status(200).json({ message: "Member has been added" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
