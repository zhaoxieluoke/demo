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
                    $(".play").on("click", function(){
                        $(".player").addClass("run");
                        $(".play").text("NEXT");
                        $("#music").attr("src",res.data.mp3.url);
                        $(".music_info .song_name").text(res.data.name);
                        $(".music_info .song_author").text(res.data.ar[0].name);    
                        var playPromise = document.querySelector('#music').play();

                        // In browsers that don’t yet support this functionality,
                        // playPromise won’t be defined.
                        if (playPromise !== undefined) {
                            playPromise.then(function() {
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

var promise_way =function promise_way(){
    $.ajax()
}
