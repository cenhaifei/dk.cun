var dkFrm = function(dkScope){
	var dkForElements = $('[dk-for]');
	if(!dkForElements[0]){
		return false;
	}
	$.each(dkForElements, function(_index, _element){
		var dkForAttr = $(_element).attr('dk-for'); // dkModels
		if(dkScope[dkForAttr]){
			// dkScope[dkForAttr] === dkScope.dkModels
			for(var i = 0; i < dkScope[dkForAttr].length; i++){
				var $obj = dkScope[dkForAttr][i];
				var $subNav = $obj['subNav'];
				console.log($subNav);
				//$('<a></a>').text($obj.title).attr('href', $obj.url).attr('flag', $obj.id).appendTo(dkForElements);
				var $clone = $(_element).clone().insertAfter($(_element));
				var $dkBind = $('[dk-bind]', $clone).attr('dk-bind'); // aa.a
				var $dkHref = $('[dk-href]', $clone).attr('dk-href');
				$('[dk-bind]', $clone).text($obj['aa']['a']);//$obj.title
				$('[dk-href]', $clone).attr('href', $obj[$dkHref]);//$obj.url
			}
			$(_element).remove();
		}			
	})
						
}

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}

	//实现动态加载的内容首先要考虑数据结构
	//把数据用可视化的形式呈现出来
	var dkScope = {};

	// $.get('libs/data/navs.txt?_=' + Math.random(), function(response){
	// 	dkScope.navs = window.eval('(' + response + ')');
	// 	var _html = '';
	// 	jQuery.each(dkScope.navs, function(_index, _obj){
	// 		_html += '<ul>';
	// 		$.each(_obj['nav'], function(_navIndex, _navObj){
	// 			_html += '<li>';
	// 			//<a href="jd.com">家居</a>
	// 			_html += '<a href="' + _navObj.url + '">' + _navObj.title + '</a>';
	// 			_html += '</li>';
	// 		})
	// 		_html += '</ul>';
	// 	})
	// 	$('.dk-banner>div>div').eq(0).html(_html);
	// })
}) 