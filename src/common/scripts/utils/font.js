export default function ({ min, max, pointA, pointB }) {


    const db = diagonal(pointB.width, pointB.height);
    const da = diagonal(pointA.width, pointA.height);
    const rate = (pointB.size - pointA.size) / (db - da);

    function diagonal (width, height) {
        return Math.sqrt(width * width + height * height);
    }

    function resize () {
        const d = diagonal(window.innerWidth, window.innerHeight);
        let f = pointB.size + (d - db) * rate;
        if (max) f = Math.min(f, max);
        if (min) f = Math.max(f, min);
        document.documentElement.style.fontSize = f + 'px';
    }

    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    resize();

}
