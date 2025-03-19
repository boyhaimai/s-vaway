import * as request from "~/utils/request";

export const getOrderCanceledService = async () => {
  try {
    const res = await request.get(`orders`, {
      params: {
        status: "cancel",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
