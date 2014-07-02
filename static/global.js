define(function(require, exports, module) {
  var $ = require('gallery/jquery/1.8.2/jquery');
  $('.entry-content a').attr('target','_blank');
    function whiteBtm () {
        if($(".content").hasClass("ninecol") && $(window).width() > 640){
            var elH = $(".entry-content ul:last").outerHeight(true) + $(".entry-content ul:last").prev().outerHeight(true);
            var ftH = $(".footer").outerHeight(true);
            var hdH = $(".header-nav").outerHeight(true);
            var wdH = $(window).height();
            var whiteSpace = wdH - hdH - ftH - elH;

            $(".content").css({marginBottom: whiteSpace + "px"});       //底栏补白                
        }
        else{
            $(".content").css({marginBottom: "30px"});       //底栏补白
        }
    }
    //左侧菜单定位
        $(function(){
            whiteBtm();
            $(window).resize(function () {
                whiteBtm();
            })
            //获取要定位元素距离浏览器顶部的距离
            var navH = $(".header-nav").offset().top;
            //获取要定位元素与边栏的相对距离
			var sidebar_fixed_top = $(".header-nav").outerHeight() + parseInt($("#sidebar-wrapper").closest(".mar").css("marginTop"));
            //滚动条事件
            $(window).scroll(function(){
                //获取滚动条的滑动距离
                var scroH = $(this).scrollTop();
				//获取要定位元素在最底部时的offsetTop
				var nav_maxBottom = $(".footer").offset().top - $("#sidebar-wrapper").outerHeight() - sidebar_fixed_top;
				//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
                if(scroH < navH){
                    $("#sidebar-wrapper").removeClass('sidebar-fixed-top').css({top: 'auto'});
                    $(".navigation").removeClass('navigation-fix navigation-btm').css({top: 'auto'});
                }
                else if(scroH >= navH && scroH < nav_maxBottom){
                    $("#sidebar-wrapper").addClass('sidebar-fixed-top').css({top: 'auto'});
                    $(".navigation").addClass('navigation-fix').removeClass('navigation-btm').css({top: 0});
                }
                else{
                    $("#sidebar-wrapper").removeClass('sidebar-fixed-top').offset({top: nav_maxBottom + sidebar_fixed_top});
                    $(".navigation").addClass('navigation-fix navigation-btm').offset({top: nav_maxBottom});
                }
            })
        })
    
  // var autoc = require('arale/autocomplete/1.2.3/autocomplete');
  // console.log(autoc);
  var contentNode=$('.document .entry-content');
        var titleNodes=contentNode.find('h2,h3');
        var sidebar=$('.threecol.meta');
        $('.sub-nav').hide();
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
        $(".navbar-toggle").click(function () {             //显示隐藏菜单
            $(".header-nav").slideToggle(800);
        });
        $(".goTop").click(function () {                     //滚动到顶
            $("body").animate({scrollTop: '0px'}, 800);
        });
        $("#sidebar-fixed-nav a").click(function () {       //动画滚动到指定项
            $("body").animate({scrollTop: $($(this).attr("href")).offset().top - 57}, 800);
            return false;
        })
});
