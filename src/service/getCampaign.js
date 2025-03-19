import * as request from "~/utils/request";

export const getCampaign = async () => {
  try {
    const res = await request.get(`product/lists`, {
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
