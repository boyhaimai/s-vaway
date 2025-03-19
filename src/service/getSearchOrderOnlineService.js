import * as request from "~/utils/request";

export const getSearchOrderOnlineService = async (keyword) => {
  try {
    const res = await request.get(`orders`, {
      params: {
        keyword,
        status: "online",
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
