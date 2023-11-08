import { User } from "../models";

const getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["fullName", "email", "tel", "sex", "address"],
  });
  return res.json(user);
};

const editProfile = async (req, res) => {
  const profile = req.body;
  const user = await User.findByPk(req.user.id);
  await user.update({ ...profile });
  return res.json({
    email: user.email,
    fullName: user.fullName,
    tel: user.tel,
    sex: user.sex,
    address: user.address,
  });
};

export { getProfile, editProfile };
