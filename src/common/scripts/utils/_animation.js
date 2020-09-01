export default class _animation {

    constructor (value) {
        this.from = value;
        this.value = value;
        this.active = false;
    }

    to (to, duration, update, complete) {
        this.time = Date.now();
        this.start = this.value;
        this.end = to;
        this.duration = duration;
        this.update = update;
        this.complete = complete;
        if (!this.active) {
            this.active = true;
            this.play();
        }
    }

    play () {
        const t = Date.now() - this.time;
        const k = Math.min(t / this.duration, 1);
        this.value = this.start + (this.end - this.start) * k;
        this.update && this.update(this.value);
        if (k !== 1) return requestAnimationFrame(() => this.play());
        this.active = false;
        this.complete && this.complete(this.value);
    }

}