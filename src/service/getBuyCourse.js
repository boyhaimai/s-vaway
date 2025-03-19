import * as request from "~/utils/request";

export const getBuyCourse = async (id) => {
  try {
    const res = await request.get(`daotao/buy_course`, {
      params: {
        id,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
