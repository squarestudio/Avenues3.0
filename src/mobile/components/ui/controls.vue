<!--
    Styles
-->

<style>


    /* main */

    .ui-controls {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: flex-end;
        padding: var(--padding);
        color: #FFFFFF;
    }


    /* overlay */

    .ui-controls .overlay {
        position: fixed;
        background: rgba(0,0,0,0.5);
        transition-duration: .3s;
    }


    /* progress */

    .ui-controls .progress {
        position: relative;
        flex-basis: 100%;
        height: .6rem;
        margin-bottom: 2.5rem;
        border-bottom: 1px solid currentColor;
    }
    .ui-controls .progress div {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        border-left: 1px solid currentColor;
    }
    .ui-controls .progress:not(.active) {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s .3s, opacity .3s, transform .3s;
    }
    .ui-controls .progress.active {
        visibility: visible;
        opacity: 1;
        transition: visibility 0s, opacity .3s, transform .3s;
    }


    /* project */

    .ui-controls .project {
        position: relative;
        transition: transform .3s;
    }
    .ui-controls .project .u-text {
        position: absolute;
        left: 0;
        top: 100%;
        padding-top: var(--padding);
    }


    /* index */

    .ui-controls .index {
        white-space: nowrap;
        overflow: hidden;
    }
    .ui-controls .index-enter,
    .ui-controls .index-leave-to {
        width: 0 !important;
    }
    .ui-controls .index-enter-active,
    .ui-controls .index-leave-active {
        transition: width .3s;
    }


</style>



<!--
    Template
-->

<template>
    <nav class="ui-controls">


        <!-- overlay -->

        <transition name="fade">
            <div class="overlay u-stretch"
                 v-show="menu"
                 @click="toggleMenu(false)"
            />
        </transition>


        <!-- progress -->

        <a class="progress" :class="{active: bar && !menu}" :style="{transform: menuTransform}" @click="setProgress">
            <div :style="{left: videoTime / videoDuration * 100 + '%'}"></div>
        </a>


        <!-- project -->

        <div class="project u-row" v-if="projects[index]" :style="{transform: menuTransform}" @click="toggleMenu()">

            <transition
                name="index"
                @leave="setIndexWidth($event, true)"
                @enter="setIndexWidth($event, true)"
                @after-leave="setIndexWidth($event, false)"
                @after-enter="setIndexWidth($event, false)">

                <div class="index" v-show="!bar">
                    <span>{{ index | index(projects.length) }}&nbsp;</span>
                </div>

            </transition>

            <div class="title">{{ projects[index].title }}</div>
            <div class="u-text" ref="notes" :inner-html.prop="projects[index].description | text" />

        </div>


        <!-- time -->

        <div class="time">
            {{ videoTime | time }}
        </div>


    </nav>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'projects',
            'index',
            'bar',
            'video'
        ],

        data () {
            return {
                menu: false,
                menuTransform: '',
                videoDuration: 0,
                videoTime: 0,
                videoLoop: null
            }
        },

        methods: {

            setIndexWidth ($index, set) {
                $index.style.width = set ? $index.firstElementChild.offsetWidth + 'px' : '';
            },

            toggleMenu (value = !this.menu) {
                this.menu = value;
            },

            setProgress (event) {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.pageX - rect.left;
                this.video.currentTime = this.videoDuration * x / rect.width;
            },

            updateProgress () {
                this.videoTime = this.video.currentTime;
                this.videoDuration = this.video.duration;
                this.videoLoop = requestAnimationFrame(this.updateProgress);
            }

        },

        watch: {

            menu (value) {
                this.menuTransform = value ? `translateY(-${this.$refs.notes.offsetHeight}px)` : '';
            }

        },

        mounted () {
            this.updateProgress();
        },

        destroyed () {
            cancelAnimationFrame(this.videoLoop);
        }

    }

</script>