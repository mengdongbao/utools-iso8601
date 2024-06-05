class ISOTimeUtils {
    #now;
    constructor() {
        this.#now = new Date();
    }

    /**
     * 获取 ISO 8601 时区尾缀
     * @returns ISO 8601 尾缀
     */
    getTimeOffsetSuffix() {
        const offset = this.#now.getTimezoneOffset();
        const sign = offset <= 0 ? "+" : "-";

        const pad = (num) => String(num).padStart(2, "0");
        const hours = pad(Math.floor(Math.abs(offset) / 60));
        const minutes = pad(Math.abs(offset) % 60);
        const iso8601Offset = `${sign}${hours}:${minutes}`;
        return iso8601Offset;
    }

    /**
     * 获取时间对象
     * @param {"Local" | "UTC"} type 时区类型
     * @returns {{
     * suffix: String
     * year: String
     * month: String
     * day: String
     * hours: String
     * minutes: String
     * seconds: String
     * }} 时间对象
     */
    getDatetimeObject(type) {
        let suffix, year, month, day, hours, minutes, seconds;
        
        switch (type) {
            case "Local":
                suffix = String(this.getTimeOffsetSuffix());
                year = String(this.#now.getFullYear()).padStart(2, '0');
                month = String(this.#now.getMonth() + 1).padStart(2, '0');
                day = String(this.#now.getDate()).padStart(2, '0');
                hours = String(this.#now.getHours()).padStart(2, '0');
                minutes = String(this.#now.getMinutes()).padStart(2, '0');
                seconds = String(this.#now.getSeconds()).padStart(2, '0');
            case "UTC":
                year = String(this.#now.getUTCFullYear());
                month = String(this.#now.getUTCMonth() + 1).padStart(2, '0');
                day = String(this.#now.getUTCDate()).padStart(2, '0');
                hours = String(this.#now.getUTCHours()).padStart(2, '0');
                minutes = String(this.#now.getUTCMinutes()).padStart(2, '0');
                seconds = String(this.#now.getUTCSeconds()).padStart(2, '0');
            default:
                break;
        }
        return {
            suffix,
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
        }
    }

    /**
     * 获取 UTC 时间字符串
     * @returns UTC 时间字符串
     */
    getUTCDatetime() {
        const {
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            suffix,
        } = this.getDatetimeObject('UTC');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    /**
     * 获取本地时间字符串
     * @returns 本地时区时间字符串
     */
    getLocalDatetime() {
        const {
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            suffix,
        } = this.getDatetimeObject('Local');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${suffix}`;
    }

    /**
     * 将时间字符串转换为合法的路径格式
     * @param {String} str 时间字符串
     * @returns 适合作为路径的时间字符串
     */
    pathFriendly(str) {
        const unsafeChars = /[\/\\:*?"<>|]/g;
        return str.replace(unsafeChars, "_");
    }
}
module.exports = ISOTimeUtils;
