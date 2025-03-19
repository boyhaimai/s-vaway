import * as request from "~/utils/request";

export const getMyLesson = async (idCourse) => {
  try {
    const res = await request.get(`daotao/sections`, {
      params: {
        course_id: idCourse,
        lesson_id: 0,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
