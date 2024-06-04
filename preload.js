

window.exports = {
    "time": { // 注意：键对应的是 plugin.json 中的 features.code
       mode: "list",  // 列表模式
       args: {
          // 进入插件应用时调用（可选）
          enter: (action, callbackSetList) => {
            const date = new Date();
            const isoZero = date.toISOString();
             // 如果进入插件应用就要显示列表数据
             callbackSetList([
                   {
                      title: 'UTC',
                      description: isoZero,
                      type: 'UTC'
                   }
             ])
          },
          // 用户选择列表中某个条目时被调用
          select: (action, itemData, callbackSetList) => {
             window.utools.hideMainWindow()
             const type = itemData.type
            //  utools.copyText(itemData.description)
            //  utools.showNotification(`已复制: ${itemData.description}`)
             utools.showNotification()
          },
          // 子输入框为空时的占位符，默认为字符串"搜索"
          placeholder: "搜索"
       }
    }
 }