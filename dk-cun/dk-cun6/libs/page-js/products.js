$(function(){
	var _obj = {
		baseDom:'.products1>ul>li',
		cloneSize: 20,
		url: 'libs/data/products.txt',
		page:true,
		pageDom:'nav>ul>li'
	};
	var products1 = new cloneDom(_obj);

	$('nav').click(function(evt){
		products1.refresh($(evt.target).text())
	})
})