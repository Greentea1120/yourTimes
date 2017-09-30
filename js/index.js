
var theTime = {
    //数据
    data : {
        flag : false,   //天数的存储标记
        keepLength : ''     //天数字符串长度
    },
    //加载事件
    onLoad : function(){
        //此处可移入click事件中,再此为了刷新效果
        localStorage.clear();

        $('#clearLocal').click(function(){
            
            window.location.reload();
        })
    },
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
    //通过获取的时间戳,调用时间方法
    putTime : function(inpuTtime){
        this.onLoad();
        var _this = this;
        setInterval(function(){ 
            var getTime = _this.getTimes(inpuTtime);
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
    //将时间绑定到DOM,显示到页面
    outputTime : function(day,hour,min,second){
        var _this = this;
        day = day+'';
        hour = hour < 10 ? '0' + hour + '' : hour +'';
        min = min < 10 ? '0' + min + '' : min + '';
        second = second < 10 ? '0'+second + '' : second +'';

        var $theDay = $('.theDay');
        var $theHour = $('.theHour');
        var $theMin = $('.theMin');
        var $theSecond = $('.theSecond');
        
        var days = day.split('');
        //匹配页面
        if(_this.data.keepLength !== days.length){
            _this.data.flag = false;
        }

        if(days.length > $theDay.length){
            if(!_this.data.flag){
                _this.data.keepLength = days.length
                for(var i=0;i<days.length-$theDay.length;i++){
                    $('.wrap').prepend('<span class="theDay"></span>');
                }
                _this.data.flag = true;
            }
        }
        else if(days.length < $theDay.length){
            if(!_this.data.flag){
                _this.data.keepLength = days.length
                for(var i=0;i<$theDay.length-day.length;i++){
                    $('.wrap .theDay').last().remove();
                }
                _this.data.flag = true;
            }
        }
        
        var hours = hour.split(''),
        mins = min.split(''),
        seconds = second.split('');

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
theTime.putTime(prompt('请输入','1993-11-20'));