import * as request from "~/utils/request";

export const getProvinceService = async () => {
  try {
    const res = await request.get(`public/address/province`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
