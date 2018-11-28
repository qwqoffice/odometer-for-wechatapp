// components/odometer/odometer.js

Component({
    options: {
        addGlobalClass: true
    },
    externalClasses: ['odometer-class', 'value-class'],
    properties: {
        show: {
            type: Boolean,
            value: true
        },
        duration: {
            type: Number,
            value: 2000
        }
    },
    data: {
        animateDirection: 'up'
    },
    methods: {
        truncate(val) {
            if (val < 0) {
                return Math.ceil(val);
            } else {
                return Math.floor(val);
            }
        },
        getDigitCount() {
            var values = arguments;
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                values[i] = Math.abs(value);
            }
            var max = Math.max.apply(Math, values);
            return Math.ceil(Math.log(max + 1) / Math.log(10));
        },
        getNumberFrames(oldValue, newValue) {
            var FRAMERATE = 30;
            var DIGIT_SPEEDBOOST = 0.5;
            var MS_PER_FRAME = 1000 / FRAMERATE;
            var FRAMES_PER_VALUE = 2;
            var MAX_VALUES = ((this.data.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0;
            var digitCount = this.getDigitCount(oldValue, newValue);
            var digits = [];
            var boosted = 0;
            var diff;
            if (!(diff = newValue - oldValue)) {
                return;
            }
            for (var i = 0; i < digitCount; i++) {
                var start = this.truncate(oldValue / Math.pow(10, digitCount - i - 1));
                var end = this.truncate(newValue / Math.pow(10, digitCount - i - 1));
                var dist = end - start;
                var frames;
                if (Math.abs(dist) > MAX_VALUES) {
                    frames = [];
                    var incr = dist / (MAX_VALUES + MAX_VALUES * boosted * DIGIT_SPEEDBOOST);
                    var cur = start;
                    while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
                        frames.push(Math.round(cur));
                        cur += incr;
                    }
                    if (frames[frames.length - 1] !== end) {
                        frames.push(end);
                    }
                    boosted++;
                } else {
                    frames = (function() {
                        var results = [];
                        for (var j = start; start <= end ? j <= end : j >= end; start <= end ? j++ : j--) {
                            results.push(j);
                        }
                        return results;
                    }).apply(this);
                }
                for (var j = 0; j < frames.length; j++) {
                    var frame = frames[j];
                    frames[j] = Math.abs(frame % 10);
                }
                if (diff < 0) {
                    frames = frames.reverse();
                }
                digits.push(frames);
            }
            return digits;
        },
        show() {
            this.setData({
                show: true
            });
        },
        hide() {
            this.setData({
                show: false
            });
        },
        setValue(value) {
            this.value = value;
            var digits = this.getNumberFrames(0, value);
            if (digits != undefined) {
                this.setData({
                    digits: digits
                });
            }
        },
        setQuestionMark() {
            var digits = [],
                i = 0,
                j = 0,
                length = 20;
            while (i < 2) {
                var digit = [];
                j = 0;
                while (j < length) {
                    digit.push('?');
                    j++;
                }
                digits.push(digit);
                i++;
            }
            this.setData({
                digits: digits
            });
        },
        startAnimate() {
            this.setData({
                animate: true
            }, () => {
                var digits = [],
                    values = this.value.toString().split('');
                for (var i in values) {
                    digits.push([values[i]]);
                }
                if (this.data.digits[0][0] != '?') {
                    setTimeout(() => {
                        this.setData({
                            animate: false,
                            digits: digits
                        });
                    }, this.data.duration);
                }
            });
        },
        update(newValue) {
            if (this.value == undefined) {
                this.value = 0;
            }
            var diff = newValue - this.value;
            if (diff == 0) {
                return;
            }
            var direction = diff > 0 ? 'up' : 'down';
            this.setData({
                animateDirection: direction,
                show: true,
            }, () => {
                this.setData({
                    digits: this.getNumberFrames(this.value, newValue)
                }, () => {
                    this.value = newValue;
                    setTimeout(() => {
                        this.startAnimate();
                    }, 10);
                });
            });
        }
    }
})