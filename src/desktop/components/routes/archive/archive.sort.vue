<!--
    Styles
-->

<style scoped>


    /* main */

    nav {
        border-top: 1px solid #000000;
    }


    /* link */

    a svg {
        opacity: 0;
        width: 1rem;
        height: 1rem;
        margin-left: .25rem;
    }
    a:hover svg {
        opacity: 1;
    }
    a.active svg {
        opacity: 1;
    }


</style>



<!--
    Template
-->

<template>
    <nav class="u-grid row">
         <div v-for="row in rows">
             <a class="u-row u-link" @click="update(row.key)" :class="{active: sort === row.key}">
                 <span>{{ row.label }}</span>
                 <icon-up />
             </a>
         </div>
    </nav>
</template>



<!--
    Scripts
-->

<script>

    import iconUp from '@/common/assets/icons/up.svg'

    const rows = [
        {
            label: 'Client',
            key: 'client',
        },
        {
            label: 'Project',
            key: 'title',
        },
        {
            label: 'Category',
            key: 'category',
        },
        {
            label: 'Editor',
            key: 'editor',
        }
    ]

    export default {

        components: {
            iconUp
        },

        props: [
            'sort'
        ],

        data () {
            return {
                rows
            }
        },

        methods: {

            update (value) {
                this.$emit('update:sort', value);
            }

        }


    }

</script>