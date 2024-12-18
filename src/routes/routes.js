import DashBoard from "~/pages/DashBoard/DashBoard";
import Campaign from "~/pages/Campaign/Campaign";
import config from "~/config";
import Promotion from "~/pages/Promotion/Promotion";
import CreateImagePage from "~/pages/CreateImagePage/CreateImagePage";
import SentPage from "~/pages/SentPage/SentPage";
import DocumentPage from "~/pages/DocumentPage/DocumentPage";
import VideoTrainPage from "~/pages/VideoTrainPage/VideoTrainPage";
import TraceTable from "~/pages/TraceTable/TraceTable";
import Downline from "~/pages/Downline/Downline";

const publicRoutes = [
  { path: config.routes.dashboard, component: DashBoard },
  { path: config.routes.campaign, component: Campaign },
  { path: config.routes.promotion, component: Promotion },
  { path: config.routes.create_image, component: CreateImagePage },
  { path: config.routes.sent, component: SentPage },
  { path: config.routes.document, component: DocumentPage },
  { path: config.routes.video_train, component: VideoTrainPage },
  { path: config.routes.tracetable, component: TraceTable },
  { path: config.routes.downline, component: Downline },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
