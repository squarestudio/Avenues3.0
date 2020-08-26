export default function ([origin, helper]) {

    const d1 = diagonal(origin.width, origin.height);
    const d2 = diagonal(helper.width, helper.height);
    const rate = (origin.size - helper.size) / (d1 - d2);

    function diagonal (width, height) {
        return Math.sqrt(width * width + height * height);
    }

    function resize () {
        const d = Math.min(diagonal(window.innerWidth, window.innerHeight), d1);
        const f = origin.size + (d - d1) * rate;
        document.documentElement.style.fontSize = f + 'px';
    }

    window.addEventListener('resize', resize);
    resize();

}
