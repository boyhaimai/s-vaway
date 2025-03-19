import config from "~/config";
import DashBoard from "~/pages/DashBoard/DashBoard";
import Campaign from "~/pages/Marketing/Campaign/Campaign";
import Promotion from "~/pages/Marketing/Promotion/Promotion";
import CreateImagePage from "~/pages/Marketing/CreateImagePage/CreateImagePage";
import SentPage from "~/pages/Marketing/SentPage/SentPage";
import DocumentPage from "~/pages/Marketing/DocumentPage/DocumentPage";
import VideoTrainPage from "~/pages/Marketing/VideoTrainPage/VideoTrainPage";
import Leads from "~/pages/TraceTable/leads";
// import Downline from "~/pages/Downline/Downline";
import Detail from "~/Components/Detail/Detail";
import Product from "~/pages/Business/Products/Product";
import Order from "~/pages/Business/Orders/Order";
import Profile from "~/Components/Acounts/Profiles/Profile";
import VideoLearn from "~/Components/VideoLearn/VideoLearn";

const publicRoutes = [
  //  tổng quan
  { path: config.routes.dashboard, component: DashBoard },
  { path: config.routes.detail, component: Detail },

  // Chiến dịch
  { path: config.routes.campaign, component: Campaign },
  { path: config.routes.create_image, component: CreateImagePage },
  { path: config.routes.document, component: DocumentPage },
  { path: config.routes.video_train, component: VideoTrainPage },
  // { path: config.routes.promotion, component: Promotion },
  // { path: config.routes.sent, component: SentPage },

  // Kinh doanh
  { path: config.routes.products, component: Product },
  { path: config.routes.orders, component: Order },

  // Bảng lưu vết
  { path: config.routes.leads, component: Leads },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.learn, component: VideoLearn },

  // { path: config.routes.downline, component: Downline },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
