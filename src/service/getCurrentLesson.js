import * as request from "~/utils/request";

export const getCurrentLesson = async (idCourse,idLesson) => {
  try {
    const res = await request.get(`daotao/getlink/`, {
      params: {
        course_id: idCourse,
        lesson_id: idLesson,
        dev: 1,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
