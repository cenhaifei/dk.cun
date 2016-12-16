$(function(){
	$.ajax({
		url:"libs/data/dkmodel1.txt",
		success:function(res){
			createhtml($('.bas'),res);
		}
		// var _url = 'libs/data/navs.txt?_'+Math.random();
		// var createhtml = new createhtml($('[dk-for]'),_url);
	});
	function createhtml(basbom,res){
		var _obj;
		var _data=null;
		if( typeof res == 'string'){
			_data=window.eval('('+res+')');
		}else if( typeof res == 'object'){
			_data=res;
		}else{
			return false;
		}

		if( _data && typeof _data=="object"){
			_obj=_data instanceof Array ? _data : [_data];
		}
		$.each(_obj, function(ind,oBj) {
			var $clele=$(basbom).clone().appendTo(basbom.parent());
			var $bind=$('[dk-bind]',$clele).add($clele);
			$.each($bind, function(idx,ele) {   	  		
				// console.log(ele);
				$(ele).text(oBj[$(ele).attr('dk-bind')]);
			});
			if( $('[dk-for]').attr('dk-for')=='false' || !$('[dk-for]').attr('dk-for') ){
				return false;
			}
		}); 	   
		$(basbom).remove();  	
	}
});

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}
	
}) 