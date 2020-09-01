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
        <home-slider :index.sync="index" />
        <home-header :contain.sync="contain" />
        <home-footer :contain="contain" />
        <ui-controls :projects="home" :index="index" :bar="contain" :video="video" />
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
    import homeFooter from './home.footer.vue'

    export default {

        components: {
            homeSlider,
            homeHeader,
            homeFooter,
            uiControls
        },

        data () {
            return {
                video: {}
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