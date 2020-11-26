
var listAnimSSSelect = [];

var listAnimScreenShot = [];
var viewWidth = document.documentElement.clientWidth;
var viewHeight = document.documentElement.clientHeight;

document.querySelectorAll("#animateSceenshot").forEach((item) => {
    listAnimScreenShot.push({
        layer : item,
        fixLeft : parseInt(item.style.marginLeft, 10),
        position : {
            x : item.getBoundingClientRect().x,
            y : item.getBoundingClientRect().y
        }
    });
});

for (var i = 0; i < listAnimScreenShot.length; i++) {
     var layer = listAnimScreenShot[i].layer;
     var jlayer = $(layer);
     listAnimScreenShot[i].amount = 0;
     if (listAnimScreenShot[i].position.x / viewWidth < 0.4) {
        listAnimScreenShot[i].hideLeft = -viewWidth * 0.5;
        jlayer.css({'margin-left' : listAnimScreenShot[i].hideLeft + 'px'});
     }
     else {
        listAnimScreenShot[i].hideLeft = viewWidth * 1.5;
        jlayer.css({'margin-left' : listAnimScreenShot[i].hideLeft + 'px'});
     }
}

window.onresize = function() {
    onchangeview();
};

window.onscroll = function(){
    onchangeview();
    //scrollimageeffect();
};

var onchangeview = function() {
    //var scrolltop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    viewWidth = document.documentElement.clientWidth;
    viewHeight = document.documentElement.clientHeight;
    // console.log(scrolltop);
    listAnimSSSelect.splice(0,listAnimSSSelect.length)

    for(var i = 0; i < listAnimScreenShot.length; i++) {
        var layer = listAnimScreenShot[i].layer;
        var rect =layer.getBoundingClientRect();
        var jlayer = $(layer);
        // console.log(rect.top);
        if (rect.top > 0 && rect.top < viewHeight) {
            listAnimSSSelect.push(listAnimScreenShot[i]);
        }
        else {
            var layer = listAnimScreenShot[i].layer;
            var jlayer = $(layer);
            listAnimScreenShot[i].amount = 0;
            if (listAnimScreenShot[i].position.x / viewWidth < 0.4) {
                listAnimScreenShot[i].hideLeft = -viewWidth * 0.5;
                jlayer.css({'margin-left' : listAnimScreenShot[i].hideLeft + 'px'});
            }
            else {
                listAnimScreenShot[i].hideLeft = viewWidth * 1.5;
                jlayer.css({'margin-left' : listAnimScreenShot[i].hideLeft + 'px'});
            }
        }
    }
}

var imagesdemo = document.querySelectorAll("#imagedemo");

var scrollimageeffect = function() {
    var scrolltop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var speed = 720 / document.documentElement.clientHeight;
    //console.log(windowHeight);
    //scrolltop -= 500;

    for(var i = 0; i < imagesdemo.length; i++) {
        scrolltop -= 720;
        var layer = imagesdemo[i];
        var y = (scrolltop - layer.offsetTop) * 0.05 * speed;
        //console.log(y);
        layer.style.backgroundPosition = "0px " + y + "px";
        imagesdemo[i].style.backgroundPosition = "0px " + y + "px";
        
    }
}

$("#btn-main").click(function(){
    window.scrollTo(0, 0);
});

$("#btn-shop").click(function() {
    window.scrollTo(0, $("#item-shop").position().top - 50);
});

$("#btn-privacy").click(function() {
    
});

var update = setInterval(function() {
    for (var i = 0; i < listAnimSSSelect.length; i++) {
        if (listAnimSSSelect[i].amount < 1) {
            listAnimSSSelect[i].amount += 0.1;
            listAnimSSSelect[i].amount = clamp(listAnimSSSelect[i].amount, 0, 1);          
            var layer = listAnimSSSelect[i].layer;
            var jlayer = $(layer);
            var left = lerp(listAnimSSSelect[i].hideLeft, listAnimSSSelect[i].fixLeft, listAnimSSSelect[i].amount)
            jlayer.css({'margin-left' : left + 'px'});
        }
    }

    animpcb();
}, 50);

var pcbAnimStack = 0;
var pcbAnimInvert = false;
var animpcb = function() {
    if (!pcbAnimInvert) {
        pcbAnimStack += 0.05;
        if (pcbAnimStack > 1) {
            pcbAnimInvert = true;
            // pcbAnimStack = 0;
        }
    }
    else {
        pcbAnimStack -= 0.05;
        if (pcbAnimStack < 0) {
            pcbAnimInvert = false;
            // pcbAnimStack = 0;
        }
    }

    $("#pcb-demo #connect-0").css({'opacity' : clamp( pcbAnimStack, 0.5, 1)});
    $("#pcb-demo #connect-1").css({'opacity' : clamp(1 - pcbAnimStack, 0.5, 1)});
}

var lerp = function(a, b, f)
{
    return a + f * (b - a);
}

var clamp = function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

var setcontentcolor = function(color) {
    $(".content").css({'background-color' : color});
}

$("#app-icon").click(function() {
    setcontentcolor('white');
});
