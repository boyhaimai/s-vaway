import * as request from "~/utils/request";

export const getTitleDocument = async () => {
  try {
    const res = await request.get(`daotao/tailieu/docs`, {
      params: {
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err, "Error");
  }
};
