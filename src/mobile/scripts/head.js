/*
    Font size
*/

import font from '@/common/scripts/utils/font'

font([
    {width: 1024, height: 1366, size: 20},
    {width: 500,  height: 750,  size: 16}
])



/*
    windowHeight as CSS variable
*/

function setHeight () {
    document.documentElement.style.setProperty('--windowHeight', Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px');
}

window.addEventListener('resize', setHeight);
window.addEventListener('orientationchange', setHeight);
setHeight();
