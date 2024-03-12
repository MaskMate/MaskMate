import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);

declare module "dayjs" {
    interface Dayjs {
        fromNow(withoutSuffix?: boolean): string;
    }
}

dayjs.updateLocale("en", {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: "Just now",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "yesterday",
    },
});

const formatTimestamp = (timestamp: string) => {
    const date = dayjs.utc(timestamp);
    if (date.isBefore(dayjs().subtract(22, "hour"))) {
        return date.format("D MMM");
    } else {
        return dayjs.utc().from(date, true);
    }
};

export default formatTimestamp;
