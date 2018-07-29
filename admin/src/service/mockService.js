/**
 * 接口api配置	
 */

const mockService = {
	getForecast: {
		moduleName: 's6/weather',
		serverName: 'forecast',
		type: 'get',
		isMock: false,
		overUrl: ''
	},
	login: {
		moduleName: 'admin',
		serverName: 'login.php',
		type: 'post',
		isMock: false,
		overUrl: ''
	}

}

export default mockService
