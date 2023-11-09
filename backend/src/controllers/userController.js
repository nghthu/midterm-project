import {
  ERROR_FULLNAME_NOT_EMPTY,
  ERROR_REQUIRE_ALL_FIELDS,
} from "../lib/constants";
import { User } from "../models";

const getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["fullName", "email", "tel", "sex", "address"],
  });
  return res.json(user);
};

const editProfile = async (req, res) => {
  const profile = req.body;
  if (
    !profile?.fullName ||
    !profile?.email ||
    !profile?.tel ||
    !profile?.sex ||
    !profile?.address ||
    !profile?.password
  ) {
    res.status(400);
    throw new Error(ERROR_REQUIRE_ALL_FIELDS);
  }
  if (profile.fullName === "") {
    res.status(400);
    throw new Error(ERROR_FULLNAME_NOT_EMPTY);
  }
  if (profile.email === "") {
    res.status(400);
    throw new Error(ERROR_EMAIL_NOT_EMPTY);
  }
  if (profile.password === "") {
    res.status(400);
    throw new Error(ERROR_PASSWORD_NOT_EMPTY);
  }
  if (profile.tel === "") {
    res.status(400);
    throw new Error(ERROR_TEL_NOT_EMPTY);
  }

  const user = await User.findByPk(req.user.id);
  const hashedPw = await bcrypt.hash(profile.password, SALT_ROUNDS);
  await user.update({
    email: profile.email,
    fullName: profile.fullName,
    tel: profile.tel,
    sex: profile.sex,
    address: profile.address,
    password: hashedPw,
  });
  return res.json({
    email: user.email,
    fullName: user.fullName,
    tel: user.tel,
    sex: user.sex,
    address: user.address,
  });
};

export { getProfile, editProfile };
