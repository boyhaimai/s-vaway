import * as request from "~/utils/request";

export const getDetailDiscountProduct = async (id) => {
  try {
    const res = await request.get(`discount/event`, {
      params: {
        id,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
