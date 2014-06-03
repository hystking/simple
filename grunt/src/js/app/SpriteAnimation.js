(function(w, d){
  SpriteAnimation = function($e, prefix, frame, fps, loop){
    this.$e = $e;
    this.prefix = prefix;
    this.frame = frame;
    this.fps = fps === undefined ? 30 : fps;
    this.loop = loop === undefined ? true : loop;
    this.isPlaying = false;
    this.timeStamp = -1;
    this.n = 1;
  };
  SpriteAnimation.prototype = {
    _getClassName: function(n){
       return this.prefix+("000" + this.n).slice(-4);
    },
    play: function(callback){
      this.isPlaying = true;
      var num = "";
      var timeStamp = +new Date();
      this.timeStamp = timeStamp;
      var routine = function(){
        if(!this.isPlaying || this.timeStamp !== timeStamp) return;
        var n_next = this.n+1;
        if(n_next > this.frame){
          if(this.loop){
            n_next = 1;
          }else{
            n_next = this.frame;
            this.stop(callback);
          }
        }
        this.setN(n_next);
        setTimeout(routine, 1000/this.fps);
      }.bind(this);
      setTimeout(routine, 0);
    },
    setN: function(n){
      this.$e.removeClass(this._getClassName(this.n));
      this.n = n;
      this.$e.addClass(this._getClassName(this.n));
    },
    start: function(callback){
      this.setN(1);
      this.play(callback);
    },
    stop: function(callback){
      this.isPlaying = false;
      setTimeout(callback, 0);
    }
  };
})(this, document);
