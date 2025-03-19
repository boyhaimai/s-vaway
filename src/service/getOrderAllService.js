import * as request from "~/utils/request";

export const getOrderAllService = async () => {
  try {
    const res = await request.get(`orders`, {
      params: {
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
