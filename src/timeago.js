import TimeAgo from "javascript-time-ago";
import ro from "javascript-time-ago/locale/ro";

TimeAgo.addDefaultLocale(ro);
export const timeAgo = new TimeAgo("de-DE");
