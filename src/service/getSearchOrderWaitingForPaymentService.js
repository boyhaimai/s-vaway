import * as request from "~/utils/request";

export const getSearchOrderWaitingForPaymentService = async (keyword) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        keyword,
        status: "not_purchased",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
