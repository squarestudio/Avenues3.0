<!--
    Styles
-->

<style scoped>


    /* input */

    input {
        width: 100%;
    }
    input::placeholder {
        color: #000000;
        transition: opacity .3s ease;
    }
    input:focus::placeholder {
        opacity: 0.5;
    }


    /* arrow */

    .arrow {
        position: relative;
        height: .6rem;
        width: 1px;
        background: #000;
        margin: 0 .6rem;
    }
    .arrow:before,
    .arrow:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .3rem;
        background: inherit;
        opacity: 0;
        transform-origin: 50% 100%;
        transition: opacity .3s;
    }
    .arrow:before {
        transform: rotate(-45deg);
    }
    .arrow:after {
        transform: rotate(45deg);
    }
    .arrow.active:before,
    .arrow.active:after {
        opacity: 1;
    }


</style>



<!--
    Template
-->

<template>
    <div class="filters">


        <!-- input -->

        <input
            class="row"
            placeholder="Search"
            :value="search"
            @input="$emit('update:search', $event.target.value.toLowerCase())"
        >


        <!-- sort -->

        <div class="u-row row">
            <div class="u-row" v-for="row in rows">
                <a @click="$emit('update:sort', row.key)">{{ row.label }}</a>
                <div class="arrow" :class="{active: sort === row.key}" />
            </div>
        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>

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

        props: [
            'sort',
            'search'
        ],

        data () {
            return {
                rows
            }
        },

    }

</script>