<!--
    Styles
-->

<style scoped>


    /* main */

    nav {
        position: relative;
        align-items: stretch;
        cursor: none;
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
    <nav class="u-row" @mouseleave="leave">


        <!-- next -->

        <div class="area next"
             @mousemove="move"
             @mouseenter="enter"
             @mouseleave="leave"
             @click="next">

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
             @click="$emit('prev')">

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


    // imports

    import {mapState} from 'vuex'
    import iconPrev from '@/common/assets/icons/prev.svg'


    // timeout helper

    class Timeout {

        constructor () {
            this.active = false;
            this.timeout = null;
        }

        start () {
            this.active = true;
            this.timeout = setTimeout(this.stop.bind(this), 5000);
        }

        stop () {
            this.active = false;
            clearTimeout(this.timeout);
        }

    }


    // exports

    export default {

        components: {
            iconPrev
        },

        props: [
            'paused',
            'index',
            'video'
        ],

        filters: {

            digits (value) {
                return ('0' + value).slice(-2);
            }

        },

        data () {
            return {
                timeout: new Timeout()
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

            next () {

                if (this.timeout.active) return this.$emit('next');
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