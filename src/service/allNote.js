import * as request from "~/utils/request";

export const allNote = async () => {
  try {
    const res = await request.get(`todo`, {
      params: {
        dev: 1,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
