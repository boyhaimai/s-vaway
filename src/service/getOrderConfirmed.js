import * as request from "~/utils/request";

export const getOrderConfirmedService = async () => {
  try {
    const res = await request.get(`orders`, {
      params: {
        status: "verified",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
