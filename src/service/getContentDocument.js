import * as request from "~/utils/request";

export const getContentDoc = async (parent_id) => {
  try {
    const res = await request.get(`daotao/tailieu/article/0`, {
      params: {
        parent_id,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err, "Error");
  }
};
