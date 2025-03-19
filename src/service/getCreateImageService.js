import * as request from "~/utils/request";

export const getCreateImage = async () => {
  try {
    const res = await request.get(`tools/image`, {
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
