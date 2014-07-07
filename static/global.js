define(function(require, exports, module) {
    var $ = require('gallery/jquery/1.8.2/jquery');
    $('.entry-content a').attr('target','_blank');
    //左侧菜单定位
    $(function(){
        //获取要定位元素距离浏览器顶部的距离
        var navTop = $(".header-nav").offset().top;
        //获取要定位元素与边栏的相对距离
        var sidebarBtmFixed = $(".header-nav").outerHeight() + parseInt($("#sidebar-wrapper").closest(".mar").css("marginTop"));
        //获取要定位元素在最底部时的offsetTop
        var nav_maxBottom = $(".footer").offset().top - $("#sidebar-wrapper").outerHeight() - sidebarBtmFixed;
        //滚动条事件
        $(window).scroll(function(){
            //获取滚动条的滚动距离
            var scroT = $(this).scrollTop();
            if(scroT < navTop){                                   //nav未到顶一些如常
                $("#sidebar-wrapper").removeClass('sidebar-fixed-top').css({top: 'auto'});
                $(".navigation").removeClass('navigation-fix navigation-btm').css({top: 'auto'});
            }
            else if(scroT >= navTop && scroT < nav_maxBottom){    //nav到顶sidebar未到底，fixed
                $("#sidebar-wrapper").addClass('sidebar-fixed-top').css({top: 'auto'});
                $(".navigation").addClass('navigation-fix').removeClass('navigation-btm').css({top: 0});
            }
            else{                                               //sidebar到底，fixed取消
                $("#sidebar-wrapper").removeClass('sidebar-fixed-top').offset({top: nav_maxBottom + sidebarBtmFixed});
                $(".navigation").addClass('navigation-fix navigation-btm').offset({top: nav_maxBottom});
            }
        })
    })
    
    // var autoc = require('arale/autocomplete/1.2.3/autocomplete');
    // console.log(autoc);
    var contentNode = $('.document .entry-content');
    var titleNodes=contentNode.find('h2,h3');
    var sidebar=$('.threecol.meta');
    var htmlStr='';
    htmlStr+='<div id="sidebar-wrapper">';
    htmlStr+='<div id="sidebar-fixed-nav">';
    titleNodes.each(function(index){
        if($(this).attr('id')){
            switch(this.nodeName.toUpperCase()){
                case 'H2':
                    if(index!==0){
                        htmlStr+='</dl>';
                    }
                    htmlStr+='<dl>';
                    htmlStr+=('<dt data-index="'+index+'"><a href="#'+$(this).attr('id')+'">' +$(this).text()+'</a></dt>');
                    break;
                case 'H3':
                    htmlStr+=('<dd data-index="'+index+'"><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></dd>');
                    break;
            }
        }
    });
    htmlStr+='</dl>';
    htmlStr+='</div>';
    htmlStr+='</div>';
    sidebar.append(htmlStr);
    titleActive();
    $(window).on('scroll',function(){
        titleActive();
    });
    function titleActive(){
        titleNodes.each(function(index){
            if(this.getBoundingClientRect().bottom>-40 && this.getBoundingClientRect().top<window.innerHeight){
                var curNode=sidebar.find('[data-index="'+index+'"]');
                curNode.closest('dl').siblings('dl').removeClass('active');
                curNode.closest('dl').addClass('active');
                curNode.closest('dl').find('dd').removeClass('active');
                switch(this.nodeName.toUpperCase()){
                    case 'H2':
                        curNode.closest('dl').find('dd').eq(0).addClass('active');
                        break;
                    case 'H3':
                        curNode.addClass('active');
                        break;
                }
                return false;
            }
        });
    }
    $(".navbar-toggle").click(function () {             //小屏下切换菜单
        $(".header-nav").slideToggle(800);
    });
    $(".goTop").click(function () {                     //滚动到顶
        $("body").animate({scrollTop: '0px'}, 800);
    });
    $("#sidebar-fixed-nav a").click(function () {       //动画滚动到指定锚点
        var t = $(this);
        noScrollEvent = true;
        $("body").animate({scrollTop: $(t.attr("href")).offset().top}, 800, function () {
            $(".navigation").fadeOut(400);
            noScrollEvent = false;
        });
        return false;
    })
    var past, noScrollEvent = false;
    $(window).scroll(function () {          //向下滑动时隐藏菜单
        var nav = $(".navigation");
        var cur = $(this).scrollTop();
        setTimeout(function () {
            past = cur;
        }, 0);
        if(noScrollEvent == false){
            if (cur >= past) {
                nav.fadeOut(400);
            } else{
                nav.fadeIn(400);
            };
        }
    })
});
