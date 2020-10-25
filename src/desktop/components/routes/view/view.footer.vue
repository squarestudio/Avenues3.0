<!--
    Styles
-->

<style scoped>


    /* main */

    footer {
        align-items: end;
        transition: opacity .3s;
    }
    footer.minimized {
        opacity: 0;
    }


    /* info */

    .info {
        position: relative;
        padding-right: 15%;
        overflow: hidden;
        transition: padding-top 0s .5s;
    }
    .info >>> .ui-menu {
        position: relative;
        transition: transform .5s;
    }
    .info >>> .source {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        padding-top: 1rem;
    }
    .info.active {
        transition: padding-top 0s;
    }


    /* buttons */

    .buttons {
        align-items: flex-end;
        grid-column-start: 4;
    }


    /* archive */

    .archive svg {
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
        flex-shrink: 0;
    }


    /* progress */

    .progress {
        text-align: right;
        margin-left: 30%;
    }
    .progress .bar {
        height: .6rem;
        border-bottom: 1px solid currentColor;
    }
    .progress .bar div {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        border-left: 1px solid currentColor;
    }


    /* bar types */

    .progress .bar.small {
        position: relative;
        margin-bottom: .6rem;
    }
    .progress .bar.large {
        position: absolute;
        left: var(--padding);
        right: 9.6rem;
        bottom: 1rem;
    }


    /* small bar transitions */

    .bar-small-enter,
    .bar-small-leave-to {
        opacity: 0;
    }
    .bar-small-enter-active,
    .bar-small-leave-active {
        transition: opacity .3s;
    }


    /* large bar transitions */

    .bar-large-enter,
    .bar-large-leave-to {
        transform: translateY(2.2rem);
    }
    .bar-large-enter-active,
    .bar-large-leave-active {
        transition: transform .3s;
    }


    /* fade transition */

    .fade-enter,
    .fade-leave-to {
        transform: translateY(-2.2rem);
        opacity: 0;
    }
    .fade-leave-active,
    .fade-enter-active {
        transition: transform .3s, opacity .3s;
    }


</style>



<!--
    Template
-->

<template>
    <footer class="u-grid" :class="{minimized}">


        <!-- info -->

        <transition name="fade">
            <div class="info" v-show="!contain" :class="{active: infoActive}" :style="{paddingTop: infoPadding}">
                <ui-menu
                    ref="infoMenu"
                    :style="{transform: `translateY(-${infoPadding})`}"
                    :active.sync="infoActive"
                    :target="about.desktop_title"
                    :source="about.desktop_description"
                    @enter="infoEnter"
                    @leave="infoLeave"
                />
            </div>
        </transition>


        <!-- contacts -->

        <transition name="fade">
            <div class="u-text" v-show="!contain" v-html="about.contacts_1"></div>
        </transition>

        <transition name="fade">
            <div class="u-text" v-show="!contain" v-html="about.contacts_2"></div>
        </transition>


        <!-- buttons -->

        <div class="buttons u-row">


            <!-- archive -->

            <transition name="fade">
                <router-link :to="{name: 'archive'}" class="archive u-row" v-show="!private && !contain">
                    <span>Archive</span>
                    <icon-open />
                </router-link>
            </transition>


            <!-- progress -->

            <div class="progress u-flex" @mouseenter="progressEnter" @mouseleave="progressLeave">
                <transition :name="`bar-${barType}`">
                    <a class="bar" :class="barType" v-show="contain || barActive" @click="setProgress">
                        <div :style="{left: videoTime / videoDuration * 100 + '%'}"></div>
                    </a>
                </transition>
                <div class="time">{{ videoTime | time }} / {{ videoDuration | time }}</div>
            </div>


        </div>


    </footer>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import iconOpen from '@/common/assets/icons/open.svg';
    import uiMenu from '@/desktop/components/ui/menu.vue'

    export default {

        components: {
            uiMenu,
            iconOpen
        },

        props: [
            'contain',
            'video',
            'minimized'
        ],

        data () {
            return {
                barActive: false,
                barType: 'large',
                infoActive: false,
                infoPadding: 0,
                videoDuration: 0,
                videoTime: 0,
                videoLoop: null
            }
        },

        computed: {

            ...mapState([
                'about',
                'private'
            ])

        },

        methods: {

            infoEnter () {
                const $source = this.$refs.infoMenu.$refs.source;
                this.infoPadding = $source.offsetHeight + 'px';
            },

            infoLeave () {
                this.infoPadding = 0;
            },

            progressEnter () {
                if (this.contain) return;
                this.barActive = true;
                this.barType = 'small';
            },

            progressLeave () {
                this.barActive = false;
            },

            updateProgress () {
                this.videoTime = this.video.currentTime;
                this.videoDuration = this.video.duration;
                this.videoLoop = requestAnimationFrame(this.updateProgress);
            },

            setProgress (event) {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.pageX - rect.left;
                this.video.currentTime = this.videoDuration * x / rect.width;
            }

        },

        watch: {

            contain (value) {
                if (value) this.barType = 'large'
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
