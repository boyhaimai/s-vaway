import * as request from "~/utils/request";

export const getRank = async (selectRank) => {
  try {
    const res = await request.get(`report/rank`, {
      params: {
        month: selectRank,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
