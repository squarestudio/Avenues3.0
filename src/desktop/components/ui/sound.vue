<!--
    Styles
-->

<style>

    .ui-sound:not(.active) span:nth-child(2) {
        display: none;
    }
    .ui-sound.active span:nth-child(3) {
        display: none;
    }

</style>



<!--
    Template
-->

<template>
    <a class="ui-sound u-link">
        <span>Sound</span>
        <span>Off</span>
        <span>On</span>
    </a>
</template>



<!--
    Script
-->

<script>

    export default {



    }

    // import {App} from '@desktop/scripts/state'
    //
    // const $sounds = document.querySelectorArr('.ui-sound');
    // const $videos = document.querySelectorArr('video');
    //
    // $sounds.forEach($sound => $sound.addEventListener('click', () => {
    //     App.set('sound', !App.get('sound'));
    // }));
    //
    // App.watch('sound', value => {
    //     $sounds.forEach($sound => $sound.classList.toggle('active', value));
    //     $videos.forEach($video => $video.muted = !value);
    // });

</script>