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
	var _defaluts = {
		url: '',
		data: null,
	};
	var _response = [
		{"caption": "农资", "url": "jd.com", "id": 1, "subNav": {"title": "敌敌畏", "name": [{"id": 1609},{"id": 1606}]}},
		{"caption": "家居", "url": "jd.com", "id": 2, "subNav": {"title": "敌敌畏", "name": [{"id": 1609},{"id": 1606}]}},
		{"caption": "家具", "url": "jd.com", "id": 3, "subNav": {"title": "敌敌畏", "name": [{"id": 1609},{"id": 1606}]}},
		{"caption": "家装", "url": "jd.com", "id": 4, "subNav": {"title": "敌敌畏", "name": [{"id": 1609},{"id": 1606}]}},
		{"caption": "厨具", "url": "jd.com", "id": 5, "subNav": {"title": "敌敌畏", "name": [{"id": 1609},{"id": 1606}]}},	
	];
	// _response = '[{"caption": "农资", "url": "jd.com", "id": 1}]';
	console.log(typeof _response);
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
	for(var x = 0; x < _defaluts.data.length; x++){
		//把数据转换成可视化（视图）
		var $cloneDom = $baseDom.clone(true).appendTo($baseDom.parent());
		var $dkBind = $('[dk-bind]', $cloneDom).add($cloneDom);
		for(var y = 0; y < $dkBind.length; y++){
			var _ele = $($dkBind[y]);
			var _attr = _ele.attr('dk-bind'); // url,caption => subNav.name.id
			if(_attr){
				var _attrs = _attr.split('.'); // ['subNav', 'title']
				var _val = _defaluts.data[x];
				for(var z = 0; z < _attrs.length; z++){
					//_attrs[0] => 'subNav' => _attrs[1] => 'title'
					//_defaluts.data[x]['title'] => '敌敌畏' => {"title": "敌敌畏", "name": {"id": 1609}}
					// if(z == 0){
					// 	_val = _defaluts.data[x][_attrs[z]]; //{"title": "敌敌畏", "name": {"id": 1609}}
					// } else {
					// 	_val = _val[_attrs[z]]; // 敌敌畏
					// }
					_val = _val[_attrs[z]];
					// _val = z == 0 ? _defaluts.data[x][_attrs[z]] : _val[_attrs[z]];
				}
				_ele.text(_val);
			}
			// _ele.text(_defaluts.data[x]['subNav']['title']);
		}
		if($baseDom.attr('dk-for') === "true"){
			continue;
		} else {
			return false;
		}
	}
	$baseDom.remove();
}

