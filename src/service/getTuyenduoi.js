import * as request from "~/utils/request";

export const getTuyenduoi = async () => {
  try {
    const res = await request.get(`mysystem/lists`, {
      params: {
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
