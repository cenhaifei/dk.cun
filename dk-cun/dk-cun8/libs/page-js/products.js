$(function(){
	var _obj = {
		baseDom:'.products1>ul>li',
		cloneSize: 20,
		url: 'libs/data/products.txt',
		pageContainer: '#pagination-demo1',
		page: true
	};
	var products1 = new cloneDom(_obj);

	$('nav').click(function(evt){
		products1.refresh($(evt.target).text())
		// console.log($(evt.target).text());
		// if($(evt.target).is('a')){
		// 	$('.products1>ul>li').not(':first-child').remove();
		// 	_obj.data = dkpage().page($(evt.target).text(), _obj.cloneSize, dataSource);
		// 	cloneDom(_obj);
		// }
	})
})