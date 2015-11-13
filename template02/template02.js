/*!
 * HTML5 Video Player Template 02
 * http://html5videoplayer.net/
 *
 * Copyright 2012, socusoft.com
 */

$(function () {


    var videoBox = [];

    function pauseAllVideo() {

        $("#VideoWrapper").find("video").each(function () {
            if ($(this)[0].pluginType == "native") {



                $(this)[0].pause();

            }
            else {

                $(this)[0].player.pause();

            }
        });

    }

    function showVideo(vitem) {


        var videoID = vitem.attr('alt');
        var widthHeight = vitem.attr('rel').split('x');
        var bAutoPlay = vitem.attr('autoplay');
        var bLoop = vitem.attr('loop');

        var strAutoPlay, strLoop;

        if (bAutoPlay != null) {
            strAutoPlay = ' autoplay="autoplay" ';
        }
        else {
            strAutoPlay = ' ';
        }

        if (bLoop != null) {
            strLoop = ' loop="loop" ';
        }
        else {
            strLoop = ' ';
        }

        //hide all videos
        $("#VideoWrapper").find("div[class=videoNode]").hide();

        //video is does not exist
        if (videoBox[videoID] == null) {

            var PlayerSkin;
            if (widthHeight[2] == "TED")
                PlayerSkin = 'class="mejs-ted"';
            else if (widthHeight[2] == "WMP")
                PlayerSkin = 'class="mejs-wmp"';
            else
                PlayerSkin = ' ';


            var videoStr = '<div class="videoNode" id="VideoBox_' + videoID + '">\n<video ' + PlayerSkin + strAutoPlay + strLoop + ' id="' + videoID + '" controls preload="none" width="' + widthHeight[0] + '" height="' + widthHeight[1] + '"\n' +
                '\tposter="poster/' + videoID + '.jpg"">\n' +
                '\t<source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />\n' +
                '\t<source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm" />\n' +
                '\t<source src="http://techslides.com/demos/sample-videos/small.ogv" type="video/ogg" />\n' +
                '</video>\n</div>';

            var vbox = $("#VideoWrapper").append(videoStr);
            videoBox[videoID] = vbox;

            $("#" + videoID).mediaelementplayer({
                plugins: ['flash', 'silverlight']
            });


        }
        else {

            $("#VideoBox_" + videoID).show();
        }
    }



    $('#carousel').carouFredSel({
        items: 1,
        circular: false,
        auto: false,
        scroll: {
            fx: 'crossfade',

            onBefore: function (oldItems, newItems) {
                pauseAllVideo();

            },
            onAfter: function (oldItems, newItems) {


                newItems.each(function () {
                    showVideo($(this));

                });

            }
        },


        onCreate: function (items) {

            items.each(function () {
                showVideo($(this));

            });



        },

        pagination: {
            container: '#pager',
            duration: 300
        }


    });


    $('#tips').delay(5000).fadeOut('slow');
});