<!--
    Styles
-->

<style scoped>


    /* main */

    nav {
        position: relative;
        align-items: stretch;
        cursor: none;
        transition: opacity .3s;
    }
    nav.minimized {
        opacity: 0;
    }


    /* area */

    .area {
        position: relative;
        flex-basis: 25%;
    }
    .area .badge {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
        white-space: nowrap;
    }
    .area.active .badge {
        visibility: visible;
    }


    /* next */

    .next svg {
        height: 1rem;
    }



    
</style>



<!--
    Template
-->

<template>
    <nav class="u-row" @mouseleave="leave" :class="{minimized}">


        <!-- next -->

        <div class="area next"
             @mousemove="move"
             @mouseenter="enter"
             @mouseleave="leave"
             @click="prev">

            <div class="badge">
                <icon-prev />
            </div>

        </div>


        <!-- pause -->

        <div class="area pause"
             @mousemove="move"
             @mouseenter="enter"
             @mouseleave="leave"
             @click="$emit('update:paused', !paused)">

            <div class="badge">
                {{ paused ? 'Play' : 'Stop' }}
            </div>

        </div>


        <!-- prev -->

        <div class="area prev u-flex"
             @mousemove="move"
             @mouseenter="enter"
             @mouseleave="leave"
             @click="$emit('next')">

            <div class="badge">
                {{ (index + 1) | digits }} / {{ home.length | digits }}
            </div>

        </div>


    </nav>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import Timeout from '@/common/scripts/utils/timeout'
    import iconPrev from '@/common/assets/icons/prev.svg'

    export default {

        components: {
            iconPrev
        },

        props: [
            'paused',
            'index',
            'video',
            'minimized'
        ],

        filters: {

            digits (value) {
                return ('0' + value).slice(-2);
            }

        },

        data () {
            return {
                timeout: new Timeout(5000)
            }
        },

        computed: {

            ...mapState([
                'home'
            ])

        },

        methods: {

            enter (event) {
                event.currentTarget.classList.add('active');
                this.move(event);
            },

            leave (event) {
                event.currentTarget.classList.remove('active');
            },

            move (event) {
                const $area = event.currentTarget;
                const $badge = $area.firstElementChild;
                const area = $area.getBoundingClientRect();
                const badge = $badge.getBoundingClientRect();
                $badge.style.left = event.clientX - area.left - badge.width / 2 + 'px';
                $badge.style.top = event.clientY - area.top - badge.height / 2 + 'px';
            },

            prev () {
                if (this.timeout.active) return this.$emit('prev');
                this.video.currentTime = 0;
                this.timeout.start();
                this.$emit('update:paused', false);
            }

        },

        watch: {

            index () {
                this.timeout.stop();
            }

        }

    }

</script>