// import * as request from "~/utils/request";

// export const doneNote = async (id) => {
//   try {
//     const res = await request.get(`todo/done/${id}`,{
//       params: {
//         done:0,
//         limit:12,
//         dev: 1,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

import * as request from "~/utils/request";

export const doneNote = async (id, done) => {
  try {
    const res = await request.get(`todo/done/${id}`, {
      params: {
        done, // Nếu `done=1`, đánh dấu hoàn thành. Nếu `done=0`, bỏ hoàn thành
        limit: 12,
      },
    });
    return res.data;
  } catch (err) {
    console.log("Lỗi API:", err);
  }
};
