/**
 * Created by Administrator on 2017/4/26 0026.
 */
var webSocketServer=require("ws").Server;
var wss=new webSocketServer({port:4567});
function fasong(state,obj){
    wss.clients.forEach(function(client){
        if(state==1){
            client.send(obj.name+"  说: "+obj.neirong);
        }else if(state==0){
            client.send(obj.name+"退出了聊天室");
        }

    })
}
//不知道
var clientLength=1;
wss.on("connection",function(ws){
    var user;
    console.info("恭喜你建立了连接");
    ws.send("当前连接人数是"+clientLength+"人");//客户端用onmessage接send发送的值
    clientLength+=1;
    ws.on("message",function(req,flags){//接送客户端发送的数据 message是固定的
        // console.info(req);
        var obj=eval("("+req+")");
        if(obj.name!=""){
            user=obj;
            fasong(1,obj);
        }
        console.info(obj);
    });
    ws.on("close",function(close){
        console.info("进close了")
        clientLength-=1;
        try{
            console.info(user.name);//此处的console不能删
            fasong(0,user);
        }catch (e){
            console.info("页面刷新了");//此处的console不能删
        }
    })
});