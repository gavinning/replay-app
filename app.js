const path = require('path')
const lab = require('linco.lab')
const watch = require('chokidar')
const color = require('chalk')
const exec = require('child_process').execSync
const argv = process.argv

const ignores = [
    /^\./,
    '**/node_modules/**'
]

module.exports = function(map) {
    // console.log('==== start ====')
    // console.log(map)
    // console.log('==== end ====')

    // 默认为node
    let engine = 'node'

    // 目标文件
    let target = map.value

    // 忽略规则
    let ignore = map.ignore

    // 目标目录
    let url = target

    // 检查执行环境
    engine = map.engine || engine

    // 添加忽略规则
    !map.ignore || ignores.push(map.ignore)

    // console.log(engine)

    // 是否监听整个目录
    if (map.deep) {
        // 监听路径上升
        url = path.dirname(target)
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
        runapp(engine, target)
    })

    console.log(`Listening ${map.deep ? url : target} and replay ${target}`)
}

// run it
function runapp(engine, target) {
    try{
        console.log(exec(`${engine} ${target}`).toString())
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

// 查找参数值
function findValue(arg1, arg2) {
    let index = Math.max(argv.indexOf(arg1), arg2 ? argv.indexOf(arg2) : -1)
    if (index > 1) {
        return argv[index + 1]
    }
}

// 查询目标文件
function serialization(arr) {
    var map = {}
    var tmp = arr.slice(0)

    while (tmp.length) {
        let first = tmp.shift()

        if (isArgument(first)) {
            let key = first
            let val = tmp.shift()
            map[key] = val
        }

        if (isValue(first)) {
            map.value = first
        }
    }

    return map
}

function isArgument(item) {
    return item ? item.indexOf('-') === 0 : false
}

function isValue(item) {
    return !isArgument(item)
}