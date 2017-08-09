$(function(){

});

//快递查询
function queryEms(){
    var emsname = $("#emsname").val();
    var number = $("#number").val();
    ajaxPostCallback("/api/queryLogistics",{"emsname":emsname,"number":number},function(data){
        var json = eval("(" + data + ")");
        if(json.status == 200){
            alert(json.message);
        }else{
            alert(json.message);
        }
    });
}