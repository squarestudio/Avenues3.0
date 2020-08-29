<!--
    Styles
-->

<style scoped>


    /* main */

    .controls {
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
        left: 50%;
        top: 70%;
        pointer-events: none;
        white-space: nowrap;
    }
    .area .badge.active {
        visibility: visible;
    }


    /* prev */

    .next svg {
        height: 1rem;
    }


    
</style>



<!--
    Template
-->

<template>
    <div class="controls u-row u-flex" @mouseleave="activate(null)">


        <!-- prev -->

        <div class="area next" @mousemove="move" @mouseenter="activate('next')" @click="next">
            <div class="badge" :class="{active: badge === 'next'}">
                <icon-prev />
            </div>
        </div>


        <!-- stop -->

        <div class="area stop" @mousemove="move" @mouseenter="activate('stop')" @click="toggle('paused')">
            <div class="badge" :class="{active: badge === 'stop'}">
                {{paused ? 'Play' : 'Stop'}}
            </div>
        </div>


        <!-- next -->

        <div class="area prev u-flex" @mousemove="move" @mouseenter="activate('prev')" @click="prev">
            <div class="badge" :class="{active: badge === 'prev'}">
                {{(index + 1) | digits}} / {{home.length | digits}}
            </div>
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    // imports

    import {mapState, mapGetters, mapMutations} from 'vuex'
    import iconPrev from '@/common/icons/prev.svg'


    // wait helper

    class Wait {

        constructor () {
            this.waiting = false;
            this.timeout = null;
        }

        wait () {
            this.waiting = true;
            this.timeout = setTimeout(this.stop, 5000);
        }

        stop () {
            this.waiting = false;
            clearTimeout(this.timeout);
        }

    }


    // exports

    export default {

        components: {
            iconPrev
        },

        filters: {

            digits (value) {
                return ('0' + value).slice(-2);
            }

        },

        data () {
            return {
                badge: null,
                wait: new Wait()
            }
        },

        computed: {

            ...mapState('App', ['home']),
            ...mapState('Home', ['paused', 'video']),
            ...mapGetters('Home', ['index'])

        },

        methods: {

            ...mapMutations('Home', ['toggle', 'set']),

            activate (value) {
                this.badge = value;
            },

            move (event) {
                const $area = event.currentTarget;
                const $badge = $area.querySelector('.badge');
                const area = $area.getBoundingClientRect();
                const badge = $badge.getBoundingClientRect();
                $badge.style.left = event.clientX - area.left - badge.width / 2 + 'px';
                $badge.style.top = event.clientY - area.top - badge.height / 2 + 'px';
            },

            next () {
                if (this.wait.waiting) {
                    let next = this.index + 1;
                    if (next > this.home.length - 1) next = 0;
                    this.$router.push({query: {id: this.home[next].id}});
                }
                else {
                    this.video.currentTime = 0;
                    this.wait.wait();
                    this.set({paused: false});
                }
            },

            prev () {
                let prev = this.index - 1;
                if (prev < 0) prev = this.home.length - 1;
                this.$router.push({query: {id: this.home[prev].id}});
            }

        },

        watch: {

            index () {
                this.wait.stop();
            }

        }

    }

</script>