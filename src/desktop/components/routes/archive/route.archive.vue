<style>

    #archive {
        background: #FFF;
        color: #000;
    }

</style>

<template>
    <section id="archive" class="u-stretch">
        Archive
        <a @click="back()">Back</a>
    </section>
</template>


<script>

    import backMixin from '@/desktop/common/mixins/back'

    export default {

        mixins: [
            backMixin
        ]

    }

</script>