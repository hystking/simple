(function(w, d){
  AnimationManager = function(list, repeat){
    this.list = list;
    this.timeStamp = -1;
    this.n = 0;
    this.repeat = repeat === undefined || repeat;
    window.anim=this;
  };
  AnimationManager.prototype = {
    getCallback: function(timeStamp){
      var isAnimating = function(){
        return timeStamp === this.timeStamp;
      }.bind(this);
      var callback = function(){
        if(!isAnimating()) return;
        if(this.n === this.list.length-1 && !this.repeat){
          this.timeStamp = -1;
          return;
        }
        this.n = (this.n+1)%this.list.length;
        this.list[this.n](callback, isAnimating);
      }.bind(this);
      return callback;
    },
    start: function(){
      this.timeStamp = +new Date();
      this.n = -1;
      this.getCallback(this.timeStamp)();
    },
    stop: function(){
      this.timeStamp = -1;
    },
    getWait: function(duration){
      return function(cb, isAnimating){
        setTimeout(function(){
          if(isAnimating()) cb();
        }, duration);
      };
    },
    getAddClass: function($e, className){
      return function(cb){
        $e.stop().addClass(className);
        cb();
      };
    },
    getRemoveClass: function($e, className){
      return function(cb){
        $e.stop().removeClass(className);
        cb();
      };
    },
    getSet: function($e, params){
      return function(cb){
        $e.stop().css(params);
        cb();
      };
    },
    getAnim: function($e, params, duration, queue){
      queue = queue === undefined || queue;
      return function(cb){
        if(!queue) cb();
        $e.stop()
          .animate(params, {duration: duration, queue: queue})
          .queue(queue?cb:null);
      };
    }
  };
})(this, document);
