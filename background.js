chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'OFF'
    })
})

const intranet = "https://alx-intranet.hbtn.io/"

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(intranet)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        })

        if (nextState === 'ON') {
            await chrome.scripting.insertCSS({
                files: ["intranet-dark.css"],
                target: { tabId: tab.id },
            })
        } else if (nextState === 'OFF') {
            await chrome.scripting.removeCSS({
                files: ["intranet-dark.css"],
                target: { tabId: tab.id }
            })
        }
    }
})