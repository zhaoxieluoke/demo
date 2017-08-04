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
            var num = Math.floor(Math.random()*274);

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
                        var num = Math.floor(Math.random()*274);
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

})

var promise_way = function promise_way(){
    $.ajax()
}
