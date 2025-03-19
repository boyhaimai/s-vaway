import * as request from "~/utils/request";

export const getSearchCustomerBuyed = async (keyword) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        keyword,
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
