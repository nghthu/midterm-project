import { User } from "../models";

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["full_name", "email", "tel", "sex", "address"],
    });
    return res.json({
      fullName: user.full_name,
      email: user.email,
      tel: user.tel,
      sex: user.sex,
      address: user.address,
    });
  } catch (err) {
    console.error(err);
  }
};

export { getUserProfile };
