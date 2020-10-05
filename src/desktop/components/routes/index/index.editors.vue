<!--
    Styles
-->

<style scoped>

    .editors {
        align-items: center;
        justify-content: center;
        background: rgba(247,247,247,0.98);
    }

</style>



<!--
    Template
-->

<template>
    <div class="editors u-stretch u-col" v-show="editors">
        <a v-for="editor in list" :key="editor" @click="select(editor)">{{editor}}</a>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'

    export default {

        props: [
            'editors'
        ],

        computed: {

            ...mapState([
                'home'
            ]),

            list () {

                const editorsRate = this.home.reduce((result, project) => {
                    project.editor.split(', ').forEach(editor => {
                        result[editor] = result[editor] + 1 || 1;
                    })
                    return result;
                }, {});

                return Object.keys(editorsRate).sort((a, b) => {
                    return editorsRate[b] - editorsRate[a];
                });

            }

        },

        methods: {

            select (editor) {
                this.$emit('update:filter', editor);
                this.$emit('update:editors', false);
            }

        }


    }

</script>
