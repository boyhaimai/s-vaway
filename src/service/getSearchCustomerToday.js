import * as request from "~/utils/request";

export const getSearchCustomerToday = async (keyword) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        keyword,
        search_id:"today",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
