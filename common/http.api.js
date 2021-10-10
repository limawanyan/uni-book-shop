// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性
	vm.$u.api = {}
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index', params);
	
	// 认证相关
	vm.$u.api.authLogin = params => vm.$u.post('/api/auth/login',params);	// 登录 
	vm.$u.api.authRegister = params => vm.$u.post('/api/auth/register',params);	// 注册
	
	// 用户相关
	vm.$u.api.userInfo = () => vm.$u.get('/api/user');	 // 用户详情
	
	// 订单相关 
}

export default {
	install
}