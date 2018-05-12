const path = require('path')
const lab = require('linco.lab')
const watch = require('chokidar')
const color = require('chalk')
const exec = require('child_process').execSync

const ignores = [
    /^\./,
    '**/node_modules/**'
]

module.exports = function({cmd, list}) {
    // 监听路径
    let url = list[0]

    // 忽略规则
    let ignore = list[1]

    // 执行目标
    let target = url

    if (cmd.deep || cmd.R) {
        // 监听路径上升
        url = path.dirname(url)
    }

    // 添加忽略规则
    if (cmd.ignore) {
        ignores.push(ignore)
    }

    // 创建监听器
    const watcher = watch.watch(url, {
        ignored: ignores,
        persistent: true
    })

    // 只需监听change事件
    watcher.on('change', src => {
        // 清空控制台
        console.clear()
        // 打印触发事件
        console.log(timestamp(), 'change', mapSrc(src))
        // run app
        runapp(target)
    })
}

// run it
function runapp(target) {
    try{
        console.log(exec(`node ${target}`).toString())
    }
    catch(err){
        console.log(timestamp(), color.red(`Error: ${err.message}`))
    }
}

// 时间戳
function timestamp() {
    return `[${(new Date).toJSON().replace('T',' ').slice(11,19)}]`
}

// 短地址
function mapSrc(src) {
    return src.split(new RegExp(path.sep)).splice(-2, 2).join(path.sep)
}