import * as request from "~/utils/request";

export const getCourseStudied = async () => {
  try {
    const res = await request.get(`daotao/coursestudied`, {
      params: {
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
