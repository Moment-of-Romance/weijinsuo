/**
 * Created by 54023 on 2017/8/1.
 */
$(function () {
    wjsBanner();
    //工具提示
    $("[data-toggle=tooltip]").tooltip();
    //产品tap条滚动
    initTap();
});

var wjsBanner = function () {
    //1.创建需要动态生成的数据数组
    var data = [{
        imgurl: "images/slide_01_2000x410.jpg",
        imgsrc: "images/slide_01_640x340.jpg"
    }, {
        imgurl: "images/slide_02_2000x410.jpg",
        imgsrc: "images/slide_02_640x340.jpg"
    }, {
        imgurl: "images/slide_03_2000x410.jpg",
        imgsrc: "images/slide_03_640x340.jpg"
    }, {
        imgurl: "images/slide_04_2000x410.jpg",
        imgsrc: "images/slide_04_640x340.jpg"
    }
    ];
    //动态渲染
    var render = function () {
        //2.判断屏幕的大小，根据大小来渲染不同数据
        var ism = $(window).width() < 768 ? true : false;
        //3.创建需要渲染的标签结构
        var pointBox = "";
        var imgBox = "";
        $.each(data, function (i,item) {
            pointBox += "<li data-target='#carousel-example-generic' data-slide-to='"+i+"' class='"+(i==0?"active":"")+"'></li>";
            imgBox +="<div class='item "+(i==0?"active":"")+"'>";
            if(ism){
                imgBox +="<a href='javascript:;' class='m_banner'><img src='"+item.imgsrc+"' alt=''></a>";
            }else{
                imgBox +="<a href='javascript:;' class='pc_banner' style='background-image:url("+item.imgurl+"); background-size:cover'></a>";
            }
            imgBox +="</div>";
        });
        //4.添加元素
        $(".carousel-indicators").html(pointBox);
        $(".carousel-inner").html(imgBox);
    };
    //5.主动触发，自己捡测频幕大小
    $(window).on("resize", function () {
        render();
    }).trigger("resize");
    //6.手势滑动，移动到上一张，下一张
    var startX = 0;
    var distance = 0;
    var isMove = false;
    $(".wjs_banner").on("touchstart", function (e) {
        console.log(e);
        startX = e.originalEvent.touches[0].clientX;
    }).on("touchmove", function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distance = moveX - startX;
        isMove = true;
    }).on("touchend", function (e) {
        if(isMove && Math.abs(distance)>50){
            //distance 大于零 上一张
            if(distance>0){
                $(".carousel").carousel("prev");
            }else{
                //小于零 下一张
                $(".carousel").carousel("next");
            }
            startX = 0;
            distance = 0;
            isMove = false;
        }
    })
};

var initTap = function () {
    var $productTap = $(".product_nav");
    var $ul = $productTap.children("ul");
    var $lis = $ul.find("li");
    var width = 0 ;
    $lis.each(function (i, item) {
        width += $(item).outerWidth(true);
    });
    $ul.width(width);
    new IScroll(".product_nav",{
        scrollX:true,
        scrollY:false
    })
};