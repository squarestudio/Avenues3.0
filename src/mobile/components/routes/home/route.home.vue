<!--
    Styles
-->

<style>

    
    
</style>



<!--
    Template
-->

<template>
    <section id="home" class="u-stretch">

        <home-slider :contain.sync="contain" :index.sync="index" :video.sync="video" />
        <home-header :contain.sync="contain" :menu.sync="menu" />

        <transition name="fade">
            <ui-controls v-show="!menu" :projects="home" :index="index" :bar="contain" :video="video" />
        </transition>

    </section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import uiControls from '@/mobile/components/ui/controls.vue'
    import homeSlider from './home.slider.vue'
    import homeHeader from './home.header.vue'

    export default {

        components: {
            homeSlider,
            homeHeader,
            uiControls
        },

        data () {
            return {
                video: {},
                menu: false
            }
        },

        computed: {

            ...mapState([
                'home'
            ]),

            contain: {

                get () {
                    return this.$route.query.contain
                },

                set (value) {
                    this.query({contain: value ? value : undefined});
                }

            },

            index: {

                get () {
                    let id = this.$route.query.id;
                    if (id === 'about') return this.home.length;
                    const index = this.home.findIndex(project => project.id === +id);
                    return index === -1 ? 0 : index;
                },

                set (index) {
                    let id;
                    if (index === this.home.length) id = 'about';
                    else id = this.home[index] ? this.home[index].id : undefined;
                    this.query({id});
                }

            }

        },

        methods: {

            query (query) {
                this.$router.push({query: {
                    ...this.$route.query,
                    ...query
                }});
            }

        }

    }

</script>