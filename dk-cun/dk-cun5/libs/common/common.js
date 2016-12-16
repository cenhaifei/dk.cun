var cloneDom = function(opts){
	var _default = {
		baseDom: null,
		url: null,
		data: null,
		cloneSize: 0,
		page: false
	}
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加
	
	var $this = this;
	this.init = function(){
		$this.newObj = $.extend(_default, opts);
		if(!newObj.baseDom || newObj.cloneSize < 1){
			return false;
		}
		if(newObj.data && !newObj.data instanceof Array){
			newObj.data = [newObj.data];
		}		
	}

	this.generateHtml = function(){
		for(var i = 0; i < newObj.cloneSize; i++){
			var _cloneDom = $(newObj.baseDom).eq(0).clone().appendTo($(newObj.baseDom).parent());
			$.each($('[dk-bind]', _cloneDom), function(_index, _element){
				if(newObj.data[i]){
					$(_element).text(newObj.data[i][$(_element).attr('dk-bind')])
				}
			})
		}
		$(newObj.baseDom).eq(0).remove();
	}

	this.dkpage = function(_page, _pageSize, _datas){
		console.log(_page);
		var _array = [];
		var min = (_page - 1) *  _pageSize;
		var max = _page * _pageSize -1;
		for(var i = min; i <= max; i++ ){
			_array.push(_datas[i]);
		}
		return _array;
	};
}
//obj{
//nodeName   url     
//}
/*$.get('libs/data/navs.txt?_=' + Math.random(), function(response){
		dkScope.navs = window.eval('(' + response + ')');
		var _html = '';
		jQuery.each(dkScope.navs, function(_index, _obj){
			_html += '<ul>';
			$.each(_obj['nav'], function(_navIndex, _navObj){
				_html += '<li>';
				//<a href="jd.com">家居</a>
				_html += '<a href="' + _navObj.url + '">' + _navObj.title + '</a>';
				_html += '</li>';
			})
			_html += '</ul>';
		})
		$('.dk-banner>div>div').eq(0).html(_html);
	})*/

/**
 * [CreateHtml description]
 * @param {[type]} _baseDom [基础 dom 结构]
 * @param {[type]} _params  [对象]
 */
function CreateHtml(_baseDom){
	var frm = this;
	var _defaluts = {
		url: '',
		data: null,
	};
	var _response = [
		{"caption": "农资", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家居", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家具", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家装", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "厨具", "subNav": [{"id": 1609},{"id": 1606}]},	
	];
	// _response = '[{"caption": "农资", "url": "jd.com", "id": 1}]';
	var _data = null;
	if(typeof _response == 'string'){
		_data = JSON.parse(_response);
	} else if(typeof _response == 'object'){
		_data = _response;
	} else{
		return false;
	}

	if(_data && typeof _data == 'object'){
		_defaluts.data = _data instanceof Array ? _data : [_data];
	}

	//把 _baseDom 转成 jQuery 对象
	var $baseDom = $(_baseDom);


	var dkScope = new Object();

	this.dkFor = function(_paramDom, _paramData){
		_paramDom = $(_paramDom);
		var _dkFors = _paramDom.attr('dk-for').split('=>');
		var _dkForFirst = $.trim(_dkFors[0]);
		var _dkForLast = $.trim(_dkFors[_dkFors.length - 1]);
		var _dkForLastSplit = _dkForLast.split('.')[_dkForLast.split('.').length - 1];
		var _domData = _paramData || _defaluts[_dkForLast];
		if(_paramData){
			$.each(_dkForLast.split('.'), function(_index, _split){
				_domData = _domData[_split];
			})
			console.log(_domData);
		}

		$.each(_domData, function(_index, _data){
			var _cloneDom = _paramDom.clone(true).appendTo(_paramDom.parent());
			var _obj = {};
			_obj[_dkForFirst] = _data;
			_cloneDom.data('data', _obj);
			if($('[dk-for]', _paramDom)[0]){
				frm.dkFor($('[dk-for]', _cloneDom)[0], _obj);
			}
		})
		_paramDom.remove();
	};
	if($baseDom.attr('dk-for') || $('[dk-for]', $baseDom)[0]){
		this.dkFor($baseDom);
	}
}

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}	
})


