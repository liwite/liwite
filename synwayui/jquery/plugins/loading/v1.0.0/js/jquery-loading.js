﻿/**************************
*Desc:提交操作时遮罩
*Argument:type=0 全屏遮 1局部遮
*Author:lzb
**************************/
(function ($) { 
    $.fn.jqLoading =function(option) {
        var defaultVal = {
            backgroudColor: "#fafafa",//背景色
            estopColor:"black",
            backgroundImage: "/synwayui/jquery/plugins/loading/v1.0.0/img/loading.gif",//背景图片
            text: "正在加载...",//文字 
            width: 150,//宽度
            height: 60,//高度
            type:2 //0全部遮，1 局部遮
            
        };
        //销毁对象
        if (option === "destroy") {
            closeLayer();
        }
        var opt = $.extend({}, defaultVal, option);
        if (opt.type == 0) {
            //全屏遮
            openLayer();
        } else if(opt.type==1) {
            //局部遮(当前对象应为需要被遮挡的对象)
            openPartialLayer(this);
        }
        
      
        
        //设置背景层高
        function height () {
            var scrollHeight, offsetHeight;
            // handle IE 6
            if ($.browser.msie && $.browser.version < 7) {
                scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (scrollHeight < offsetHeight) {
                    return $(window).height();
                } else {
                    return scrollHeight;
                }
                // handle "good" browsers
            }
            else if ($.browser.msie && $.browser.version == 8) {
                return $(document).height() - 4;
            }
            else {
                return $(document).height();
            }
        };
        
        //设置背景层宽
        function width() {
            var scrollWidth, offsetWidth;
            // handle IE
            if ($.browser.msie) {
                scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (scrollWidth < offsetWidth) {
                    return $(window).width();
                } else {
                    return scrollWidth;
                }
            }
            else {
                return $(document).width();
            }
        };
        
        /*==========全部遮罩=========*/
        function openLayer() {
            //背景遮罩层
            var layer = $("<div id='layer'></div>");
            layer.css({
                zIndex:9998,
                position: "absolute",
                height: $(document).height() + "px",
                width: $(document).width()+ "px",
                background: "black",
                top: 0,
                left: 0,
                filter: "alpha(opacity=30)",
                opacity: 0.3
              
            });
           
           //图片及文字层
            var content = $("<div id='content'></div>");
            content.css({
                textAlign: "left",
                position:"absolute",
                zIndex: 9999,
                height: opt.height + "px",
                width: opt.width + "px",
                top: "50%",
                left: "50%",
                verticalAlign: "middle",
                background: opt.backgroudColor,
                borderRadius:"8px",
                fontSize:"13px"
            });
            
            content.append("<img style='vertical-align:middle;margin:"+(opt.height/4)+"px; 0 0 5px;margin-right:5px;' src='" + opt.backgroundImage + "' /><span style='text-align:center; vertical-align:middle;'>" + opt.text + "</span>");
            $("body").append(layer).append(content);
            var top = content.css("top").replace('px','');
            var left = content.css("left").replace('px','');
            content.css("top",(parseFloat(top)-opt.height/2)).css("left",(parseFloat(left)-opt.width/2));
           return this;
        }

        //销毁对象
        function closeLayer() {
            $("#layer,#content,#partialLayer").remove();
            return this;
        }
        
        /*==========局部遮罩=========*/
        function openPartialLayer(obj) {
            var eheight = $(obj).css("height");//元素带px的高宽度
            var ewidth = $(obj).css("width");
            var top = $(obj).offset().top; // 元素在文档中位置 滚动条不影响
            var left = $(obj).offset().left;
            var layer = $("<div id='partialLayer'></div>");
            var load_height_position, load_width_position,	 loadMask_width, loadMask_height
            layer.css({
                style: 'z-index:9998',
                position: "absolute",
                height: eheight,
                width: ewidth,
                background: opt.estopColor,
                top: top,
                left: left,
                filter: "alpha(opacity=60)",
                opacity: 0.1,
                borderRadius:"3px",
                dispaly: "block"
            });
            load_height_position=parseInt(eheight.substring(0,eheight.length-2));
            load_width_position=parseInt(ewidth.substring(0,ewidth.length-2));
            	if(opt.width !=150 && opt.height!=60){
             		loadMask_width=opt.width;
             		loadMask_height=opt.height;
            	}else{
            		loadMask_width=load_width_position*0.5;
            		loadMask_height=load_height_position*0.1;
            	}
			   var content = $("<div id='content'></div>");
				content.css({
					textAlign: "left",
					position:"absolute",
					zIndex: 9999,
					width:loadMask_width,
					height:	loadMask_height,
					top: load_height_position*0.3+top,
					left: load_width_position*0.5+left-loadMask_width*0.5 ,
					verticalAlign: "middle",
					background: opt.backgroudColor,
					borderRadius:"8px",
					fontSize:"10px"
				});
			content.append("<img style='vertical-align:middle;margin:"+(opt.height/4)+"px; 0 0 5px;margin-right:5px;' src='" + opt.backgroundImage + "' /><span style='text-align:center; vertical-align:middle;'>" + opt.text + "</span>");
            $("body").append(layer).append(content);
            return this;
        }
    };
    
})(jQuery)