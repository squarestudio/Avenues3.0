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

    .prev svg {
        height: 1rem;
    }


    
</style>



<!--
    Template
-->

<template>
    <div class="controls u-row u-flex" @mouseleave="activate(null)">


        <!-- prev -->

        <div class="area prev" @mousemove="move" @mouseenter="activate('prev')">
            <div class="badge" :class="{active: badge === 'prev'}">
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

        <div class="area next u-flex" @mousemove="move" @mouseenter="activate('next')">
            <div class="badge" :class="{active: badge === 'next'}">
                01 / {{home.length | digits}}
            </div>

        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapMutations} from 'vuex'
    import iconPrev from '@/common/icons/prev.svg'

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
                badge: null
            }
        },

        computed: {

            ...mapState('App', [
                'home'
            ]),

            ...mapState('Home', [
                'paused'
            ])

        },

        methods: {

            ...mapMutations('Home', [
                'toggle'
            ]),

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
            }

        }

    }

</script>