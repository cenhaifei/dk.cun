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


	var dkScope = new Array();

	this.dkFor = function(){
		var $dkForElement = $('dk-for', $baseDom).add($baseDom);
		//重新定义 baseDom 以防 baseDom 结构发生人为破坏
		$.each($dkForElement, function(_index, _element){
			// var $cloneDom = $baseDom.clone(true).appendTo()
			//找到顶级 dk-for 元素，没有小圆点代表顶级元素
			if($(_element).attr('dk-for')){
				if($.trim($(_element).attr('dk-for').split('=>')[1]).indexOf('.') < 0){
					$baseDom = $(_element);
					return false;
				}
			}
		})
		//重新定义 baseDom 结束
		var $resetData = function(_dom){
			
			var $dkFors = _dom.attr('dk-for').split('=>'); //['tr', 'data']
			//取 dkfor 的属性值最后一个并去前后空格
			var $dkForFirst = $.trim($dkFors[0]); // 'tr'
			//
			var $dkForLast = $.trim($dkFors[$dkFors.length - 1]); // 'data', tr.subNav							
			$.each(_defaluts[$dkForLast], function(_dataIndex, _dataTr){
				var $cloneDom = _dom.clone(true).appendTo(_dom.parent());
				var _obj = {};
				_obj[$dkForFirst] = _dataTr;// {tr: {"caption": "家具", "subNav": [{"id": 1609},{"id": 1606}]}}
				$cloneDom.data('data', _obj);			
			});
			_dom = $('dk-for', _dom);
			if(_dom[0]){
				return false;
			}
			$resetData(_dom);
		}
		$resetData();
		$baseDom.remove();
		//dkScope[$dkFor] = _defaluts[$dkFor];
		// for(var x = 0; x < _defaluts[$dkForLast].length; x++){
		// 	//[{tr: {"caption": "农资", "subNav": [{"id": 1609},{"id": 1606}]}}]
		// 	//tr.subNav =>  [{"id": 1609},{"id": 1606}]
		// 	var _obj = {};
		// 	_obj[$dkForFirst] = dkScope[$dkForLast][x]
		// 	dkScope.push(_obj);
		// }
	};
	this.dkBind = function(){};

	return false;
	if(_defaluts[$dkFor]){
		for(var x = 0; x < _defaluts[$dkFor].length; x++){
			//把数据转换成可视化（视图）
			//克隆基础节点
			var $cloneDom = $baseDom.clone(true).appendTo($baseDom.parent());
			//用属性选择器获取 dk-bind 元素并组合克隆对象本身
			var $dkBind = $('[dk-bind]', $cloneDom).add($cloneDom);
			for(var y = 0; y < $dkBind.length; y++){
				//把当前元素转换成 jQuery 对象
				var _ele = $($dkBind[y]);
				//获取当前对象的属性（dk-bind ）值
				var _attr = _ele.attr('dk-bind'); // url,caption => subNav.name.id
				//如果属性值不为空
				if(_attr){
					//通过小圆点(.)解析属性值
					var _attrs = _attr.split('.'); // ['tr', 'caption']
					//把数据源赋值给一个新的变量
					var _val = new Object();
					_val[$dkForv] = _defaluts[$dkFor][x]; // {'tr': {}}
					for(var z = 0; z < _attrs.length; z++){
						_val = _val[_attrs[z]]; // {}
					}
					//在目标元素输出最终结果
					_ele.text(_val);
				}
			}
			if($baseDom.attr('dk-for')){ 
				continue;
			} else {
				return false;
			}
		}
		$baseDom.remove();
	}
}

