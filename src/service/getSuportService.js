import * as request from "~/utils/request";

export const getSuportService = async () => {
  try {
    const res = await request.get(`account/support`, {
      params: {
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
