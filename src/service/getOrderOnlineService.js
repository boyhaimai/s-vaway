import * as request from "~/utils/request";

export const getOrderOnlineService = async () => {
  try {
    const res = await request.get(`orders`, {
      params: {
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
