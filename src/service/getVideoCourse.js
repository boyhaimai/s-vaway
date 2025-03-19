import * as request from "~/utils/request";

export const getVideoCourse = async (idCourse,idLesson) => {
  try {
    const res = await request.get(`daotao/sections`, {
      params: {
        course_id: idCourse,
        lesson_id: idLesson,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
