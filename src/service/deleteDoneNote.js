import * as request from "~/utils/request";

export const deleteDoneNote = async (id) => {
  try {
    const res = await request.get(`todo/done/${id}`, {
      params: {
        done: 1,
        limit: 12,
        dev: 1,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
