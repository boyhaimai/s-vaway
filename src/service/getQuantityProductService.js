import * as request from "~/utils/request";

export const getQuantityProduct = async (quantity) => {
  try {
    const res = await request.get(`product`, {
      params: {
        length: quantity,
        limit: quantity,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
