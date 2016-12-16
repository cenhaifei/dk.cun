//封装 => 人的行为操作不要放到封装里面去
function dkpage(){
	var obj = {};
	//_page => 当前页数
	//_pageSize => 每页显示多少数量
	//_datas => 要显示的数据源
	obj.page = function(_page, _pageSize, _datas){
		console.log(_page);
		var _array = [];
		var min = (_page - 1) *  _pageSize;
		var max = _page * _pageSize -1;
		for(var i = min; i <= max; i++ ){
			_array.push(_datas[i]);
		}
		return _array;
	};	
	return obj;
}

$(function(){
	var _obj = {
		baseDom:'.products1>ul>li',
		cloneSize: 20,
		data: []
	};

	var dataSource = [];

	$('nav').click(function(evt){
		// console.log($(evt.target).text());
		if($(evt.target).is('a')){
			$('.products1>ul>li').not(':first-child').remove();
			_obj.data = dkpage().page($(evt.target).text(), _obj.cloneSize, dataSource);
			cloneDom(_obj);
		}
	})

	$.get('libs/data/products.txt?_=' + Math.random(), function(_reponse){
		//定义一个对象用于动态加载产品
		//0 - 19 => 1, 20 -39 => 2, 40 - 69 => 3
		//  (n - 1) * _obj.cloneZize ~ n * _obj.cloneZize - 1
		
		_obj.data = dkpage().page(1, _obj.cloneSize, _reponse);
		
		cloneDom(_obj);
		dataSource = _reponse;
		//计算总页数
		var pageCount = Math.ceil(_reponse.length / _obj.cloneSize);
		//定义一个对象用于动态生成翻页按钮
		var _pageObj = {
			baseDom: 'nav>ul>li',
			cloneSize: pageCount,
			data: []
		};
		for(var i = 1; i < (pageCount >= 5 ? 5 : pageCount); i++){
			_pageObj.data.push({"num": i});
		}
		_pageObj.cloneSize = _pageObj.data.length;
		cloneDom(_pageObj);

	}, 'json')
})