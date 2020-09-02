<!--
    Styles
-->

<style scoped>

    .test-enter {
        height: 0 !important;
    }
    .test-enter-to {

    }
    .test-enter-active {
        /*transition: height 1s;*/
    }
    .test-leave {

    }
    .test-leave-to {
        height: 0 !important;
    }
    .test-leave-active {
        /*transition: height 1s;*/
        /*transition: height 1s;*/
    }

    #test {
        background: #000;
    }
    
</style>



<!--
    Template
-->

<template>
    <div>

    <button @click="toggle">Toggle</button>

    <transition name="test"
        v-on:before-enter="beforeEnter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled">

        <div id="test" v-show="active">

        </div>
    </transition>

    </div>
</template>



<!--
    Scripts
-->

<script>

    let time;

    export default {

        data () {
            return {
                active: false
            }
        },

        methods: {

            toggle () {
                this.active = !this.active;
            },

            // --------
            // ENTERING
            // --------

            beforeEnter: function (el) {
                console.log('beforeEnter');
                el.style.height = '100px'
            },

            afterEnter: function (el) {
                console.log('afterEnter');
                el.style.height = ''
            },
            enterCancelled: function (el) {
                // ...
            },

            // --------
            // LEAVING
            // --------

            beforeLeave: function (el) {
                console.log('beforeLeave');
                el.style.height = '100px'
            },

            afterLeave: function (el) {
                console.log('afterLeave');
                el.style.height = ''
            },
            // leaveCancelled only available with v-show
            leaveCancelled: function (el) {
                // ...
            }

        }

    }

</script>