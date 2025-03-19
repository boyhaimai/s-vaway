import * as request from "~/utils/request";

export const getSearchOrderConfirmedService = async (keyword) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        keyword,
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
