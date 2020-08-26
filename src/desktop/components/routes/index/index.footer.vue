<!--
    Styles
-->

<style scoped>

    
    
</style>



<!--
    Template
-->

<template>
    <div class="u-grid">

        <div>
            {{about.title}}
        </div>

        <div class="u-text" v-html="about.contacts_1"></div>

        <div class="u-text" v-html="about.contacts_2"></div>

    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'

    export default {

        computed: {

            ...mapState('App', [
                'about'
            ])

        }

    }

</script>