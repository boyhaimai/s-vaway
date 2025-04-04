import * as request from "~/utils/request";

export const getQuantityCustomerToday = async (quantity) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        search_id:"today",
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
