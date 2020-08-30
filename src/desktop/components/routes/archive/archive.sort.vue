<!--
    Styles
-->

<style scoped>

    .sort {
        border-top: 1px solid #000000;
    }
    .sort a svg {
        opacity: 0;
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
    }
    .sort a:hover svg {
        opacity: 1;
    }
    .sort a.active svg {
        opacity: 1;
    }
    
</style>



<!--
    Template
-->

<template>
    <div class="sort u-grid row">
         <div v-for="row in rows">
             <a class="u-row u-link" @click="set({sort: row.key})" :class="{active: sort === row.key}">
                 <span>{{ row.label }}</span>
                 <icon-up />
             </a>
         </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import {mapState, mapMutations} from 'vuex'
    import iconUp from '@/common/icons/up.svg'

    export default {

        components: {
            iconUp
        },

        data () {
            return {
                rows: [{
                    label: 'Client',
                    key: 'client',
                }, {
                    label: 'Project',
                    key: 'title',
                }, {
                    label: 'Category',
                    key: 'category',
                }, {
                    label: 'Editor',
                    key: 'editor',
                }]
            }
        },

        computed: {

            ...mapState('Archive', ['sort'])

        },

        methods: {

            ...mapMutations('Archive', ['set'])

        }


    }

</script>