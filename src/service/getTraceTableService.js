import * as request from "~/utils/request";

export const getTraceTableService = async () => {
  try {
    const res = await request.get(`lead`, {
      params: {
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
