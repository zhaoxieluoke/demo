$(function(){
    $.get({
        url: "https://bird.ioliu.cn/netease/playlist?id=39742899"
    })
    .then(function(res){
        if(res.code == 200){
            var music_list = [];
            $.each(res.privileges, function(index, ele){
                music_list.push(ele.id);
            })
            //console.dir(music_list);
            var num = Math.floor(Math.random()*music_list.length);

            $.get({
                url: "https://bird.ioliu.cn/netease/song?id=" + music_list[num],
            })
            .then(function(res){
                if(res.status.code == 200){
                    var url = res.data.mp3.url; 
                    var name = res.data.name;
                    var author = res.data.ar[0].name;
                    $(document).on("click", ".play", function(){
                        $(".player").removeClass("run");
                        $(".play").text("NEXT");
                        $("#music").attr("src", url);
                        $(".music_info .song_name").text(name);
                        $(".music_info .song_author").text(author);    
                        var playPromise = document.querySelector('#music').play();
                        document.querySelector('#music').onplaying = function(){
                            $(".player").addClass("run");
                        }
                        var num = Math.floor(Math.random()*music_list.length);
                        $.get({
                            url: "https://bird.ioliu.cn/netease/song?id=" + music_list[num],
                        })
                        .then(function(res){
                            url = res.data.mp3.url;
                            name = res.data.name;
                            author = res.data.ar[0].name;
                        })
                        // In browsers that don’t yet support this functionality,
                        // playPromise won’t be defined.
                        if (playPromise !== undefined) {
                            
                            playPromise.then(function() {
                                var flag = true;
                                
                                $(document).on("click", ".player", function(){
                                    if(flag){
                                        document.querySelector('#music').pause();
                                        $(this).addClass("runPaused");
                                        flag = false;
                                    }else{
                                        document.querySelector('#music').play();
                                        $(this).removeClass("runPaused");
                                        flag = true;
                                    }

                                })
                                
                                // Automatic playback started!
                            }).catch(function(error) {
                                // Automatic playback failed.
                                // Show a UI element to let the user manually start playback.
                            });
                        }   
                    })
                }
            })
        }
    })
    skin();
})
var skin = function skin() {
    $(".menu_icon").on("click", function(){

        $(".main_menu").css("transform","translateX(0)");
        $(".main_menu .menu_close").css("transform", "rotate(90deg)");

    })
    $(".container").on("click", ".theme_light", function(){
        theme_light();
        menu_close();
    })
    $(".menu_close").on("click", function(){
        menu_close();
    })
    var menu_close = function menu_close() {
        $(".main_menu").css("transform","translateX(100%)");
        $(this).css("transform", "rotate(0deg)");
    }

    var theme_light  = function theme_light() {
        $(".container").css("backgroundImage", "url(src/images/light.jpg)");
        $(".player").css({
            "backgroundColor":"rgba(0, 0, 0, 0.15)"
        })
        $("h3").css("color", "#ff9e00");
        $(".player").addClass("player_light");
        $(".btn").css({
            "backgroundColor": "#f99500",
            "color": "#faf2ff"
        })
    }
}

