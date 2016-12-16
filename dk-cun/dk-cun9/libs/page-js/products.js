$(function(){
	var _obj = {
		baseDom:'.products1>ul>li',
		cloneSize: 20,
		url: 'libs/data/products.txt',
		pageContainer: '#pagination-demo1',
		page: true
	};
	// var products1 = new cloneDom(_obj);
	$('products1').cloneDom(_obj);
	
})