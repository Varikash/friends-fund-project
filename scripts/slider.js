class Slider {
    static ATTRIBUTE = 'slider';
    static EVENT_NAME = 'slider-start';
    static CLASS_CONTROL = 'slider__control';
    static CLASS_CONTROL_HIDE = 'slider__control_hidden';
    static CLASS_ITEM_ACTIVE = 'slider__item_active';
    static CLASS_INDICATOR_ACTIVE = 'slider__indicator_active';
    static CLASS_CONTAINER = 'slider__container';
    static CLASS_ITEM = 'slider__item';
    static CLASS_ITEMS = 'slider__items';
    static CLASS_PREV = 'slider__control[data-slide="prev"]';
    static CLASS_NEXT = 'slider__control[data-slide="next"]';
    static CLASS_INDICATOR = 'slider__indicator';
    static CLASS_TRANSITION_OFF = 'slider_disable-transition';
  
    static instances = [];
  
    static createInstances() {
      document.querySelectorAll(`[data-${Slider.ATTRIBUTE}]`).forEach(el => {
        // if this instance was already inited manually, ignore it
        if (this.instances.find(item => item.el === el)) {
          return;
        }
  
        // get config values from dataset
        const dataset = el.dataset;
        const config = {};
  
        Object.keys(dataset).forEach(key => {
          if (key === Slider.ATTRIBUTE) {
            return;
          }
  
          let value = dataset[key];
          value = value === 'true' ? true : value;
          value = value === 'false' ? false : value;
          value = Number.isNaN(+value) ? +value : value;
          config[key] = value;
        });
  
        // init this instance
        const slider = new Slider(el, config);
        // add this instance to instances array
        this.instances.push({ el, slider });
      });
    }
  
    constructor(selector, config) {
      // get DOM elements
      this._sliderEl = typeof selector === 'string' ? document.querySelector(selector) : selector;
      this._containerEl = this._sliderEl.querySelector(Slider._getSelector(Slider.CLASS_CONTAINER));
      this._itemsEl = this._sliderEl.querySelector(Slider._getSelector(Slider.CLASS_ITEMS));
      this._itemEls = this._sliderEl.querySelectorAll(Slider._getSelector(Slider.CLASS_ITEM));
      this._indicatorEls = this._sliderEl.querySelectorAll(Slider._getSelector(Slider.CLASS_INDICATOR));
      this._btnPrev = this._sliderEl.querySelector(Slider._getSelector(Slider.CLASS_PREV));
      this._btnNext = this._sliderEl.querySelector(Slider._getSelector(Slider.CLASS_NEXT));
  
      // set default values
      this._exOrderMin = 0;
      this._exOrderMax = 0;
      this._exItemMin = null;
      this._exItemMax = null;
      this._exTranslateMin = 0;
      this._exTranslateMax = 0;
  
      const transitionDuration = +window.getComputedStyle(this._itemsEl).transitionDuration;
      this._delay = Math.round((transitionDuration || 0) * 50);
  
      this._direction = 'next';
  
      this._autoplayIntervalId = null;
  
      this._isSwiping = false;
      this._swipeX = 0;
      
      this._config = {
        loop: true,
        autoplay: false,
        interval: 5000,
        refresh: true,
        swipe: true,
        ...config,
      };
      
      if (selector.id === 'heroes' || selector.id === "friends"){
        this._config.autoplay = true
      }
      
  
      this._setInitialValues();
      this._addEventListeners();
    }
  
    next() {
      this._move('next');
    }
  
    prev() {
      this._move('prev');
    }
  
    /**
     * @param {number} index
     */
    moveTo(index) {
      this._moveTo(index);
    }
  
    reset() {
      this._reset();
    }
  
    /**
     * @param {string} className
     */
    static _getSelector(className) {
      return `.${className}`;
    }
  
    _addEventListeners() {
      this._sliderEl.addEventListener('click', e => {
        this._stopAutoplay();
  
        const isControlBtn = e.target.classList.contains(Slider.CLASS_CONTROL);
        const isIndicator = !!e.target.dataset.slideTo;
  
        if (isControlBtn) {
          e.preventDefault();
          const direction = e.target.dataset.slide;
          this._move(direction);
        } else if (isIndicator) {
          const indicatorIndex = +e.target.dataset.slideTo;
          this._moveTo(indicatorIndex);
        }
  
        if (this._config.loop) {
          this._autoplay();
        }
      });
  
      this._sliderEl.addEventListener('mouseenter', () => {
        this._stopAutoplay();
      });
  
      this._sliderEl.addEventListener('mouseleave', () => {
        this._autoplay();
      });
  
      if (this._config.refresh) {
        window.addEventListener('resize', () => {
          window.requestAnimationFrame(this._reset.bind(this));
        });
      }
  
      if (this._config.loop) {
        this._itemsEl.addEventListener(Slider.EVENT_NAME, () => {
          if (this._isBalancing) {
            return;
          }
  
          this._isBalancing = true;
          window.requestAnimationFrame(this._balanceItems.bind(this));
        });
  
        this._itemsEl.addEventListener('transitionend', () => {
          this._isBalancing = false;
        });
      }
  
      if (this._config.swipe) {
        const onSwipeStart = e => {
          this._stopAutoplay();
  
          const event = e.type.search('touch') === 0 ? e.touches[0] : e;
          this._swipeX = event.clientX;
          this._isSwiping = true;
        };
  
        const onSwipeEnd = e => {
          if (!this._isSwiping) {
            return;
          }
  
          const event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
          const diffPos = this._swipeX - event.clientX;
  
          if (diffPos > 50) {
            this._move('next');
          } else if (diffPos < -50) {
            this._move('prev');
          }
  
          this._isSwiping = false;
  
          if (this._config.loop) {
            this._autoplay();
          }
        };
  
        this._sliderEl.addEventListener('touchstart', onSwipeStart);
        this._sliderEl.addEventListener('mousedown', onSwipeStart);
        document.addEventListener('touchend', onSwipeEnd);
        document.addEventListener('mouseup', onSwipeEnd);
      }
  
      this._sliderEl.addEventListener('dragstart', e => {
        e.preventDefault();
      });
  
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this._stopAutoplay();
        } else if (document.visibilityState === 'visible' && this._config.loop) {
          this._autoplay();
        }
      });
    }
  
    _autoplay() {
      if (!this._config.autoplay || this._autoplayIntervalId) {
        return;
      }
  
      this._autoplayIntervalId = setInterval(() => {
        this._move('next');
      }, this._config.interval);
    }
  
    _stopAutoplay() {
      clearInterval(this._autoplayIntervalId);
      this._autoplayIntervalId = null;
    }
  
    _balanceItems() {
      if (!this._isBalancing) {
        return;
      }
  
      const containerRect = this._containerEl.getBoundingClientRect();
      const targetWidth = containerRect.width / this._itemsCount / 2;
      const itemsCount = this._itemEls.length;
  
      if (this._direction === 'next') {
        const exItemRectRight = this._exItemMin.getBoundingClientRect().right;
  
        if (exItemRectRight < containerRect.left - targetWidth) {
          this._exItemMin.dataset.order = this._exOrderMin + itemsCount;
          const translate = this._exTranslateMin + itemsCount * this._itemWidth;
          this._exItemMin.dataset.translate = translate;
          this._exItemMin.style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
          this._updateExProperties();
        }
      } else {
        const exItemRectLeft = this._exItemMax.getBoundingClientRect().left;
  
        if (exItemRectLeft > containerRect.right + targetWidth) {
          this._exItemMax.dataset.order = this._exOrderMax - itemsCount;
          const translate = this._exTranslateMax - itemsCount * this._itemWidth;
          this._exItemMax.dataset.translate = translate;
          this._exItemMax.style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
          this._updateExProperties();
        }
      }
  
      window.setTimeout(() => {
        window.requestAnimationFrame(this._balanceItems.bind(this));
      }, this._delay);
    }
  
    _manageActiveClasses() {
      this._itemsState.forEach((isActive, index) => {
        const method = isActive ? 'add' : 'remove';
  
        // manage item active class
        this._itemEls[index].classList[method](Slider.CLASS_ITEM_ACTIVE);
  
        if (!this._indicatorEls.length) {
          return;
        }
  
        if (this._indicatorEls.length <= index) {
          console.error(
            `Your slider have ${this._itemEls.length} items, but ${this._indicatorEls.length} indicators`
          );
          return;
        }
  
        // manage indicator active class
        this._indicatorEls[index].classList[method](Slider.CLASS_INDICATOR_ACTIVE);
      });
    }
  
    /**
     * @param {'prev' | 'next'} direction
     */
    _move(direction) {
      this._direction = direction;
  
      const widthItem = direction === 'next' ? -this._itemWidth : this._itemWidth;
      const transform = this._transform + widthItem;
  
      if (!this._config.loop) {
        const limit = this._itemWidth * (this._itemEls.length - this._itemsCount);
  
        if (transform < -limit || transform > 0) {
          return;
        }
  
        if (this._btnPrev) {
          this._btnPrev.classList.remove(Slider.CLASS_CONTROL_HIDE);
          this._btnNext.classList.remove(Slider.CLASS_CONTROL_HIDE);
        }
  
        if (this._btnPrev && transform === -limit) {
          this._btnNext.classList.add(Slider.CLASS_CONTROL_HIDE);
        } else if (this._btnPrev && transform === 0) {
          this._btnPrev.classList.add(Slider.CLASS_CONTROL_HIDE);
        }
      }
  
      if (direction === 'next') {
        this._itemsState = [...this._itemsState.slice(-1), ...this._itemsState.slice(0, -1)];
      } else {
        this._itemsState = [...this._itemsState.slice(1), ...this._itemsState.slice(0, 1)];
      }
  
      this._manageActiveClasses();
      this._transform = transform;
      this._itemsEl.style.transform = `translate3D(${transform}px, 0px, 0.1px)`;
      this._itemsEl.dispatchEvent(new CustomEvent(Slider.EVENT_NAME, { bubbles: true }));
    }
  
    /**
     * @param {number} index
     */
    _moveTo(index) {
      const delta = this._itemsState.reduce((acc, current, currentIndex) => {
        const diff = current ? index - currentIndex : acc;
        return Math.abs(diff) < Math.abs(acc) ? diff : acc;
      }, this._itemsState.length);
  
      if (delta !== 0) {
        const direction = delta > 0 ? 'next' : 'prev';
  
        for (let i = 0; i < Math.abs(delta); i++) {
          this._move(direction);
        }
      }
    }
  
    _setInitialValues() {
      this._transform = 0;
      this._itemsState = [];
      this._isBalancing = false;
      this._itemWidth = this._itemEls[0].getBoundingClientRect().width;
      const containerWidth = this._containerEl.getBoundingClientRect().width;
      this._itemsCount = Math.round(containerWidth / this._itemWidth);
  
      this._itemEls.forEach((el, index) => {
        el.dataset.index = index;
        el.dataset.order = index;
        el.dataset.translate = 0;
        el.style.transform = '';
        this._itemsState.push(index < this._itemsCount ? 1 : 0);
      });
  
      if (this._config.loop) {
        const lastIndex = this._itemEls.length - 1;
        const translate = -(lastIndex + 1) * this._itemWidth;
        this._itemEls[lastIndex].dataset.order = -1;
        this._itemEls[lastIndex].dataset.translate = translate;
        this._itemEls[lastIndex].style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
        this._updateExProperties();
      } else if (this._btnPrev) {
        this._btnPrev.classList.add(Slider.CLASS_CONTROL_HIDE);
      }
  
      this._manageActiveClasses();
      this._autoplay();
    }
  
    _reset() {
      const itemWidth = this._itemEls[0].getBoundingClientRect().width;
      const containerWidth = this._containerEl.getBoundingClientRect().width;
      const itemsCount = Math.round(containerWidth / itemWidth);
  
      if (itemWidth === this._itemWidth && itemsCount === this._itemsCount) {
        return;
      }
  
      this._stopAutoplay();
      this._itemsEl.classList.add(Slider.CLASS_TRANSITION_OFF);
      this._itemsEl.style.transform = 'translate3D(0px, 0px, 0.1px)';
      this._setInitialValues();
  
      window.requestAnimationFrame(() => {
        this._itemsEl.classList.remove(Slider.CLASS_TRANSITION_OFF);
      });
    }
  
    _updateExProperties() {
      const els = Object.values(this._itemEls).map(el => el);
      const orders = els.map(item => +item.dataset.order);
      this._exOrderMin = Math.min(...orders);
      this._exOrderMax = Math.max(...orders);
  
      const min = orders.indexOf(this._exOrderMin);
      const max = orders.indexOf(this._exOrderMax);
      this._exItemMin = els[min];
      this._exItemMax = els[max];
      this._exTranslateMin = +this._exItemMin.dataset.translate;
      this._exTranslateMax = +this._exItemMax.dataset.translate;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    Slider.createInstances();
  });