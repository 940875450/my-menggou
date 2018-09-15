require.config({
	baseUrl: "/",
	paths: {
		"jquery": "libs/jquery-1.11.3",
		"cookie":"libs/jquery.cookie",
		"template": "libs/template-web",
		"url": "module/url",
		"header": "module/header",
		"lunbo":"module/lunbo",
		"md5":"libs/md5",
		"servey":"module/servey",
		"rezhuce":"module/rezhuce"

	},
	shim: {
		toast:{
			deps:["jquery"]
		},
		header:{
			deps:["jquery","url","template"]
		},
		lunbo:{
			deps:["jquery"]
		},
		servey:{
			deps:["jquery"]
		},
		rezhuce:{
			deps:["jquery","md5"]
		},
		cookie:{
			deps:["jquery"]
		}
	}
})
