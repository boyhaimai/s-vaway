import * as request from "~/utils/request";

export const getNotificationService = async () => {
  try {
    const res = await request.get(`account/notifications`, {
      params: {
        type: "topbar",
        limit: 20,
        offset: 0,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
