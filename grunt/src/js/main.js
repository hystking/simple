$(this).ready(function(){
  $square = $(".square");
  sa = new SpriteAnimation($square, "f", 60, 30, false);
  am = new AnimationManager([], true);

  am.list = [
    sa.start.bind(sa),
    am.getWait(500),
    function(cb){$square.animate({
      margin: 100
    }, "ease", cb);},
    am.getWait(500),
    function(cb){$square.animate({
      margin: 0
    }, "ease", cb);}
  ];
  am.start();
});
