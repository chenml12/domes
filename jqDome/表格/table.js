var data = [
    {
        'id' : 1,
        'username' : 'LEO',
        'age' : 36,
        'sex' : '男'
    },
    {
        'id' : 2,
        'username' : 'MOMO',
        'age' : 16,
        'sex' : '男'
    },
    {
        'id' : 3,
        'username' : 'DUODUO',
        'age' : 29,
        'sex' : '男'
    },
    {
        'id' : 4,
        'username' : '勇升',
        'age' : 46,
        'sex' : '男'
    },
    {
        'id' : 5,
        'username' : '小美',
        'age' : 40,
        'sex' : '女'
    }
];
	var $tBody=$('tbody');
	var id = data.length; //记录新添加时的id
	var num=data.length;
	var checkNum=0;
	var onOff=true;
//	渲染数据
	init(); //通过数据渲染页面
  	function init(){
  		$('#allBtn').prop('checked',false);
	  	$tBody.html('');//清空tBody的内容
	  	//循环数据渲染，顺便隔行变色
	  	$.each(data,function(i,e){
	   		var tr = createTr(e);
	   		$tBody.append(tr);
	   	});
	  }
  	
  	
//	添加按钮
	$('#btn').click(function(){
		//输入姓名框中的value
		var name = $('#nameVal').val();
		//性别列表中的value
		var sex = $('#sex').val();
// 		名字必须填
		if(name.trim()==''){
			alert('请输入姓名');
			return;
		}
   		//年龄为数字
		if(/^\d+$/.test($('#ageVal').val())){
			//获取年龄框中的值
			var age = $('#ageVal').val();
		}else{
			alert('输入正确的年龄');
			return;
		}
		//提交的数据
		var obj = {
	            'id' : ++id,
	            'username' : name,
	            'age' : age,
	            'sex' : sex
	       }
		//新创建的数据push到data数组中
       	data.push(obj); 
       	num++;
       	//创建元素
   		var tr = createTr(obj);
   		$tBody.append(tr);
   		$('#allBtn').prop('checked',false);//添加时取消全选
   		//添加后删除输入框里的内容
   		$('#nameVal').val('');
   		$('#ageVal').val('')
	})

$tBody.on('click',function(ev){
 	var parentTr = $(ev.target).closest('tr');
 	//	上移
 	if(ev.target.className=='upIcon'){
 		if(parentTr.prev().length){
 			parentTr.after(parentTr.prev());
 		}
 	}
 	//下移
 	if(ev.target.className=='downIcon'){
 		if(parentTr.next().length){
 			parentTr.before(parentTr.next());
 		}
 		
 	}
 	//删除
 	if(ev.target.className=='clockIcon'){
 		var $ID=$(ev.target).closest('tr').find('.ID').html()
 		$.each(data,function(a,b){
	   		if($ID==$(b).attr('id')){
	   			data.splice(a,1);
	   		}
	   });
 		//删除结构
   		parentTr.remove();
   		num--;
   		checkNum--;
   		if(!num){
   			$('#allBtn').prop('checked',false);//添加时取消全选
   		}
   		
 	}
// 	点选
 	if(ev.target.className == 'checkBox'){
 		if($(ev.target).prop('checked')){
			checkNum++;
		}else{
			checkNum--;
		}
		//判断全选是否被选中
		if(checkNum==num){
			$('#allBtn').prop('checked',true);
		}else{
			$('#allBtn').prop('checked',false);
		}
		
 	}
 })


//  点击全选
$('#allBtn').click(function(){
	if($(this).prop('checked')){
		$('.checkBox').prop('checked',true);
		num = $('.checkBox').length;
		checkNum=$('.checkBox').length;
	}else{
		$('.checkBox').prop('checked',false);
		num =0;
		checkNum=0;
	}
})
//批量删除
$('.removeChecked').click(function(){
	$('.checkBox').each(function(i,e){
		if($(e).prop('checked')){
//			删除对应的数据
			var $ID=$(this).closest('tr').find('.ID').html();
			$.each(data, function(a,b) {
				if($ID==$(b).attr('id')){
					data.splice(a,1);
					//删除结构
					$(e).closest('tr').remove();
					num--;
					checkNum--;
				}
			});
		}
		$('#allBtn').prop('checked',false);//添加时取消全选
	})
})
//排序
$('thead').click(function(ev){
	if($(ev.target).text()=='ID'){
		if(onOff){
			onOff=false;
			data.sort(function(a,b){
				return b.id-a.id;
			});
			init();
		}else{
			onOff=true;
			data.sort(function(a,b){
				return a.id-b.id;
			});
			init();
		}
		
	}
	if($(ev.target).text()=='年龄'){
		if(onOff){
			onOff=false;
			data.sort(function(a,b){
				return b.id-a.id;
			});
			init();
		}else{
			onOff=true;
			data.sort(function(a,b){
				return a.age-b.age;
			});
			init();
		}
		
	}
})



//	生成的结构
function createTr(data){
   		var str = 
   			`<tr>
        		<td class="w100">
        			 <input type="checkbox" class="checkBox"/>
        		</td>
        		<td class="ID">${data.id}</td>
        		<td>${data.username}</td>
        		<td>${data.age}</td>
        		<td>${data.sex}</td>
        		<td>
        			<div class="icons">
        				<i class="upIcon"></i>
        				<i class="downIcon"></i>
        				<i class="clockIcon"></i>
        			</div>
        		</td>
        	</tr>`;
    		//返回的为JQ对象
    	return $(str);
}
