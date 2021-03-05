---
---

var channel_1, channel_2, channel_3;
var init_1 = false, init_2 = false, init_3 = false;
var sectionIndex = 0;
var sectionsArray = [];
var distance = 150;
let idleTimer = null;
let idleState = false;

console.log("main.js");
console.log("jekyll.environment:" ,{{jekyll.environment | jsonify}});

function init() {
  console.log("main.js init");
  $("#footer").detach().appendTo('.page-content-container').fadeIn();
  {% if jekyll.environment == "production" %}
    document.addEventListener('contextmenu', event => event.preventDefault());
  {% endif %}
}

function prepareVimeo(){

  var options01 = {
    id: 515418208,
    muted: true,
    autoplay: true,
    background: true,
    responsive: true,
    pip: false,
    portrait: false,
    title: false,
    controls: false
  };

  var options02 = {
    id: 515418522,
    muted: true,
    autoplay: true,
    background: true,
    responsive: true,
    pip: false,
    portrait: false,
    title: false,
    controls: false
  };

  var options03 = {
    id: 515418891,
    muted: true,
    autoplay: true,
    background: true,
    responsive: true,
    pip: false,
    portrait: false,
    title: false,
    controls: false
  };

  channel_1 = new Vimeo.Player('video1', options01);
  channel_2 = new Vimeo.Player('video2', options02);
  channel_3 = new Vimeo.Player('video3', options03);


  var d = new Date(); // for now
  var s = getCurrentTimeInSecconds(d);
  console.log(s);

  var t;

  channel_1.getDuration().then(function(duration) {
    console.log("channel_1 length: " +duration);
    t = (s / duration) - Math.floor(s / duration);
    console.log("time: " ,t);
    t = duration * t;
    console.log("time: " ,t);

    channel_1.setCurrentTime(t).then(function(seconds) {

    }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
            // The time is less than 0 or greater than the video's duration
            break;

        default:
            // Some other error occurred
            break;
      }
    });

    channel_2.setCurrentTime(t).then(function(seconds) {

    }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
            // The time is less than 0 or greater than the video's duration
            break;

        default:
            // Some other error occurred
            break;
      }
    });

    channel_3.setCurrentTime(t).then(function(seconds) {

    }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
            // The time is less than 0 or greater than the video's duration
            break;

        default:
            // Some other error occurred
            break;
      }
    });

  });



}

function prepareVideos(){

  channel_1 = document.getElementById("channel_1");
  channel_1.oncanplay = function() {
    if (init_1) {
      return
    }
    init_1 = true;
    console.log("channel_1 length: " ,channel_1.duration);
    var time = (s / channel_1.duration) - Math.floor(s / channel_1.duration);
    console.log("time: " ,time);
    time = channel_1.duration * time;
    console.log("time: " ,time);
    channel_1.currentTime = time;
    // alert("Video can play!");
  };

  channel_1.onplay = function(){
    if (init_1) {
      return
    }
    var time = (s / channel_1.duration) - Math.floor(s / channel_1.duration);
    console.log("time: " ,time);
    time = channel_1.duration * time;
    console.log("time: " ,time);
    channel_1.currentTime = time;
  }

  channel_2 = document.getElementById("channel_2");
  channel_2.oncanplay = function() {
    if (init_2) {
      return
    }
    init_2 = true;
    console.log("channel_2 length: " ,channel_2.duration);
    var time = (s / channel_2.duration) - Math.floor(s / channel_2.duration);
    console.log("time: " ,time);
    time = channel_2.duration * time;
    console.log("time: " ,time);
    channel_2.currentTime = time;
    // alert("Video can play!");
  };

  channel_2.onplay = function () {
    if (init_2) {
      return
    }
    init_2 = true;
    var time = (s / channel_2.duration) - Math.floor(s / channel_2.duration);
    time = channel_2.duration * time;
    channel_2.currentTime = time;
    // alert("Video can play!");
  }

  channel_3 = document.getElementById("channel_3");
  channel_3.oncanplay = function() {
    if (init_3) {
      return
    }
    init_3 = true;
    console.log("channel_3 length: " ,channel_3.duration);
    var time = (s / channel_3.duration) - Math.floor(s / channel_3.duration);
    console.log("time: " ,time);
    time = channel_3.duration * time;
    console.log("time: " ,time);
    channel_3.currentTime = time;
    // alert("Video can play!");
  };

  channel_3.onplay = function(){
    if (init_3) {
      return
    }
    init_3 = true;
    var time = (s / channel_3.duration) - Math.floor(s / channel_3.duration);
    time = channel_3.duration * time;
    channel_3.currentTime = time;
  }

}


function changeSection(direction){

  var oldSection;
  var newSection;
  console.log("changing direction: " ,direction);
  console.log("current sectionIndex: " ,sectionIndex);

  for (var i = 0; i < sectionsArray.length; i++) {
    if (sectionsArray[i].z == 0) {
      $(sectionsArray[i].div).toggleClass("current");
    }
  }

  if (direction == "up") {
    oldSection = sectionsArray[sectionIndex];
    newSection = sectionsArray[sectionIndex-1];

    if (sectionIndex == 2) {
      $("#video-overlay").fadeIn(2000);
    }

    if (sectionIndex == sectionsArray.length - 1) {
      $("#essay-overlay").fadeIn(2000);
    }

    for (var i = 0; i < sectionsArray.length; i++) {

      var currentSlide = sectionsArray[i];

      var tz_new = currentSlide.z - distance;
      var ty_new = currentSlide.y - (distance - 100);
      var tx_new = currentSlide.x + (distance - 100);

      console.log("tz_original "+ i +": " ,currentSlide.z);
      console.log("tz_new "+ i +": " ,tz_new);

      // var o = 0.5/index;
      // console.log("tz: " ,tz);
      $(sectionsArray[i].div).css({'transform' : 'translate3d('+ tx_new +'px, '+ ty_new +'px, '+ tz_new +'px)'});
      currentSlide.z = tz_new;
      currentSlide.y = ty_new;
      currentSlide.x = tx_new;
      // sectionsArray[i].css({'-webkit-transform' : 'translate3d(0, 150px, 0px)'});
    }
    sectionIndex--;
  }

  if (direction == "down") {
    oldSection = sectionsArray[sectionIndex];
    newSection = sectionsArray[sectionIndex+1];

    if (sectionIndex == 1) {
      $("#video-overlay").fadeOut(2000);
    }

    if (sectionIndex == sectionsArray.length - 2) {
      $("#essay-overlay").fadeOut(2000);
    }

    for (var i = 0; i < sectionsArray.length; i++) {

      var currentSlide = sectionsArray[i];

      var tz_new = currentSlide.z + distance;
      var ty_new = currentSlide.y + (distance - 100);
      var tx_new = currentSlide.x - (distance - 100);
      // var o_new = 0.5 / (currentSlide.index - 1 - sectionIndex);

      console.log("tz_original "+ currentSlide.index +": " ,currentSlide.z);
      console.log("tz_new "+ i +": " ,tz_new);

      // var o = 0.5/index;
      // console.log("tz: " ,tz);
      $(sectionsArray[i].div).css({'transform' : 'translate3d('+ tx_new +'px, '+ ty_new +'px, '+ tz_new +'px)'});
      // $(currentSlide.div).css({'opacity' : ''+o_new+''});
      currentSlide.z = tz_new;
      currentSlide.y = ty_new;
      currentSlide.x = tx_new;
      // sectionsArray[i].css({'-webkit-transform' : 'translate3d(0, 150px, 0px)'});
    }
    sectionIndex++;
  }



  for (var i = 0; i < sectionsArray.length; i++) {

    if (sectionsArray[i].z > 0) {
      console.log("Hiding slide: " ,sectionsArray[i].index);
      $(sectionsArray[i].div).delay(500).fadeOut();
    }
    else {
      $(sectionsArray[i].div).delay(500).fadeIn();
    }
  }

  for (var i = 0; i < sectionsArray.length; i++) {
    if (sectionsArray[i].z == 0) {
      $(sectionsArray[i].div).toggleClass("current");
    }



    if (oldSection.hasOwnProperty('onLeave')) {
      oldSection.onLeave();
    }

    if (newSection.hasOwnProperty('onEnter')) {
      newSection.onEnter();
    }

    // if (newSection.hasOwnProperty('onEnter') === false) {
    //
    // }


  }

}


$(window).scroll(function() {
// 100 = The point you would like to fade the nav in.

	// if ($(window).scrollTop() > 100){
 	// 	$('.header-wrapper').removeClass('bg-none');
  // } else {
  //   if (!$('.header-wrapper').hasClass("bg-none")) {
  //     $('.header-wrapper').addClass('bg-none');
  //   }
 	// };
  //
  // var s = $(window).scrollTop();
  // console.log("s: " ,s);
});


function showFoo(time) {
  clearTimeout(idleTimer);
  if (idleState == true) {
    $("#key-instructions").removeClass("inactive");
  }
  idleState = false;
  idleTimer = setTimeout(function() {
    $("#key-instructions").addClass("inactive");
    idleState = true;
  }, time);
}


$( document ).ready(function() {
  console.log("main.js ready!");
  prepareVimeo();

  $('#landing-logo').click(function(){
    channel_1.muted = false;
    channel_1.setVolume(1).then(function(volume) {
      // The volume is set
    }).catch(function(error) {
      switch (error.name) {
        case 'RangeError':
            // The volume is less than 0 or greater than 1
            break;

        default:
            // Some other error occurred
            break;
      }
    });
    $('#header-wrapper').fadeIn(2000);
    $('#intro-overlay').fadeOut(2000);
    $('#controls-container').fadeIn(2000, function(){
      showFoo(2000);
      $(window).mousemove(function(){
          showFoo(2000);
      });
    });
    changeSection("down");

  });

  $('#fullscreen').click(function(){
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  })

  $('.page-content-container').fadeIn();
  $('.navbar-toggler').click(function(){
    if ($(window).scrollTop() < 100){
      $('.header-wrapper').toggleClass('bg-none');
    }
  });


  // prepareVideos();



  $(".collapse-wrapper").each(function(index){
    var collapse_id = 'collapse_' +index;
    var collapse = $(this).find(".collapse");
    $(collapse).attr('id', collapse_id);
    var toggle = $(this).find(".collapse-toggle");
    $(toggle).attr('href', '#'+collapse_id).attr('aria-controls', collapse_id);
    var button = $(this).find(".collapse-button");

    var par = $(collapse).parent();
    $(collapse).children(":first").detach().prependTo(par);

    var textClass = $(par).attr('text-size');

    $(collapse).on("hide.bs.collapse", function(){
      $(par).toggleClass(textClass);
      $(button).html('Read more +');
      // $("#aboutCollapseButton").hide();
    });

    $(collapse).on("show.bs.collapse", function(){
      $(par).toggleClass(textClass);
      $(button).html('Read less –');
    });

  });


  document.onkeydown = function(e) {
      switch(e.which) {
          case 37: // left
          if (sectionIndex > 1) {
            changeSection("up");
          }
          break;

          case 38: // up
          if (sectionIndex < sectionsArray.length-1) {
            changeSection("down");
          }
          break;

          case 39: // right
          if (sectionIndex < sectionsArray.length-1) {
            changeSection("down");
          }
          break;

          case 40: // down
          if (sectionIndex > 1) {
            changeSection("up");
          }
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  };


  $(".container3d").find(".object3d").each(function(index){
    var t = $(this);
    console.log(index +": " ,t );
    var tz = index * distance * -1;
    var ty = index * (distance - 100) * -1;
    var tx = index * (distance - 100);
    console.log("tz: " ,tz);
    $(this).css({'-webkit-transform' : 'translate3d('+ tx +'px, '+ ty +'px, '+ tz +'px)'});

    var sectionObject = {
      div: t,
      x: tx,
      y: ty,
      z: tz,
      index: index
    }



    if (index > 1 && index < 5) {
      var vid;
      if (index == 2) {
        vid = channel_1;
      }

      if (index == 3) {
        vid = channel_2;
      }

      if (index == 4) {
        vid = channel_3;
      }

      sectionObject.onEnter = function(){
        vid.muted = false;
        vid.setVolume(1).then(function(volume) {
          // The volume is set
        }).catch(function(error) {
          switch (error.name) {
            case 'RangeError':
                // The volume is less than 0 or greater than 1
                break;

            default:
                // Some other error occurred
                break;
          }
        });
        if ($("#logo").is(":visible")) {
            $("#logo").fadeOut("slow");
        }
      }

      sectionObject.onLeave = function() {
        vid.muted = true;
        vid.setVolume(0).then(function(volume) {
          // The volume is set
        }).catch(function(error) {
          switch (error.name) {
            case 'RangeError':
                // The volume is less than 0 or greater than 1
                break;

            default:
                // Some other error occurred
                break;
          }
        });
      }
    }

    else {
      sectionObject.onEnter = function() {
        if ($("#logo").is(":hidden")) {
            $("#logo").fadeIn("slow");
        }
      }

      if (index == 1) {
        sectionObject.onEnter = function() {
          if ($("#logo").is(":hidden")) {
              $("#logo").fadeIn("slow");
          }
          // $("#key-instructions").fadeIn("slow");
        }
        sectionObject.onLeave = function() {
          // $("#key-instructions").fadeOut("slow");
        }
      }
    }

    sectionsArray.push(sectionObject);

  });

  // for (var i = 0; i < sectionsArray.length; i++) {
  //   sectionsArray[i].updateOpacity();
  // }

  console.log("sectionsArray: " ,sectionsArray);

});

function resize(){

}

$(window).on('resize', function(){
  // resize();
});

init();
