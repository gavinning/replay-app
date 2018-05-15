Replay app
---
**文件保存时自动执行**  
nodejs敏捷开发工具，免去手动执行命令行的步骤，每次保存自动执行，控制台即时输出结果


### Install
```sh
npm i replayapp -g
```

### Usage
```sh
Usage: replay [options]

Options:

-V, --version  output the version number
-r, -R         Recursive subfolders
-d, --deep     Recursive subfolders
-i, --ignore   Ignore items
-e, --engine   Runtime environment support (node|python|swift...) (defaults to node)
-h, --help     output usage information
```

只监听``app.js``
```sh
replay app.js
```
监听``app.js``所在的目录 所有``change``事件都会触发
```
replay -r app.js
replay -d app.js
replay --deep app.js
```

#### Example 1
```sh
replay demo/test.js
# => Listening demo/test.js and replay demo/test.js

replay -i app.js -e node -d demo/test.js
# => Listening demo and replay demo/test.js
```

#### Example 2
```sh
replay hello.py -e python
# => Listening hello.py and replay hello.py
```

#### Example 3
```sh
replay main.swift -e swift
# => Listening main.swift and replay main.swift
```