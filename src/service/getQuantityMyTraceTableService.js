import * as request from "~/utils/request";

export const getQuantityMyTraceTableService = async (quantity) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        by: "me",
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
