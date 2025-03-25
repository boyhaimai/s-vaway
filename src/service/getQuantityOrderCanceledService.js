import * as request from "~/utils/request";

export const getQuantityOrderCanceledService = async (quantity) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        status: "cancel",
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
