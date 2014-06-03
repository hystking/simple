(function(w, d){
  Animation = function(draw, duration, loop, callback){
    this.timeStart = 0;
    this.duration = duration;
    this.loop = loop || false;
    this.playing = false;
    this.callback = callback || function(){};

    this._draw = draw;

    this.drawBinded = this.draw.bind(this);
  };
  Animation.prototype = {
    draw: function(){
      var t = +new Date() - this.timeStart;
      if(this.loop){
        t = t%this.duration;
      }
      if(t < 0){
        t = 0;
      }
      if(t >= this.duration){
        t = this.duration;
        this.stop();
      }
      this._draw(t/this.duration);
      if(this.playing){
        requestAnimationFrame(this.drawBinded);
      }
    },
    start: function(timeStart){
      this.timeStart = timeStart || +new Date();
      this.playing = true;
      this.draw();
    },
    stop: function(call){
      this.playing = false;
      if(call === undefined || call){
        setTimeout(this.callback);
      }
    }
  };
})(this, document);
