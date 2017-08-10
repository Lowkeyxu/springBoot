$(function(){

});

//快递查询
function queryEms(){
    var type = $("#type").val();
    var number = $("#number").val();
    ajaxPostCallback("/api/queryLogistics",{"type":type,"number":number},function(data){
        if(data != ""){
            var json = eval("(" + data + ")");
            if(json.status == 200){
                var _html = "";
                var weekday=new Array(7);
                weekday[0]="星期天";
                weekday[1]="星期一";
                weekday[2]="星期二";
                weekday[3]="星期三";
                weekday[4]="星期四";
                weekday[5]="星期五";
                weekday[6]="星期六";
                $(json.data).each(function(i,v){
                    var date = new Date(v.time);
                    _html += "<tr class=\"last\"><td class=\"row1\">";
                    _html += "<span class=\"day\">"+v.time+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"week\">"+weekday[date.getUTCDay()]+"</span>";
                    _html += "</td><td class=\"status status-check\">&nbsp;<div class=\"col2\"><span class=\"step\"><span class=\"line1\"></span>" +
                        "</span></div></td><td class=\"context\">"+ v.context+"</td></tr>";
                });
                $("#resultEMS").html(_html);
            }else{
                alert(json.message);
            }
        }else{
            alert("请求失败");
        }
    });
}
