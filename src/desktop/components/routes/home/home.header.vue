<!--
    Styles
-->

<style scoped>

    .link {

    }

    .project {
        display: none;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="u-grid">


        <!-- logo -->

        <div>
            <a class="logo link">Avenues</a>
        </div>


        <!-- index -->

        <div>
            <a class="u-link" data-route-to="index">Index</a>
        </div>


        <!-- project -->

        <div class="project" v-for="(project, i) in home" v-if="i === active">

            <a class="target u-row">{{project.client}}</a>

            <div class="source">
                <div class="move">
                    <div class="u-text">{{project.description}}</div>
                </div>
            </div>

        </div>


        <!-- buttons -->

        <div class="buttons u-row">

        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'

    export default {

        computed: {

            ...mapState('App', ['home']),
            ...mapState('Home', ['active'])

        }

    }

</script>