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
     * 获取 UTC 时间字符串
     * @returns UTC 时间字符串
     */
    getUTCDatetime() {
        const year = this.#now.getUTCFullYear();
        const month = this.#now.getUTCMonth() + 1;
        const day = this.#now.getUTCDate();
        const hours = this.#now.getUTCHours();
        const minutes = this.#now.getUTCMinutes();
        const seconds = this.#now.getUTCSeconds();
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    /**
     * 获取本地时间字符串
     * @returns 本地时区时间字符串
     */
    getLocalDatetime() {
        const suffix = this.getTimeOffsetSuffix();
        const year = this.#now.getFullYear();
        const month = this.#now.getMonth() + 1;
        const day = this.#now.getDate();
        const hours = this.#now.getHours();
        const minutes = this.#now.getMinutes();
        const seconds = this.#now.getSeconds();
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
