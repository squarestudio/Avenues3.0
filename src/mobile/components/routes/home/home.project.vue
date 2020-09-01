<!--
    Styles
-->

<style scoped>

    .project {
        overflow: hidden;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="project">
        <img :src="project.cover">
    </div>
</template>



<!--
    Scripts
-->

<script>

    export default {

        props: [
            'project'
        ]

    }

</script>