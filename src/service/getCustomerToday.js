import * as request from "~/utils/request";

export const getCustomerToday = async () => {
  try {
    const res = await request.get(`lead`, {
      params: {
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
