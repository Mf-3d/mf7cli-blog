"use strict";
(() => {
var exports = {};
exports.id = 610;
exports.ids = [610];
exports.modules = {

/***/ 143:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ client)
});

;// CONCATENATED MODULE: external "microcms-js-sdk"
const external_microcms_js_sdk_namespaceObject = require("microcms-js-sdk");
;// CONCATENATED MODULE: ./libs/client.js

const client = (0,external_microcms_js_sdk_namespaceObject.createClient)({
    serviceDomain: 'mf7cli-blog',
    apiKey: process.env.API_KEY
});


/***/ }),

/***/ 502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlogId),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(143);

// pages/blog/[id].js

function BlogId({ blog  }) {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: blog.title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: blog.publishedAt
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                dangerouslySetInnerHTML: {
                    __html: `${blog.body}`
                }
            })
        ]
    }));
};
// 静的生成のためのパスを指定します
const getStaticPaths = async ()=>{
    const data = await _libs_client__WEBPACK_IMPORTED_MODULE_1__/* .client.get */ .L.get({
        endpoint: "blog"
    });
    const paths = data.contents.map((content)=>`/blog/${content.id}`
    );
    return {
        paths,
        fallback: false
    };
};
// データをテンプレートに受け渡す部分の処理を記述します
const getStaticProps = async (context)=>{
    const id = context.params.id;
    const data = await _libs_client__WEBPACK_IMPORTED_MODULE_1__/* .client.get */ .L.get({
        endpoint: "blog",
        contentId: id
    });
    return {
        props: {
            blog: data
        }
    };
};


/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(502));
module.exports = __webpack_exports__;

})();