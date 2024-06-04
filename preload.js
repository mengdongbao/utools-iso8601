const ISOTimeUtils = require("./timeUtils");

window.exports = {
    time: {
        // 注意：键对应的是 plugin.json 中的 features.code
        mode: "list", // 列表模式
        args: {
            // 进入插件应用时调用（可选）
            enter: (action, callbackSetList) => {
                const dt = new ISOTimeUtils();
                // 如果进入插件应用就要显示列表数据
                callbackSetList([
                    {
                        title: "UTC",
                        description: dt.getUTCDatetime(),
                    },
                    {
                        title: "Local",
                        description: dt.getLocalDatetime(),
                    },
                    {
                        title: "UTC path friendly",
                        description: dt.pathFriendly(dt.getUTCDatetime()),
                    },
                    {
                        title: "Local path friendly",
                        description: dt.pathFriendly(dt.getLocalDatetime()),
                    },
                ]);
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow();
                utools.copyText(itemData.description);
                utools.showNotification(`已复制: ${itemData.description}`);
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "搜索",
        },
    },
};
