import * as request from "~/utils/request";

export const deleteNote = async (id) => {
  try {
    const res = await request.get(`todo/delete`,{
      params: {
        id,
        dev: 1,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
