import { formatDistanceToNowStrict } from "date-fns";
import { TZDate } from "@date-fns/tz";

const dateOfBirth = new TZDate("2007/10/08", "Europe/London");

export default () => formatDistanceToNowStrict(dateOfBirth, { roundingMethod: "floor" }) + " old";
