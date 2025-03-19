import * as request from "~/utils/request";

export const getTitleItemDocumentCampaign = async (campaign_id) => {
  try {
    const res = await request.get(`daotao/tailieu/docs/0`, {
      params: {
        parent_id: 0,
        campaign_id,
        dev: 1,
      },
    });
    return res;
  } catch (err) {
    console.log(err, "Error");
  }
};
