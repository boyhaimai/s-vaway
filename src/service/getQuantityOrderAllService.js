import * as request from "~/utils/request";

export const getQuantityOrderAllService = async (quantity) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        status: "all",
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
