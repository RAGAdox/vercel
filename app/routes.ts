import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("/share-target", "routes/share-target/share-target.tsx"),
] satisfies RouteConfig;
