import NodeCache from "node-cache";
import { CACHE_TTL } from "../config/constants.js";

export const cache = new NodeCache({
    stdTTL: CACHE_TTL,
});
