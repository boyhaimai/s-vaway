import * as request from "~/utils/request";

export const getAllScheduleService = async (date) => {
  try {
    const res = await request.get(`reminder/get/`, {
      params: {
        date,
        limit: 100,
        offset: 0,
        type: "all",
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
