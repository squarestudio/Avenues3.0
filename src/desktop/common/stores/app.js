// ------------------
// Dependencies
// ------------------

import API from '@/desktop/common/modules/api';
import speedTest from '@/common/scripts/speed';



// ------------------
// Constants
// ------------------

const convertedDir = `${API_ORIGIN}/uploads/${API_PROJECT}/converted`;



// ------------------
// Helpers
// ------------------

function parseProjects (data = [], bitrate) {
    return data.filter(item => item.projects_id).map(item => {
        let project = item.projects_id;
        project.cover = `${convertedDir}/covers/${project.cover}/${bitrate}.jpg`;
        project.frame = `${convertedDir}/frames/${project.video}/${bitrate}.jpg`;
        project.video = `${convertedDir}/videos/${project.video}/${bitrate}.mp4`;
        return project
    });
}

function unique (value, index, self) {
    return self.indexOf(value) === index;
}

function getBitRate(speed) {
    if (speed <= 128) return 480;
    if (speed <= 512) return 960;
    return 1920;
}



// ------------------
// Exports
// ------------------

export default {

    namespaced: true,

    state: {
        muted: false,
        bitrate: 1920,
        loadedAssets: 0,
        loaded: false,
        home: [],
        archive: [],
        about: {}
    },

    getters: {

        private: (state, getters, {route}) => {
            return /^private/.test(route.name) && route;
        },

        projects: ({home, archive}) => {
            return [...home, ...archive];
        },

        videos: ({home, archive}, getters) => {
            return getters.projects.map(project => project.video).filter(unique);
        },

        images: ({home, archive}, getters) => {
            return getters.projects.map(project => project.cover).concat(getters.projects.map(project => project.frame)).filter(unique);
        },

        assetsProgress: ({loadedAssets}, {videos, images}) => {
            return loadedAssets / (videos.length + images.length);
        }

    },

    mutations: {

        setMuted (state, value) {
            state.muted = value;
        },

        setState (state, value) {
            Object.keys(value).forEach(key => state[key] = value[key]);
        }

    },

    actions: {

        private ({getters}) {
            Promise.all([
                API('private', getters.private.params.id),
                API('about'),
            ]);
        },

        public ({commit}) {
            return Promise.all([
                API('home'),
                API('about'),
                API('archive'),
            ]);
        },

        getData ({state, commit, getters, dispatch}) {
            return dispatch(getters.private ? 'private' : 'public').then(data => {
                commit('setState', {
                    home: parseProjects(data[0], state.bitrate),
                    about: data[1],
                    archive: parseProjects(data[2], state.bitrate)
                })
            });
        },

        getBitRate ({state}, time) {
            return speedTest(time).then(speed => {
                state.bitrate = getBitRate(speed);
            })
        },

        loadAssets ({state, getters, dispatch}) {
            const complete = () => state.loadedAssets++;
            return Promise.all([
                ...getters.images.map(src => dispatch('loadImage', src).then(complete)),
                ...getters.videos.map(src => dispatch('loadVideo', src).then($video => dispatch('setVideoDone', $video)).then(complete))
            ])
        },

        loadImage ({state}, src) {
            return new Promise(resolve => {
                const $image = new Image();
                $image.addEventListener('load', () => resolve($image));
                $image.src = src;
            })
        },

        loadVideo ({state, dispatch}, src) {
            return new Promise(resolve => {
                const $video = document.createElement('video');
                $video.addEventListener('canplaythrough', () => document.body.removeChild($video) && resolve($video));
                $video.style.display = 'none';
                $video.src = src;
                $video.load();
                document.body.appendChild($video);
            })
        },

        setVideoDone ({state, getters}, {src, videoWidth, videoHeight}) {
            getters.projects.forEach(project => {
                if (project.video !== src) return;
                project.videoWidth = videoWidth;
                project.videoHeight = videoHeight;
            })
        }

    }

}