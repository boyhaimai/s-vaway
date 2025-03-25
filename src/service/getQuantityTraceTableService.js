import * as request from "~/utils/request";

export const getQuantityTraceTableService = async (quantity) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        length: quantity,
        date: "today",
        limit: quantity,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
