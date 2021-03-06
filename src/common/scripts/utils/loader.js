// ------------------
// Imports
// ------------------

import API from '@/common/scripts/modules/api';
import image from '@/common/assets/images/space.jpg'



// ------------------
// Cache
// ------------------

export const Cache = {

    lifetime: DEV ? 3 * 60 * 60 * 1000 : 10 * 60 * 1000,
    data: JSON.parse(localStorage.getItem('cache')),

    valid (id) {
        return Cache.data && Date.now() - Cache.data.timestamp < Cache.lifetime && id === Cache.data.id
    },

    get () {
        const {about, home, archive, privateInfo} = Cache.data;
        return {about, home, archive, privateInfo}
    },

    set ({about, home, archive, privateInfo}, id) {
        localStorage.setItem('cache', JSON.stringify({
            timestamp: Date.now(),
            about, home, archive, privateInfo, id
        }))
    }

}



// ------------------
// Auth
// ------------------

export const Auth = id => {

    function getPassword () {
        const password = window.prompt('Password');
        if (!password) getPassword();
        return password;
    }

    function login (resolve) {
        API('login', getPassword(), id).then(data => {
            if (data) return resolve();
            else return login(resolve);
        });
    }

    return new Promise(resolve => {
        if (id) login(resolve);
        else resolve();
    });

}



// ------------------
// Bitrate
// ------------------

export const BitRate = testTime => new Promise(resolve => {

    const src = `${image}?${Date.now()}`;
    const xhr = new XMLHttpRequest();

    let startTime = 0;
    let loaded = 0;

    function getBitRate (speed) {
        if (speed <= 128) return 480;
        if (speed <= 512) return 960;
        return 1920;
    }

    function complete (endTime) {
        const duration = (endTime - startTime) / 1000;
        const speed = loaded * 8 / 1024 / duration;
        resolve(getBitRate(speed));
    }

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

});



// ------------------
// Request
// ------------------

export const Request = (id, bitrate) => {

    const request = {

        private: () => Promise.all([
            API('private', id),
            API('about'),
            Promise.resolve(),
            API('privateInfo', id)
        ]),

        public: () => Promise.all([
            API('home'),
            API('about'),
            API('archive')
        ])

    }

    const parseStartsAt = value => {
        if (!value) return 0;
        const a = value.split(':');
        return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) || 0;
    }

    const parse = (data = []) => data.map(item => {
        let project = item.projects_id;
        if (project.starts_at) project.cover = `${API_ORIGIN}/uploads/${API_PROJECT}/converted/starts/${project.id}/${bitrate}.jpg`;
        else project.cover = `${API_ORIGIN}/uploads/${API_PROJECT}/converted/covers/${project.cover}/${bitrate}.jpg`;
        project.frame = `${API_ORIGIN}/uploads/${API_PROJECT}/converted/frames/${project.video}/${bitrate}.jpg`;
        project.video = `${API_ORIGIN}/uploads/${API_PROJECT}/converted/videos/${project.video}/${bitrate}.mp4`;
        project.client = project.client.toLowerCase();
        project.title = project.title.toLowerCase();
        project.editor = project.editor.toLowerCase();
        project.category = project.category.toLowerCase();
        project.description = project.description.toLowerCase();
        project.starts_at = parseStartsAt(project.starts_at);
        return project
    });

    return request[id ? 'private' : 'public']().then(([home, about, archive = [], privateInfo = {}]) => ({
        about,
        home: parse(home),
        archive: parse(archive),
        privateInfo
    }));

}



// ------------------
// Preload
// ------------------

export const Preload = ({home, archive}, callback) => {

    let loaded = 0;

    const projects = [...home, ...archive];
    const images = projects.map(project => project.frame).concat(home.map(project => project.cover)).filter(unique);
    const videos = projects.map(project => project.video).filter(unique);

    function unique (value, index, self) {
        return self.indexOf(value) === index;
    }

    function assetLoaded () {
        loaded++;
        callback(loaded / (images.length + videos.length));
    }

    function videoLoaded (event) {
        const {src, videoWidth, videoHeight} = event.target;
        projects.forEach(project => {
            if (project.video !== src) return;
            project.videoWidth = videoWidth;
            project.videoHeight = videoHeight;
        });
        document.body.removeChild(event.target);
        assetLoaded();
    }

    images.forEach(src => {
        const $image = new Image();
        $image.addEventListener('load', assetLoaded);
        $image.src = src;
    })

    videos.filter(unique).forEach(src => {
        const $video = document.createElement('video');
        $video.addEventListener('canplay', videoLoaded);
        $video.style.display = 'none';
        $video.src = src;
        $video.load();
        document.body.appendChild($video);
    })

}
