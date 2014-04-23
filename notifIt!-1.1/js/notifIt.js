/*
 * notifIt! by @naoxink
 */
function notif(datas) {
    var to = null;
    var defaults = {
        type: "info",
        width: 400,
        height: 60,
        horizontal: "center",
        vertical: "bottom",
        autohide: 1,
        msg: "This is my default message",
        opacity: 1,
        multiline: 0,
        fade: 0,
        bgcolor: "",
        color: "",
        timeout: 5000
    };
    var config = $.extend({} , defaults, datas);
    
    if (config.width === "all") {
        config.width = screen.width - 60;
    }

    if (config.height < 100 && config.height > 0) {
        height = config.height;
    }

    var div = "<div class='ui_notifIt'><p>" + config.msg + "</p></div>";
    $(".ui_notifIt").remove();
    clearInterval(to);
    $("body").append(div);


    if (config.multiline) {
        $(".ui_notifIt").css("padding", 15);
    } else {
        $(".ui_notifIt").css("height", height);
        $(".ui_notifIt p").css("line-height", height + "px");
    }

    $(".ui_notifIt").css("width", config.width);

    $(".ui_notifIt").css("opacity", config.opacity);

    switch (config.type) {
        case "error":
            $(".ui_notifIt").addClass("error");
            break;
        case "success":
            $(".ui_notifIt").addClass("success");
            break;
        case "info":
            $(".ui_notifIt").addClass("info");
            break;
        case "warning":
            $(".ui_notifIt").addClass("warning");
            break;
        default:
            $(".ui_notifIt").addClass("default");
            break;
    }

    $(".ui_notifIt").css("background-color", config.bgcolor);
    
    $(".ui_notifIt").css("color", config.color);
    
    if(config.horizontal === "left" && config.vertical === "top"){
        $(".ui_notifIt").css("left", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("left", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({left: 10});
    }
    if(config.horizontal === "right" && config.vertical === "top"){
        $(".ui_notifIt").css("right", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("right", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({right: 10});
    }
    if(config.horizontal === "center" && config.vertical === "top"){
        var mid = window.innerWidth / 2;
        $(".ui_notifIt").css("top", parseInt(0 - (config.height + 10)));
        $(".ui_notifIt").css("left", mid - parseInt(config.width / 2));
        $(".ui_notifIt").animate({top: 10});
    }
    if(config.horizontal === "left" && config.vertical === "center"){
        var mid = window.innerHeight / 2;
        $(".ui_notifIt").css("top", mid);
        $(".ui_notifIt").css("left", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("left", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({left: 10});
    }
    if(config.horizontal === "right" && config.vertical === "center"){
        var mid = window.innerHeight / 2;
        $(".ui_notifIt").css("top", mid);
        $(".ui_notifIt").css("right", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("right", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({right: 10});
    }
    if(config.horizontal === "center" && config.vertical === "center"){
        var midHeight = window.innerHeight / 2;
        var midWidth = window.innerWidth / 2;
        $(".ui_notifIt").css("top", midHeight);
        $(".ui_notifIt").css("left", midWidth - parseInt(config.width / 2));
        $(".ui_notifIt").hide();
        $(".ui_notifIt").fadeIn("slow");
        config.fade = true;
    }
    if(config.horizontal === "left" && config.vertical === "bottom"){
        $(".ui_notifIt").css('top', 'auto').css("bottom", parseInt(10));
        $(".ui_notifIt").css("left", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("left", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({left: 10});
    }
    if(config.horizontal === "right" && config.vertical === "bottom"){
        $(".ui_notifIt").css('top', 'auto').css("bottom", parseInt(10));
        $(".ui_notifIt").css("right", parseInt(0 - (config.width + 10)));
        $(".ui_notifIt").css("right", parseInt(0 - (config.width * 2)));
        $(".ui_notifIt").animate({right: 10});
    }
    if(config.horizontal === "center" && config.vertical === "bottom"){
        var mid = window.innerWidth / 2;
        $(".ui_notifIt").css('top', 'auto').css("bottom", parseInt(0 - (config.height + 10)));
        $(".ui_notifIt").css("left", mid - parseInt(config.width / 2));
        $(".ui_notifIt").animate({bottom: 10});
    }
    
    $(".ui_notifIt").click(function() {
        notifit_dismiss(to, config);
    });

    if (config.autohide) {
        if (!isNaN(config.timeout)) { // Take the timeout if is a number
            to = setTimeout(function() {
                $(".ui_notifIt").click();
            }, config.timeout);
        }
    }
    
    /*timer resume on hover*/
    $(".ui_notifIt")
    .mouseover(function() {
      clearInterval(to);
    })
    .mouseleave(function() {
      to = setTimeout(function() {
            $(".ui_notifIt").click();
        }, config.timeout);
    });
}

function notifit_dismiss(to, config) {
    clearInterval(to);
    if (!config.fade) {
        switch(config.horizontal){
            case "center":
                if(config.vertical === "top"){
                    $(".ui_notifIt").animate({
                        top: parseInt(config.height - (config.height / 2))
                    }, 100, function() {
                        $(".ui_notifIt").animate({
                            top: parseInt(0 - (config.height * 2))
                        }, 100, function() {
                            $(".ui_notifIt").remove();
                        });
                    });
                }else{
                    $(".ui_notifIt").animate({
                        bottom: parseInt(config.height - (config.height / 2))
                    }, 100, function() {
                        $(".ui_notifIt").animate({
                            bottom: parseInt(0 - (config.height * 2))
                        }, 100, function() {
                            $(".ui_notifIt").remove();
                        });
                    });
                }
            break;
            case "right":
                $(".ui_notifIt").animate({
                    right: parseFloat(config.width - (config.width * 0.9))
                }, 100, function() {
                    $(".ui_notifIt").animate({
                        right: parseInt(0 - (config.width * 2))
                    }, 100, function() {
                        $(".ui_notifIt").remove();
                    });
                });
            break;
            case "left":
                $(".ui_notifIt").animate({
                    left: parseFloat(config.width - (config.width * 0.9))
                }, 100, function() {
                    $(".ui_notifIt").animate({
                        left: parseInt(0 - (config.width * 2))
                    }, 100, function() {
                        $(".ui_notifIt").remove();
                    });
                });
            break;
        }
    } else {
        $(".ui_notifIt").fadeOut("slow", function() {
            $(".ui_notifIt").remove();
        });
    }
}