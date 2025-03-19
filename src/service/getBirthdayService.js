import * as request from "~/utils/request";

export const getBirthdayService = async (date) => {
  try {
    const res = await request.get(`reminder/get/`, {
      params: {
        date,
        limit: 100,
        offset: 0,
        type: "birthdate",
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
