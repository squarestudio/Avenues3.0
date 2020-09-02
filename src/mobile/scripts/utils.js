// ------------------
// Timeout promise
// ------------------

export const timeout = (time = 0) => new Promise(resolve => {
    setTimeout(resolve, time);
});



// ------------------
// Transition promise
// ------------------

export const transition = $node => new Promise(resolve => {

    const style = window.getComputedStyle($node);
    const value = style.getPropertyValue('transition-property');

    console.log(value);

    if (value === 'none') return resolve();

    function handle (name) {
        function complete (event) {

            console.log('complete', name, event)

            if (event.target !== $node) return;
            $node.removeEventListener(name, complete);
            resolve();
        }
        $node.addEventListener(name, complete);
    }

    handle('transitionend');
    handle('transitioncancel');


});