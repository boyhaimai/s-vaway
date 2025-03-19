import * as request from "~/utils/request";

export const getSelectedImageService = async (id) => {
  try {
    const res = await request.get(`tools/image/${id}`, {
      params: {       
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
