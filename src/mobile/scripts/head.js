/*
    Font size
*/

import font from '@/common/scripts/utils/font'

font([
    {width: 1024, height: 1366, size: 20},
    {width: 500,  height: 750,  size: 16}
])



/*
    window size as CSS variable
*/

function setViewPort () {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.documentElement.style.setProperty('--windowWidth', width + 'px');
    document.documentElement.style.setProperty('--windowHeight', height + 'px');
    window.appRealWidth = width;
    window.appRealHeight = height;
}

window.addEventListener('resize', setViewPort);
window.addEventListener('orientationchange', setViewPort);
setViewPort();
