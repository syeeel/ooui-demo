import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // 部（Club）
  route("clubs", "routes/clubs/index.tsx"),
  route("clubs/:id", "routes/clubs/detail.tsx"),
  // 生徒（Student）
  route("students", "routes/students/index.tsx"),
  route("students/:id", "routes/students/detail.tsx"),
  // 組（Class）
  route("classes", "routes/classes/index.tsx"),
  route("classes/:id", "routes/classes/detail.tsx"),
  // 教員（Teacher）
  route("teachers", "routes/teachers/index.tsx"),
  route("teachers/:id", "routes/teachers/detail.tsx"),
  // イベント（Event）
  route("events", "routes/events/index.tsx"),
  route("events/:id", "routes/events/detail.tsx"),
] satisfies RouteConfig;
