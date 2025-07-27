import type { Access } from "payload";

export const owner = (({ req: { user }}) => user?.role === "owner") satisfies Access;
