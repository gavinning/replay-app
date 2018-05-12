Replay app
---
**文件保存时自动执行**  
nodejs敏捷开发工具，免去手动执行``node app.js``，每次保存自动执行，控制台即时输出结果


### Install
```sh
npm i replayapp -g
```

### Usage
```sh
replay -h

# alias rp
rp -h

# or fullname
replayapp -h
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