import * as request from "~/utils/request";

export const getDiscountProduct = async () => {
  try {
    const res = await request.get(`discount/event`, {
      params: {
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
