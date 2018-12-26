;
(function($, window, document, undefined) {
	var pluginName = "slotMachine",
		defaults = {
			active: 0,
			delay: 200,
			auto: false,
			randomize: null,
			complete: null
		};
	var FX_FAST = 'slotMachineBlurFast',
		FX_NORMAL = 'slotMachineBlurMedium',
		FX_SLOW = 'slotMachineBlurSlow',
		FX_STOP = 'slotMachineGradient';
	if(typeof $.easing.easeOutBounce !== 'function') {
		$.extend($.easing, {
			easeOutBounce: function(x, t, b, c, d) {
				if((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if(t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
				} else if(t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
				}
			},
		});
	}
	function Timer(fn, delay) {
		var startTime,
			self = this,
			timer,
			_fn = fn,
			_args = arguments,
			_delay = delay;

		this.running = false;
		this.onpause = function() {};
		this.onresume = function() {};
		this.cancel = function() {
			this.running = false;
			clearTimeout(timer);
		};
		this.pause = function() {
			if(this.running) {
				delay -= new Date().getTime() - startTime;
				this.cancel();
				this.onpause();
			}
		};
		this.resume = function() {
			if(!this.running) {
				this.running = true;
				startTime = new Date().getTime();

				timer = setTimeout(function() {
					_fn.apply(self, Array.prototype.slice.call(_args, 2, _args.length)); //Execute function with initial arguments, removing (fn & delay)
				}, delay);

				this.onresume();
			}
		};

		this.reset = function() {
			this.cancel();
			this.running = true;
			delay = _delay;
			timer = setTimeout(function() {
				_fn.apply(self, Array.prototype.slice.call(_args, 2, _args.length)); //Execute function with initial arguments, removing (fn & delay)
			}, _delay);
		};

		this.add = function(extraDelay) {
			this.pause();
			delay += extraDelay;
			this.resume();
		};

		this.resume();
	}
	function SlotMachine(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this.defaults = defaults;
		this.name = pluginName;

		this.$slot = $(element);
		this.$tiles = this.$slot.children();
		this.$container = null;
		this._minTop = null;
		this._maxTop = null;
		this._$fakeFirstTile = null;
		this._$fakeLastTile = null;
		this._timer = null;
		this._oncompleteStack = [this.settings.complete];
		this._spinsLeft = null;
		this.futureActive = null;
		this.isRunning = false;
		this.active = this.settings.active;
		this.$slot.css("overflow", "hidden");

		if(this.settings.active < 0 || this.settings.active >= this.$tiles.length) {
			this.settings.active = 0;
			this.active = 0;
		}
		this.$tiles.wrapAll("<div class='slotMachineContainer' />");
		this.$container = this.$slot.find(".slotMachineContainer");
		this._maxTop = -this.$container.height();
		this._$fakeFirstTile = this.$tiles.last().clone();
		this._$fakeLastTile = this.$tiles.first().clone();
		this.$container.prepend(this._$fakeFirstTile);
		this.$container.append(this._$fakeLastTile);
		this._minTop = -this._$fakeFirstTile.outerHeight();
		//this.$container.css('margin-top', this.getTileOffset(this.active));
		this.$container.css('margin-top', 0);
		console.log(this.settings.auto);
		if(this.settings.auto !== false) {
			if(this.settings.auto === true) {
				console.log("------------------->1");
				this.shuffle();
			} else {
				console.log("------------------->2");
				this.auto();
			}
		}
	}
	SlotMachine.prototype.getTileOffset = function(index) {
		var offset = 0;
		for(var i = 0; i < index; i++) {
			offset += $(this.$tiles.get(i)).outerHeight();
		}
		return -offset + this._minTop;
	};
	SlotMachine.prototype.getVisibleTile = function() {
		var firstTileHeight = this.$tiles.first().height(),
			containerMarginTop = parseInt(this.$container.css('margin-top').replace(/px/, ''), 10);

		return Math.abs(Math.round(containerMarginTop / firstTileHeight)) - 1;
	};
	SlotMachine.prototype.setRandomize = function(rnd) {
		if(typeof rnd === 'number') {
			var _fn = function() {
				return rnd;
			};
			this.settings.randomize = _fn;
		} else {
			this.settings.randomize = rnd;
		}
	};
	SlotMachine.prototype.getRandom = function(cantBeTheCurrent) {
		var rnd,
			removePrevious = cantBeTheCurrent || false;
		do {
			rnd = Math.floor(Math.random() * this.$tiles.length);
		} while ((removePrevious && rnd === this.active) && rnd >= 0);

		return rnd;
	};
	SlotMachine.prototype.getCustom = function() {
		var choosen;
		if(this.settings.randomize !== null && typeof this.settings.randomize === 'function') {
			var index = this.settings.randomize.apply(this, [this.active]);
			if(index < 0 || index >= this.$tiles.length) {
				index = 0;
			}
			choosen = index;
		} else {
			choosen = this.getRandom();
		}
		return choosen;
	};
	SlotMachine.prototype.getPrev = function() {
		var prevIndex = (this.active - 1 < 0) ? (this.$tiles.length - 1) : (this.active - 1);
		return prevIndex;
	};
	SlotMachine.prototype.getNext = function() {
		var nextIndex = (this.active + 1 < this.$tiles.length) ? (this.active + 1) : 0;
		return nextIndex;
	};
	SlotMachine.prototype._setAnimationFX = function(FX_SPEED, fade) {
		var self = this;
		setTimeout(function() {
			self.$tiles.removeClass(FX_FAST).removeClass(FX_NORMAL).removeClass(FX_SLOW).addClass(FX_SPEED);
		}, this.settings.delay / 4);
	};
	SlotMachine.prototype._resetPosition = function() {
		this.$container.css("margin-top", this.getTileOffset(this.active));
	};
	SlotMachine.prototype.isVisible = function() {
		var above = this.$slot.offset().top > $(window).scrollTop() + $(window).height(),
			below = $(window).scrollTop() > this.$slot.height() + this.$slot.offset().top;

		return !above && !below;
	};
	SlotMachine.prototype.prev = function() {
		this.futureActive = this.getPrev();
		this.isRunning = true;
		this.stop(false);
		return this.futureActive;
	};
	SlotMachine.prototype.next = function() {
		this.futureActive = this.getNext();
		this.isRunning = true;
		this.stop(false);
		return this.futureActive;
	};
	SlotMachine.prototype.shuffle = function(spins, onComplete) {
		var self = this;
		if(onComplete !== undefined) {
			this._oncompleteStack[1] = onComplete;
		}

		this.isRunning = true;
		var delay = this.settings.delay;
		if(this.futureActive === null) {
			var rnd = this.getCustom();
			this.futureActive = rnd;
		}
		if(typeof spins === 'number') {
			switch(spins) {
				case 1:
				case 2:
					this._setAnimationFX(FX_SLOW, true);
					delay /= 0.8;
					break;
				case 3:
				case 4:
					this._setAnimationFX(FX_NORMAL, true);
//					delay /= 1.5;
					break;
				default:
					this._setAnimationFX(FX_FAST, true);
					delay /= 2;
			}
		} else {
			this._setAnimationFX(FX_FAST, true);
			delay /= 2;
		}

		this.$container.animate({
			marginTop: this._maxTop
		}, delay, 'linear', function() {
			self.$container.css('margin-top', 0);
			if(spins - 1 <= 0) {
				self.stop();
			} else {
				self.shuffle(spins - 1);
			}
		});
		return this.futureActive;
	};
	SlotMachine.prototype.stop = function(showGradient) {
		if(!this.isRunning) {
			return;
		}
		var self = this;

		this.$container.clearQueue().stop(true, false);
		this._setAnimationFX(FX_SLOW, showGradient === undefined ? true : showGradient);
		this.isRunning = true;
		this.active = this.getVisibleTile();
		if(this.futureActive > this.active) {
			if(this.active === 0 && this.futureActive === this.$tiles.length - 1) {
				this.$container.css('margin-top', this.getTileOffset(this.$tiles.length));
			}
		} else {
			if(this.active === this.$tiles.length - 1 && this.futureActive === 0) {
				this.$container.css('margin-top', 0);
			}
		}
		this.active = this.futureActive;
		this.futureActive = null;
		var delay = this.settings.delay * 3;
		this.$container.animate({
			marginTop: this.getTileOffset(this.active)
		}, delay, 'easeOutBounce', function() {
			self.isRunning = false;
			if(typeof self._oncompleteStack[0] === 'function') {
				self._oncompleteStack[0].apply(self, [self.active]);
			}
			if(typeof self._oncompleteStack[1] === 'function') {
				self._oncompleteStack[1].apply(self, [self.active]);
			}
		});
		setTimeout(function() {
			self._setAnimationFX(FX_STOP, false);
		}, delay / 1.75);
		return this.active;
	};
	SlotMachine.prototype.auto = function() {
		var self = this;
		this._timer = new Timer(function() {
			if(typeof self.settings.randomize !== 'function') {
				self.futureActive = self.getNext();
			}
			self.isRunning = true;
			self.shuffle(5, function() {
				self._timer.reset();
			});
		}, this.settings.auto);
	};
	function _getInstance(element, options) {
		var machine;
		if(!$.data(element[0], 'plugin_' + pluginName)) {
			machine = new SlotMachine(element, options);
			$.data(element[0], 'plugin_' + pluginName, machine);
		} else {
			machine = $.data(element[0], 'plugin_' + pluginName);
		}
		return machine;
	}
	$.fn[pluginName] = function(options) {
		if(this.length === 1) {
			return _getInstance(this, options);
		} else {
			return this.each(function() {
				if(!$.data(this, 'plugin_' + pluginName)) {
					_getInstance(this, options);
				}
			});
		}
	};
})(jQuery, window, document);