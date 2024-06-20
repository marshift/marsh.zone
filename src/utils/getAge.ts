import { formatDistanceToNowStrict } from "date-fns";
const dateOfBirth = new Date(2007, 11, 16);

export default () => formatDistanceToNowStrict(dateOfBirth, { roundingMethod: "floor" }) + " old";
