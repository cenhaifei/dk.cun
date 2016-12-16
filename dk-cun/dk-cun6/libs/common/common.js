var cloneDom = function(opts){
	var _default = {
		baseDom: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false //如果 page = true 的情况，要实现分页

	}
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加	
	$this.newObj = $.extend(_default, opts);
	
	//确定数据源
	var init = function(_page){
		//如果数据源为空则不执行其它操作
		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if($this.newObj.data.length>0){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
			console.log('11111')
		} else if($this.newObj.url)	{
			$.get($this.newObj.url, function(_response){
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
				generateHtml(_page);
				if ($this.newObj.data) {
					lenPage();
				}
			})
			
		}
		return true;
	}

	var generateHtml = function(_page){
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data[0]){
			return false;
		}
		$($this.newObj.baseDom).not(':first-child').remove();
		for(var i = _min; i <= _max; i++){
			if($this.newObj.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')])
				})
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
	}

var lenPage = function(){
		var pageCount = Math.ceil($this.newObj.data.length / $this.newObj.cloneSize);
		//定义一个对象用于动态生成翻页按钮
		var _pageObj = {
			baseDom: $this.newObj.pageDom,
			cloneSize: pageCount,
			data: []
		};
		for(var i = 1; i < (pageCount >= 5 ? 5 : pageCount); i++){
			_pageObj.data.push({"num": i});
		}
		_pageObj.cloneSize = _pageObj.data.length;
		cloneDom(_pageObj);
}
	this.refresh = function(_page){
		var _init = init(_page);
		if(_init){
			generateHtml(_page);
		}
	}
	this.refresh(1);
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


