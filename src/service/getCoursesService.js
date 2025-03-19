import * as request from "~/utils/request";

export const getCoursesService = async () => {
  try {
    const res = await request.get(`daotao/allcourse`, {
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
