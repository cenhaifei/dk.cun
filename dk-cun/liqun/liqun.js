$(function(){

	$.ajax({
		url:'liqun.txt',
		success:function(_respone){
			createhtml($('#omian'),_respone);	
		}
	})
	  
	var _data=null;
	var alldata;
	function createhtml(_basedom,respone){
		
		if( typeof respone =='string'){
			_data = window.eval("("+respone+")");
			
		}else if( typeof respone =='object'){
			_data = respone;
		}else{
			return false;
		}
		
		if ( _data && typeof _data =='object') {
			alldata = _data instanceof Array ? _data : [_data]; 
		}
		console.log(alldata);
		//遍历出所有alldata 里面 的对象
		$.each(alldata, function(_index,_obj) {
		    var $clone=$(_basedom).clone().appendTo($(_basedom).parent());
		    var $blik=$('[dk-bind]',$clone).add($clone);

		    $.each($blik, function(bidx,blobj) {
		   	    var _val=null;
		   	    var oattr=$(blobj).attr('dk-bind');
		   	    if (oattr) {
		   	 	var oattrs=oattr.split(".");
		   	 	for (var i=0;i<oattrs.length;i++) {
		   	 		_val = i==0? _obj[oattrs[i]] : _val[oattrs[i]]
		   	 		console.log(_val);
		   	 	}
		   	 		$(blobj).text(_val);
		   	 		console.log("1111")
		   	    }
		    });
		   
		   
		});
		$(_basedom).remove();
		
	}
	

})















