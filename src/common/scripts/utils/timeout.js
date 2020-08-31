export default class Timeout {

    constructor (duration, callback) {
        this.active = false;
        this.timeout = null;
        this.duration = duration;
        this.callback = callback;
    }

    start () {
        this.active = true;
        this.timeout = setTimeout(() => {
            this.callback && this.callback();
            this.stop();
        }, this.duration);
    }

    stop () {
        this.active = false;
        clearTimeout(this.timeout);
    }

}