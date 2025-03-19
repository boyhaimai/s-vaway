import * as request from "~/utils/request";

export const getSearchProductService = async (keyword) => {
  try {
    const res = await request.get(`product`, {
      params: {
        keyword,
        limit: 10,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
