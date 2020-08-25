<style>

    #home {
        /*background: #00F; */
    }

</style>

<template>
    <layout-section id="home">

        <template #header>
            Home
        </template>

        <template #main>

            <router-link to="/index">To index</router-link>
            <router-link to="/archive">To archive</router-link>
            <br>
            <br>
            <a @click="test()">Set query</a>
        </template>

        <template #footer>
            footer
        </template>

    </layout-section>
</template>


<script>

    import layoutSection from '@/desktop/components/layout/section.vue'

    export default {

        components: {
            layoutSection
        },

        methods: {

            test () {

                // this.

                this.$router.push({ name: 'home', query: { plan: Math.random() }})

            }

        }

    }

</script>