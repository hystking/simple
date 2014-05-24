(function(w, d){
  SpriteAnimation = function($e, prefix, frame, fps, loop){
    this.$e = $e;
    this.prefix = prefix;
    this.frame = frame;
    this.fps = fps === undefined ? 30 : fps;
    this.loop = loop === undefined ? true : false;

    this.isPlaying = false;
    this.n = 1;
  };
  SpriteAnimation.prototype = {
    start: function(){
      this.isPlaying = true;
      var num = "";
      var routine = function(){
        if(!this.isPlaying) return;
        this.$e.removeClass(this.prefix+num);
        if(++this.n > this.frame){
          this.n = 1;
        }
        num = ("000" + this.n).slice(-4);//0 padding
        this.$e.addClass(this.prefix+num);
        setTimeout(routine, 1000/this.fps);
      }.bind(this);
      setTimeout(routine, 0);
    },
    stop: function(){
      this.isPlaying = false;
    }
  };
})(this, document);
