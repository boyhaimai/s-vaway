import * as request from "~/utils/request";

export const getDetailcontent = async (id, parent_id) => {
  try {
    const res = await request.get(`daotao/tailieu/article/${id}`, {
      params: {
        parent_id,
        dev: 1,
      },
    });       
    return res;
  } catch (err) {
    console.log(err, "Error get detail content");
  }
};

