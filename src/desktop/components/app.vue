<style>

    div {
        background: #F00;
    }

</style>

<template>
    <div>
        App {{id}}
        <router-link to="/">Home</router-link>
        <router-link to="/index">Index</router-link>

        <router-view />
    </div>
</template>


<script>

    export default {

        data () {
            return {
                id: 1
            }
        },

        mounted () {
            console.log('here')
        }

    }

</script>