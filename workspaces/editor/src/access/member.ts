import type { Access } from "payload";

export const member: Access = ({ req: { user }}) => user?.role === "member" || user?.role === "owner";
