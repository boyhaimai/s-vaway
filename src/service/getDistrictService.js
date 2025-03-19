import * as request from "~/utils/request";

export const getDistrictService = async (id) => {
  try {
    const res = await request.get(`public/address/district/${id}`,{
      params: {
        select: id,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
