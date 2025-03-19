import * as request from "~/utils/request";

export const addNode = async (message) => {
  try {
    const res = await request.get(`todo/add`, {
      params: {
        message,
        dev: 1,
      },
    });
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
