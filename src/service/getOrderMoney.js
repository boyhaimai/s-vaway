import * as request from "~/utils/request";

export const getOrderMoney = async (startDate, endDate) => {
  try {
    const date = `${startDate} - ${endDate}`;
    const res = await request.get(`report/orders`, {
      params: {
        date: date,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
