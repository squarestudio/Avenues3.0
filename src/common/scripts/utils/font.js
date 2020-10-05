export default function ([max, min]) {

    const d1 = diagonal(max.width, max.height);
    const d2 = diagonal(min.width, min.height);
    const rate = (max.size - min.size) / (d1 - d2);

    function diagonal (width, height) {
        return Math.sqrt(width * width + height * height);
    }

    function resize () {
        const d = diagonal(window.innerWidth, window.innerHeight);
        let f = max.size + (d - d1) * rate;
        f = Math.min(f, max.size);
        f = Math.max(f, min.size);
        document.documentElement.style.fontSize = f + 'px';
    }

    window.addEventListener('resize', resize);
    resize();

}
