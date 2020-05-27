# Vue 記帳

在行動裝置上也能簡潔快速使用的記帳本，並透過月曆、圖表讓資訊一目了然

## 功能介紹

快速建立: 選擇分類、輸入金額，即刻記帳

![快速建立](https://i.imgur.com/DfTzVWB.jpg)
![快速建立](https://i.imgur.com/KeBWC6L.jpg)


---

收支月曆: 透過收支標籤及圖表輕易追蹤當月收支狀況

![收支月曆](https://i.imgur.com/SwFf7CM.jpg)

---

年度分析: 以表格及各式圖表呈現，解析年度收支狀況

![年度分析](https://i.imgur.com/6EUK7Dm.jpg)


## Buid with

1. Vue-cli
2. Vuex
3. [Vuetify](https://vuetifyjs.com/)
4. [Vue-ECharts](https://ecomfe.github.io/vue-echarts/demo/)
5. [Firebase](https://firebase.google.com/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Json-server 版本

啟動 json-server 資料庫監聽
``` bash
$ json-server --watch db.json
```

### Firebase 版本

替換 db-template.js 中的 Firebase 設定

``` javascript=
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

export const db = firebase.firestore();
export const docId = "";
```



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
