const Easing = {

    linear (e) {
        return e
    },

    inOut (e) {
        if ((e *= 2) < 1) return 0.5 * e * e;
        return -0.5 * (--e * (e - 2) - 1);
    }

}

class Animation {

    constructor ({from, to, duration, easing, update, complete}) {
        this.config = {};
        this.from(from);
        this.to(to);
        this.duration(duration);
        this.easing(easing);
        this.update(update);
        this.complete(complete);
    }

    set (key, value) {
        this.config[key] = value;
        return this;
    }

    from (value) {
        this.set('value');
        this.set('from', value);
        return this;
    }

    to (value) {
        return this.set('to', value);
    }

    duration (value) {
        return this.set('duration', value);
    }

    easing (value) {
        return this.set('easing', Easing[value] || Easing.linear);
    }

    update (value) {
        return this.set('update', value);
    }

    complete (value) {
        return this.set('complete', value);
    }

    start () {
        this.config.from = this.value === undefined ? this.config.from : this.value;
        this.config.time = Date.now();
        this.active = true;
        this.animate();
    }

    pause () {
        this.active = false;
    }

    animate () {
        if (!this.active) return;
        const {time, from, to, duration, easing, update, complete} = this.config;
        const t = Date.now() - time;
        const k = Math.min(t / duration, 1);
        const e = easing(k);
        this.value = from + (to - from) * e;
        update && update(this.value);
        if (k !== 1) return requestAnimationFrame(() => this.animate());
        this.active = false;
        complete && complete(this.value);
    }

}