import * as request from "~/utils/request";

export const getProfileMoney = async () => {
  try {
    const res = await request.get(`account/profile`, {
      params: {
        money: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
