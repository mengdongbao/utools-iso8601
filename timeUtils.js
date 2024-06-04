

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
        const sign = offset <= 0 ? '+' : '-';
        const pad = (num) => String(num).padStart(2, '0');
        const hours = pad(Math.floor(Math.abs(offset) / 60));
        const minutes = pad(Math.abs(offset) % 60);
        const iso8601Offset = `${sign}${hours}:${minutes}`;
        return iso8601Offset
    }

    /**
     * 获取 UTC 时间字符串
     * @returns UTC 时间字符串
     */
    getUTCDatetime() {
        return this.#now.toISOString()
    }

    /**
     * 获取本地时间字符串
     * @returns 本地时区时间字符串
     */
    getLocalDatetime() {
        const utcString = this.getUTCDatetime();
        const utcWithoutTimeZone = utcString.substring(0, utcString.length - 1);
        return `${utcWithoutTimeZone}${this.getTimeOffsetSuffix()}`
    }

    /**
     * 将时间字符串转换为合法的路径格式
     * @param {String} str 时间字符串
     * @returns 适合作为路径的时间字符串
     */
    pathFriendly(str) {
        const unsafeChars = /[\/\\:*?"<>|]/g;
        return str.replace(unsafeChars, '_');
    }
}
module.exports = ISOTimeUtils;