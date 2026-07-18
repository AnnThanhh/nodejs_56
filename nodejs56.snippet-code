{
	// LOG
	"Print to console log": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "cl",
		"body": [
			"console.log($1);"
		],
		"description": "Log output to console log"
	},
	"Print to console error": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "ce",
		"body": [
			"console.error($1);"
		],
		"description": "Log output to console error"
	},
	"Use Strict": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "us",
		"body": [
			"'use strict';"
		],
		"description": "Use Strict"
	},
	"Classes module": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "clm",
		"body": [
			"import classes from '$1'"
		],
		"description": "import classes module"
	},
	"TProps Template": {
		"scope": "javascriptreact,typescriptreact",
		"prefix": "tp",
		"body": [
			"type TProps = {",
			"   ${1:key}: ${2:type};",
			"};",
		],
		"description": "Quickly generate TypeScript Props for a React component"
	},
	"TypeScript Props Template": {
		"scope": "javascriptreact,typescriptreact",
		"prefix": "rfcet",
		"body": [
			"type TProps = {",
			"   ${1:key}: ${2:type};",
			"};",
			"",
			"function ${TM_FILENAME_BASE}({ ${1:key} }: TProps) {",
			"    return (",
			"      <div>${TM_FILENAME_BASE}</div>",
			"    )",
			"  }",
			"",
			"export default ${TM_FILENAME_BASE}"
		],
		"description": "Quickly generate React component have type TProps"
	},
	// antd
	"antd dark theme": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "antd_DarkTheme",
		"body": [
			"import { ConfigProvider, theme } from 'antd';",
			"<ConfigProvider",
			"   theme={{",
			"       algorithm: theme.darkAlgorithm,",
			"   }}",
			" >",
			"   <App />",
			"</ConfigProvider>"
		],
		"description": ""
	},
	// REDUX
	"Midleware - Toolkit": {
		"scope": "javascript, javascriptreact",
		"prefix": "rxmid",
		"body": [
			"//${1:XXXXX}MID",
			"export const ${1:XXXXX}MID = (requestData) => {",
			"   return async (dispatch) => {",
			"       try {",
			"           const { data, status } = await ${2:XXXXX}Api${3:.XXXXX}(requestData);",
			"           console.log('${1:XXXXX}MID', { data, status });",
			"           if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);",
			"           dispatch(${4:XXXXX}REDU(data.content));",
			"       } catch (err) {",
			"           console.log(err);",
			"       }",
			"   };",
			"};"
		],
		"description": ""
	},
	"Midleware - Toolkit/ TS": {
		"scope": "typescriptreact, typescript",
		"prefix": "rxmid",
		"body": [
			"//${1:XXXXX}MID",
			"export const ${1:XXXXX}MID = (requestData) => {",
			"   return async (dispatch:${2:DispatchType}) => {",
			"       try {",
			"           const { data, status } = await ${3:XXXXX}Api${4:.XXXXX}(requestData);",
			"           console.log('${1:XXXXX}MID', { data, status });",
			"           if (status !== STATE_CODE.SUCCESS) throw new Error(`status: ${status}`);",
			"           dispatch(${4:XXXXX}REDU(data.content));",
			"       } catch (error) {",
			"           console.log(error);",
			"       }",
			"   };",
			"};"
		],
		"description": ""
	},
	"Create store Toolkit": {
		"scope": "javascript, javascriptreact",
		"prefix": "rxStoreToolkit",
		"body": [
			"import { configureStore } from '@reduxjs/toolkit';",
			"",
			"export const store = configureStore({",
			"    reducer: {},",
			"});"
		],
		"description": "Create store of redux toolkit"
	},
	"Create store Toolkit/ TS": {
		"scope": "typescriptreact, typescript",
		"prefix": "rxStoreToolkit",
		"body": [
			"import { configureStore } from '@reduxjs/toolkit';",
			"",
			"const store = configureStore({",
			"    reducer: {},",
			"});",
			"",
			"export type RootState = ReturnType<typeof store.getState>",
			"export type DispatchType = typeof store.dispatch",
			"",
			"export default store"
		],
		"description": "Create store of redux toolkit"
	},
	"Provider store={store}": {
		"prefix": "rxUseStore",
		"body": [
			"import { Provider } from 'react-redux';",
			"",
			"<Provider store={store}>",
			"    <App />",
			"</Provider>;"
		],
		"description": "Create store of redux toolkit"
	},
	//use HOOK
	"useDispatch": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "dispatch",
		"body": [
			"const dispatch = ${1:useAppDispatch}()"
		],
		"description": "useAppDispatch"
	},
	"useTranslation of i18next": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "t1",
		"body": [
			"const { t } = ${1:useTranslation}()"
		],
		"description": "useTranslation"
	},
	"useTranslation of next-intl": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "t2",
		"body": [
			"const t = ${1:useTranslation}()"
		],
		"description": "useTranslation"
	},
	"translate": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "t3",
		"body": [
			"{t(`${1:text}`)}"
		],
		"description": "useTranslation"
	},
	"useSelector": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "useSelector",
		"body": [
			"const { ${1:key} } = ${2:useSelector}(state => state.${3:reducer})"
		],
		"description": "useSelector"
	},
	"useNavigate": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "useNavigate",
		"body": [
			"const navigate = ${1:useNavigate}()"
		],
		"description": "useNavigate"
	},
	"useParams": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "useParams",
		"body": [
			"const {id} = ${1:useParams}()"
		],
		"description": "useParams"
	},
	// ROUTER
	"Router-Thiết lập Router ban đầu": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "routerSetUp",
		"body": [
			"<BrowserRouter>",
			"    <App />",
			"</BrowserRouter>",
			"",
			"<Routes>",
			"    {/* HOME LAYOUT */}",
			"    <Route element={<HomeLayout />}>",
			"        <Route index element={<Home />} />",
			"        <Route path='home' element={<Home />} />",
			"        <Route path='detail/:id' element={<Detail />} />",
			"    </Route>",
			"",
			"    {/* USER LAYOUT */}",
			"    <Route element={<UserLayout />}>",
			"        <Route path='login' element={<Login />} />",
			"        <Route path='signin' element={<SignIn />} />",
			"    </Route>",
			"",
			"    {/* OTHER */}",
			"    <Route path='*' element={<Navigate to={'/'} />} />",
			"</Routes>;"
		],
		"description": "Thiết lập ban đầu router"
	},
	// API
	"API - Thiết lập apiConfig": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "apiConfig",
		"body": [
			"import axios from 'axios';",
			"",
			"// Thiết lập URL cơ sở",
			"axios.defaults.baseURL = 'https://movienew.cybersoft.edu.vn/api';",
			"",
			"// Add a request interceptor",
			"axios.interceptors.request.use(",
			"    function (config) {",
			"        // Do something before request is sent",
			"",
			"        // Kết hợp URL cơ sở và phần đường dẫn cụ thể",
			"        config.url = `${axios.defaults.baseURL}${config.url}`;",
			"        config.headers.TokenCybersoft = '?????';",
			"",
			"        return config;",
			"    },",
			"    function (error) {",
			"        // Do something with request error",
			"        return Promise.reject(error);",
			"    },",
			");",
			"",
			"// Add a response interceptor",
			"axios.interceptors.response.use(",
			"    function (response) {",
			"        // Any status code that lie within the range of 2xx cause this function to trigger",
			"        // Do something with response data",
			"        return response;",
			"    },",
			"    function (error) {",
			"        // Any status codes that falls outside the range of 2xx cause this function to trigger",
			"        // Do something with response error",
			"        return Promise.reject(error);",
			"    },",
			");"
		],
		"description": "Thiết lập apiConfig"
	},
	//NODE.JS API// LOG
	"require": {
		"scope": "javascript, typescript",
		"prefix": "node-req",
		"body": [
			"const ${1:XXXXX} = require('${2:XXXXX}');"
		],
		"description": "require"
	},
	"init": {
		"scope": "javascript, typescript",
		"prefix": "node-init",
		"body": [
			"//app.js",
			"const express = require('express');",
			"",
			"const app = express();",
			"",
			"module.exports = app;",
			"",
			"//server.js",
			"const dotenv = require('dotenv');",
			"dotenv.config();",
			"",
			"const app = require('./app');",
			"",
			"const port = process.env.PORT || 3002;",
			"const server = app.listen(port, async () => {",
			"    console.log(`Lắng nghe cổng http://localhost:${port} ...`);",
			"});"
		],
		"description": "init"
	},
	"content mongoose": {
		"scope": "javascript",
		"prefix": "node-mongooseConnet",
		"body": [
			"const mongoose = require('mongoose');",
			"",
			"// MONGO_PASSWORD=G53743KbdbQfZi66",
			"// MONGO_URI=mongodb+srv://at:<PASSWORD>@cluster0.at2oalc.mongodb.net/?retryWrites=true&w=majority",
			"",
			"// tạo string đường dẫn kết nối với atlas",
			"const MONGO_PASSWORD = process.env.MONGO_PASSWORD;",
			"const DB = process.env.MONGO_URI?.replace('<PASSWORD>', MONGO_PASSWORD);",
			"",
			"//kết nối với atlas",
			"const mongooseConnect = () => {",
			"    mongoose",
			"        .connect(DB)",
			"        .then((connect) => {",
			"            console.log(`Database connection success / name: ${connect.connection.name}`);",
			"        })",
			"        .catch((error) => {",
			"            console.log(`👙  error: ${error}`);",
			"            process.exit();",
			"        });",
			"};",
			"",
			"// Kết nối MongoDB và in thông báo khi thành công:",
			"mongoose.connection.on('connected', () => {",
			"    console.log('Mongodb connected to db');",
			"});",
			"",
			"// Xử lý lỗi khi kết nối MongoDB thất bại:",
			"mongoose.connection.on('error', (err) => {",
			"    console.log(err.message);",
			"});",
			"",
			"// Ngắt kết nối với MongoDB và xử lý khi ứng dụng tắt:",
			"mongoose.connection.on('disconnected', () => {",
			"    console.log('Mongodb connected is disconnected');",
			"});",
			"",
			"// Xử lý kết thúc ứng dụng Node.js:",
			"process.on('SIGINT', async () => {",
			"    await mongoose.connection.close();",
			"",
			"    // đảm bảo kết nối với MongoDB được đóng một cách đúng đắn",
			"    process.exit(0);",
			"});",
			"",
			"module.exports = mongooseConnect;"
		],
		"description": "content mongoose"
	},
	"create model": {
		"scope": "javascript, typescript",
		"prefix": "node-createModel",
		"body": [
			"const mongoose = require('mongoose');",
			"",
			"const userSchema = new mongoose.Schema(",
			"    {",
			"        username: { type: String, required: true, unique: true },",
			"        email: { type: String, required: true, unique: true },",
			"        password: { type: String, required: true },",
			"        createdAt: { type: Date, default: Date.now },",
			"    },",
			"    {",
			"        collection: 'users',",
			"        timestamps: true,",
			"    }",
			");",
			"",
			"// ẩn trường password khi truy vấn",
			"userSchema.path('password').select(false);",
			"",
			"// Tạo model User dựa trên schema đã định nghĩa",
			"const User = mongoose.model('User', userSchema);",
			"",
			"// Xuất model User để sử dụng trong các module khác",
			"module.exports = User;"
		],
		"description": "create model"
	},
	// VUE
	"Vue Init": {
		"scope": "vue",
		"prefix": "vue-init",
		"body": [
			"<template>",
			"",
			"</template>",
			"",
			"<script lang='ts'>",
			"export default {",
			"    setup() {",
			"        return {}",
			"    }",
			"}",
			"</script>",
			"",
			"<style scoped>",
			"",
			"</style>",
		],
		"description": "Vue Init"
	},
	"script composition | ts": {
		"scope": "vue",
		"prefix": "vue-script composition-ts-vue3.vue 👙",
		"body": [
			"<script lang='ts'>",
			"export default {",
			"    setup() {",
			"        return {}",
			"    }",
			"}",
			"</script>",
		],
		"description": "Vue script"
	},
	"module | ts": {
		"scope": "typescript, javascript",
		"prefix": "vue-module-ts-vue3 🩲",
		"body": [
			"import { Module, MutationTree, ActionTree, Commit, Dispatch } from 'vuex';",
			"",
			"// Định nghĩa kiểu cho state",
			"interface ${1:Example}State {",
			"    listExample: null | object;",
			"}",
			"",
			"// Định nghĩa kiểu cho mutations",
			"interface ${1:Example}Mutations extends MutationTree<${1:Example}State> {",
			"    setListExample(state: ${1:Example}State, data: object): void;",
			"}",
			"",
			"// Định nghĩa kiểu cho actions",
			"interface ${1:Example}Actions extends ActionTree<${1:Example}State, any> {",
			"    getListExample(context: { state: ${1:Example}State; commit: Commit; dispatch: Dispatch }): void;",
			"}",
			"",
			"const ${2:example}State: ${1:Example}State = {",
			"    listExample: null,",
			"};",
			"",
			"const ${2:example}Mutations: ${1:Example}Mutations = {",
			"    setListExample(state, data) {},",
			"};",
			"",
			"const ${2:example}Actions: ${1:Example}Actions = {",
			"    async getListExample({ commit, state, dispatch }) {",
			"        try {",
			"        } catch (err) {}",
			"    },",
			"};",
			"",
			"const ${2:example}Module: Module<${1:Example}State, any> = {",
			"    namespaced: true,",
			"    state: ${2:example}State,",
			"    mutations: ${2:example}Mutations,",
			"    actions: ${2:example}Actions,",
			"};",
			"",
			"export default ${2:example}Module;",
		],
		"description": "Vue Module"
	},
	// style
	"Width Height - js/ts": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "at-wh",
		"body": [
			"width: `${1:width}`,",
			"height: `${2:height}`,",
		],
		"description": "Width Height - js/ts"
	},
	"Center - flex": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "at-center-flex",
		"body": [
			"display: `flex`,",
			"alignItems: `center`,",
			"justifyContent: `center`,",
		],
		"description": "Center - transform"
	},
	"Center - transform": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "at-center-transform",
		"body": [
			"position: `absolute`,",
			"top: `50%`,",
			"left: `50%`,",
			"transform: `translate(-50%,-50%)`,",
		],
		"description": "Center - transform"
	},
	// BE - ExpressJS CURD
	"Express CRUD Routes": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "express-router-crud",
		"body": [
			"import express from 'express';",
			"",
			"const ${1:module}Router = express.Router();",
			"",
			"// Tạo route CRUD",
			"${1:module}Router.post('/', ${1:module}Controller.create);",
			"${1:module}Router.get('/', ${1:module}Controller.findAll);",
			"${1:module}Router.get('/:id', ${1:module}Controller.findOne);",
			"${1:module}Router.patch('/:id', ${1:module}Controller.update);",
			"${1:module}Router.delete('/:id', ${1:module}Controller.remove);",
			"",
			"export default ${1:module}Router;"
		],
		"description": "Snippet for Express CRUD routes"
	},
	"Express CRUD Controller": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "express-controller-crud",
		"body": [
			"export const ${1:module}Controller = {",
			"   async create(req, res, next) {",
			"      try {",
			"         const result = await ${2:${1:module}Service}.create(req);",
			"         const response = ${3:responseSuccess}(result, `Create ${1:module} successfully`);",
			"         res.status(response.statusCode).json(response);",
			"      } catch (err) {",
			"         next(err);",
			"      }",
			"   },",
			"",
			"   async findAll(req, res, next) {",
			"      try {",
			"         const result = await ${1:module}Service.findAll(req);",
			"         const response = responseSuccess(result, `Get all ${1:module}s successfully`);",
			"         res.status(response.statusCode).json(response);",
			"      } catch (err) {",
			"         next(err);",
			"      }",
			"   },",
			"",
			"   async findOne(req, res, next) {",
			"      try {",
			"         const result = await ${1:module}Service.findOne(req);",
			"         const response = responseSuccess(result, `Get ${1:module} #${req.params.id} successfully`);",
			"         res.status(response.statusCode).json(response);",
			"      } catch (err) {",
			"         next(err);",
			"      }",
			"   },",
			"",
			"   async update(req, res, next) {",
			"      try {",
			"         const result = await ${1:module}Service.update(req);",
			"         const response = responseSuccess(result, `Update ${1:module} #${req.params.id} successfully`);",
			"         res.status(response.statusCode).json(response);",
			"      } catch (err) {",
			"         next(err);",
			"      }",
			"   },",
			"",
			"   async remove(req, res, next) {",
			"      try {",
			"         const result = await ${1:module}Service.remove(req);",
			"         const response = responseSuccess(result, `Remove ${1:module} #${req.params.id} successfully`);",
			"         res.status(response.statusCode).json(response);",
			"      } catch (err) {",
			"         next(err);",
			"      }",
			"   }",
			"};"
		],
		"description": "Snippet for Express CRUD controller"
	},
	"Express V5 CRUD Controller": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "express-v5-controller-crud",
		"body": [
			"export const ${1:module}Controller = {",
			"   async create(req, res, next) {",
			"      const result = await ${2:${1:module}Service}.create(req);",
			"      const response = ${3:responseSuccess}(result, `Create ${1:module} successfully`);",
			"      res.status(response.statusCode).json(response);",
			"   },",
			"",
			"   async findAll(req, res, next) {",
			"      const result = await ${1:module}Service.findAll(req);",
			"      const response = responseSuccess(result, `Get all ${1:module}s successfully`);",
			"      res.status(response.statusCode).json(response);",
			"   },",
			"",
			"   async findOne(req, res, next) {",
			"      const result = await ${1:module}Service.findOne(req);",
			"      const response = responseSuccess(result, `Get ${1:module} #${req.params.id} successfully`);",
			"      res.status(response.statusCode).json(response);",
			"   },",
			"",
			"   async update(req, res, next) {",
			"      const result = await ${1:module}Service.update(req);",
			"      const response = responseSuccess(result, `Update ${1:module} #${req.params.id} successfully`);",
			"      res.status(response.statusCode).json(response);",
			"   },",
			"",
			"   async remove(req, res, next) {",
			"      const result = await ${1:module}Service.remove(req);",
			"      const response = responseSuccess(result, `Remove ${1:module} #${req.params.id} successfully`);",
			"      res.status(response.statusCode).json(response);",
			"   }",
			"};"
		],
		"description": "Snippet for Express CRUD controller (Express v5)"
	},
	"Express CRUD Service": {
		"scope": "javascript, javascriptreact, typescriptreact, typescript",
		"prefix": "express-service-crud",
		"body": [
			"export const ${1:module}Service = {",
			"   async create(req) {",
			"      return `This action create`;",
			"   },",
			"",
			"   async findAll(req) {",
			"      return `This action returns all ${1:module}`;",
			"   },",
			"",
			"   async findOne(req) {",
			"      return `This action returns a id: ${req.params.id} ${1:module}`;",
			"   },",
			"",
			"   async update(req) {",
			"      return `This action updates a id: ${req.params.id} ${1:module}`;",
			"   },",
			"",
			"   async remove(req) {",
			"      return `This action removes a id: ${req.params.id} ${1:module}`;",
			"   }",
			"};"
		],
		"description": "Snippet for Express CRUD service"
	}
}