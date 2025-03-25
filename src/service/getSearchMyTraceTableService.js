import * as request from "~/utils/request";

export const getSearchTraceTableService = async (keyword) => {
  try {
    const res = await request.get(`lead`, {
      params: {
        keyword,
        by: "me",
        search_id: "all",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
