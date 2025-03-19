import * as request from "~/utils/request";

export const getTraceTableHaveIdService = async (lead_id) => {
  try {
    const res = await request.get(`lead?lead_id=${lead_id}`, {
      params: {
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
