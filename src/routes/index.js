import DashBoard from "~/pages/DashBoard/DashBoard";
import Sidebar from "~/layouts/DefaultLayout/Sidebar/Sidebar";
import Campaign from "~/pages/Campaign/Campaign";
import Test from "~/pages/test/test";

const publicRoutes = [
  { path: "/", component: DashBoard },
  { path: "/sidebar", component: Sidebar },
  { path: "/campaign", component: Campaign },
  { path: "/test", component: Test, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
