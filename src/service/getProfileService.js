import * as request from "~/utils/request";

export const getProfileService = async () => {
  try {
    const res = await request.get(`account/profile`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
