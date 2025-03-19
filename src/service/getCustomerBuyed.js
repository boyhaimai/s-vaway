import * as request from "~/utils/request";

export const getCustomerBuyed = async () => {
  try {
    const res = await request.get(`lead`, {
      params: {
        search_id:"buyed",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
