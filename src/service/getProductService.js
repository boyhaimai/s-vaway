import * as request from "~/utils/request";

export const getProduct = async () => {
  try {
    const res = await request.get(`product`, {
      params: {
        limit: 10,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
