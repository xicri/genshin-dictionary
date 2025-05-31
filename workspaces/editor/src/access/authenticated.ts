import type { User } from "@/payload-types";
import type { AccessArgs } from "payload";

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user }}) => Boolean(user);
