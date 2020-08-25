import image from '@/common/images/space.jpg'

export default function (testTime) {
    return new Promise(resolve => {

        const src = `${image}?${Date.now()}`;
        const xhr = new XMLHttpRequest();

        let startTime = 0;
        let loaded = 0;

        xhr.addEventListener('loadstart', () => {
            startTime = Date.now();
        });

        xhr.addEventListener('progress', (event) => {
            const time = Date.now();
            loaded = event.loaded;
            if (loaded === event.total || time - startTime >= testTime) {
                xhr.abort();
                complete(time);
            }
        });

        xhr.open('GET', src, true);
        xhr.send(null);

        function complete (endTime) {
            const duration = (endTime - startTime) / 1000;
            resolve(loaded * 8 / 1024 / duration);
        }

    })
}

