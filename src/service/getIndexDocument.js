import * as request from "~/utils/request";

export const getIndexDoc = async (parent_id) => {
  try {
    const res = await request.get(`daotao/tailieu/sections/0`, {
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
