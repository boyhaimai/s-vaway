import * as request from "~/utils/request";

export const getMyTraceTableService = async () => {
  try {
    const res = await request.get(`lead`, {
      params: {
        by: "me",
        limit: 20,
        dev: 1,
      },
    });    
    return res;
  } catch (err) {
    console.log(err);
  }
};
