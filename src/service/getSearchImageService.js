import * as request from "~/utils/request";

export const getSearchImageService = async (keyword) => {
  try {
    const res = await request.get(`tools/image`, {
      params: {
        keyword,
        limit: 20,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
