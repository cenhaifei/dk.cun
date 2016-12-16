

$(function(){
	
	$.ajax({
		type:"get",
		url:"libs/data/dkmodel1.txt",
		async:true,
		success:function(respone){
			
			createhtml($('#basedom'),respone);
		}
	});
	
   function createhtml(_basebom,respone){
   	  var allobj;
   	  var _data=null;
   	  if( typeof respone == 'string'){
   	  	_data=window.eval('('+respone+')');
   	  }else if( typeof respone == 'object'){
   	  	_data=respone;
   	  }else{
   	  	return false;
   	  }
   	  
   	  if( _data && typeof _data=="object"){
   	  	 allobj=_data instanceof Array ? _data : [_data];
   	  }
   	 
   	  // console.log(allobj);
   	  $.each(allobj, function(_index,_obj) {
   	  	//克隆
   	  	var $cloneele=$(_basebom).clone().appendTo($(_basebom).parent());
   	  	//用.add来添加多个选择器
   	  	var $bind=$('[dk-bind]',$cloneele).add($cloneele);
	     	// console.log($bind);
   	  	//把每一个对象的属性的值都显示出来
   	  	$.each($bind, function(_indexele,_ele) {   	  		
   	  		console.log(_ele);
   	  		$(_ele).text(_obj[$(_ele).attr('dk-bind')]);
   	  	});
   	  	
   	  	if( $('[dk-for]').attr('dk-for')=='false' || !$('[dk-for]').attr('dk-for') ){
   	  		return false;
   	  		
   	  	}
   	  	
   	  });
   	   
   	   $(_basebom).remove();
   	
   	
   }
   
	
	
})


