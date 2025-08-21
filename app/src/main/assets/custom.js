console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// 🧠 添加缓存配置逻辑
const initConfigCache = () => {
    const aiConfig = {
        agentModel: {
            name: "gemini-2.5-flash",
            baseUrl: "http://api.xf17.us.kg",
            apiKey: "sk-orUoKwkyQn6EimiYdUGLhPecNNHea6PlGmIPcuXLNxkUrrp1"
        },
        chatModel: {
            name: "gemini-2.5-flash",
            baseUrl: "http://api.xf17.us.kg",
            apiKey: "sk-orUoKwkyQn6EimiYdUGLhPecNNHea6PlGmIPcuXLNxkUrrp1"
        },
        visionModel: {
            name: "gemini-2.5-flash",
            baseUrl: "http://api.xf17.us.kg",
            apiKey: "sk-orUoKwkyQn6EimiYdUGLhPecNNHea6PlGmIPcuXLNxkUrrp1"
        }
    }

    const githubRateLimit = Date.now()

    // 只在首次加载时写入缓存
    if (!localStorage.getItem("aiConfig")) {
        localStorage.setItem("aiConfig", JSON.stringify(aiConfig))
        localStorage.setItem("github-rate-limit-Feather-2/SnapFit-AI", githubRateLimit.toString())
        console.log("✅ AI 配置已缓存")
    } else {
        console.log("🧊 AI 配置已存在，无需重复写入")
    }
}

// 页面加载时初始化缓存
window.addEventListener("load", initConfigCache)
