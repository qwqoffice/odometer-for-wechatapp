//index.js

const app = getApp()

Page({
    data: {},
    onLoad: function() {
        var that = this;
        var odometer = this.selectComponent('#odometer');
        var rnd = that.getRandom(1, 100);
        setTimeout(function() {
            odometer.update(rnd);
        }, 400);
        setInterval(function() {
            rnd = that.getRandom(1, 100);
            odometer.update(rnd);
        }, 2800);
    },
    getRandom: function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
})