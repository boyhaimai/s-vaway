import * as request from "~/utils/request";

export const getLeadData = async (startDate, endDate) => {
  try {
    const date = `${startDate} - ${endDate}`;
    const randomValue = Math.random();
    const res = await request.get(`report/leads_dashboard`, {
      params: {
        date: date,
        dev: 1,
        v: randomValue,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
