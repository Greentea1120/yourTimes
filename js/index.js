$('#clearLocal').click(function(){
    localStorage.clear();
    window.location.reload();
})

var backEndTimeStamp = prompt('请输入您的年龄,注意格式','1993-11-20');    //后台时间戳数据
console.log(backEndTimeStamp)
var theTime = {
    //获取时间戳
    getTimes : function(time){
        var previous;
        if(!localStorage.getItem('previous')){
            previous = new Date(time);
            previous = previous.getTime();
            localStorage.setItem('previous',previous);
        }
        var now = new Date();
        // console.log(localStorage.getItem('previous')+'以前');
        // console.log(now.getTime()+'现在');
        return parseInt(now.getTime()) - parseInt(localStorage.getItem('previous'));
    },
    //通过获取的时间戳来输出时间戳
    putTime : function(){
        var _this = this;
        setInterval(function(){ 
            var getTime = _this.getTimes(backEndTimeStamp);
            //调用时间方法
            _this.theTimeGet(getTime);
        },1000);
    },
    // 根据输出的时间戳得到天 时 分 秒
    theTimeGet : function(getTime){
        var putTime = parseInt(getTime);
        var day = parseInt(putTime/(1000*60*60*24));
        var hour = parseInt((putTime - day*1000*60*60*24)/(1000*60*60));
        var min = parseInt((putTime - day*1000*60*60*24 - hour*1000*60*60)/(1000*60));
        var second = parseInt((putTime - day*1000*60*60*24 - hour*1000*60*60 - min*1000*60)/1000);
        console.log(day,hour,min,second);
        this.outputTime(day,hour,min,second);
    },
    //将时间绑定到DOM
    outputTime : function(day,hour,min,second){
        day = day+'';
        hour = hour+'';
        min = min+'';
        second = second+'';

        var days = day.split(''),
        hours = hour.split(''),
        mins = min.split(''),
        seconds = second.split('');
 
        var $theDay = $('.theDay');
        var $theHour = $('.theHour');
        var $theMin = $('.theMin');
        var $theSecond = $('.theSecond');

        // 渲染天数
        $theDay.each(function (index,el) {
            $(this).html(days[index]);
        })
        $theHour.each(function (index,el) {
            $(this).html(hours[index]);
        })
        $theMin.each(function (index,el) {
            $(this).html(mins[index]);
        })
        $theSecond.each(function (index,el) {
            $(this).html(seconds[index]);
        })
    }

}
// console.log(theTime.getTimes("1993-11-20"));
theTime.putTime();