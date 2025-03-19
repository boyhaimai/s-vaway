import * as request from "~/utils/request";

export const getSearchOrderAllService = async (keyword) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        keyword,
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
