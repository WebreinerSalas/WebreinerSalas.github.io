$(document).ready(function () {
    $('.menu-toggler').on('click', function() {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.nav-link').on('click', function() {
      $(this).toggleClass('open');
      $('.top-nav').toggleClass('open');
     });

     $('.fa-envelope').on('click', function() {
      $(this).toggleClass('active');
      $('.email').toggleClass('active');
  });

    /*$('.nav a[href*="#"]').on('click', function() {
      $('html, body').animate(keyframes: {
        scrollTop: $($(this).attr('href')).offset().top - 100
      }, option:2000);
    });*/

    $('.up').on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, 2000);
    });

    AOS.init({
      easing: 'ease',
      duration: 1800,
    });

});


/*$(document).ready(function () {
  $('.nav-link').on('click', function() {
      $(this).toggleClass('open');
      $('.top-nav').toggleClass('open');
  });
});*/


var skills = [
    {"header" : "INTERESES",
      "captions" : [
        "Security",
        "Web",
        "Mobile",
        "Design",
        "AI"
      ],
      "values" : [
        0.70,
        0.90,
        0.70,
        0.80,
        0.80
      ]
    },
    {"header" : "LENGUAJES",
      "captions" : [
        "nodeJS",
        "PHP",
        "JS",
        "C#",
        "React"
      ],
      "values" : [
        0.65,
        0.90,
        0.90,
        0.80,
        0.60
      ]
    },
    {"header" : "MISC",
      "captions" : [
        "Angular",
        "Git",
        "Laravel",
        "Google cloud",
        "Linux"
      ],
      "values" : [
        0.90,
        0.85,
        0.90,
        0.70,
        0.70
      ]
    }
  ];
  
  var pentagonIndex = 0;
  var valueIndex = 0;
  var width = 0;
  var height = 0;
  var radOffset = Math.PI/2
  var sides = 5; // Number of sides in the polygon
  var theta = 2 * Math.PI/sides; // radians per section
  
  function getXY(i, radius) {
    return {"x": Math.cos(radOffset +theta * i) * radius*width + width/2,
      "y": Math.sin(radOffset +theta * i) * radius*height + height/2};
  }
  
  var hue = [];
  var hueOffset = 139;
  
  for (var s in skills) {
    $(".content").append('<div class="pentagon" id="interests"><div class="header"></div><canvas class="pentCanvas"/></div>');
    hue[s] = (hueOffset + s * 219/skills.length) % 200;
  }
  
  $(".pentagon").each(function(index){
    width = $(this).width();
    height = $(this).height();
    var ctx = $(this).find('canvas')[0].getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.font="15px Monospace";
    ctx.textAlign="center";
    
    /*** LABEL ***/
    color = "hsl("+hue[pentagonIndex]+", 100%, 50%)";
    ctx.fillStyle = color;
    ctx.fillText(skills[pentagonIndex].header, width/2, 15);
  
    ctx.font="15px Monospace";   
  
    /*** PENTAGON BACKGROUND ***/
    for (var i = 0; i < sides; i++) {
      // For each side, draw two segments: the side, and the radius
      ctx.beginPath();
      xy = getXY(i, 0.3);
      colorJitter = 25 + theta*i*2;
      color = "hsl("+hue[pentagonIndex]+",100%," + colorJitter + "%)";
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.moveTo(0.5*width, 0.5*height); //center
      ctx.lineTo(xy.x, xy.y);
      xy = getXY(i+1, 0.3);
      ctx.lineTo(xy.x, xy.y);
      xy = getXY(i, 0.37);
      console.log();
      ctx.fillText(skills[ pentagonIndex].captions[valueIndex],xy.x, xy.y +5);
      valueIndex++;
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    
    valueIndex = 0;
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 5;
    var value = skills[pentagonIndex].values[valueIndex];
    xy = getXY(i, value * 0.3);
    ctx.moveTo(xy.x,xy.y);
    /*** SKILL GRAPH ***/
    for (var i = 0; i < sides; i++) {
      xy = getXY(i, value * 0.3);
      ctx.lineTo(xy.x,xy.y);
      valueIndex++;
      value = skills[pentagonIndex].values[valueIndex];
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    valueIndex = 0;  
    pentagonIndex++;
  });
  