<!--
    Styles
-->

<style>


    /* z-indexes */

    #archive header {z-index: 2;}
    #archive main   {z-index: 1;}
    #archive nav    {z-index: 3;}


    /* main */

    #archive {
        overflow: auto;
        transition: background .5s;
    }
    #archive main {
        padding-top: 4rem;
    }
    #archive .row {
        padding: var(--padding);
        border-bottom: 1px solid #000;
        white-space: nowrap;
        overflow: hidden;
    }


    /* contain */

    #archive.contain {
        background: #000;
        overflow: hidden;
    }
    #archive.contain main {
        pointer-events: none;
    }


</style>



<!--
    Template
-->

<template>
    <section id="archive" class="th-white u-stretch" :class="{contain}">


        <!-- header -->

        <archive-header
            :active="active"
            :contain.sync="contain"
        />


        <!-- main -->

        <main>

            <archive-filters
                :sort.sync="sort"
                :search.sync="search"
            />

            <archive-projects
                :active.sync="active"
                :contain.sync="contain"
                :video.sync="video"
                :search="search"
                :sort="sort"
                @scroll="scroll"
                @next="next"
            />

            <archive-footer />

        </main>


        <!-- controls -->

        <transition name="fade">
            <ui-controls
                v-if="contain"
                :bar="true"
                :projects="archive"
                :index="index"
                :video="video"
            />
        </transition>


    </section>
</template>



<!--
    Scripts
-->

<script>

    import {mapState} from 'vuex'
    import Animation from '@/common/scripts/utils/animation';
    import archiveHeader from './archive.header.vue'
    import archiveFilters from './archive.filters.vue'
    import archiveProjects from './archive.projects.vue'
    import archiveFooter from './archive.footer.vue'
    import uiControls from '@/mobile/components/ui/controls.vue'

    export default {

        components: {
            archiveHeader,
            archiveFilters,
            archiveProjects,
            archiveFooter,
            uiControls
        },

        data () {
            return {
                sort: false,
                search: '',
                video: {},
                animation: new Animation({
                    easing: 'inOut',
                    update: this.setScroll
                }),
            }
        },

        computed: {

            ...mapState([
                'archive'
            ]),

            active: {

                get () {
                    const id = +this.$route.query.id;
                    if (!id || !this.archive.find(project => project.id === id)) return -1;
                    return id;
                },

                set (id) {
                    if (id === -1) id = undefined;
                    this.query({id});
                }

            },

            index: {

                get () {
                    let id = +this.$route.query.id;
                    return this.archive.findIndex(project => project.id === id);
                },

                set (index) {
                    const id = this.archive[index] ? this.archive[index].id : undefined;
                    this.query({id});
                }

            },

            contain: {

                get () {
                    return this.$route.query.contain
                },

                set (value) {
                    this.query({contain: value ? value : undefined});
                }

            },

        },

        methods: {

            query (query) {
                this.$router.push({query: {
                    ...this.$route.query,
                    ...query
                }}).catch(() => {});
            },

            setScroll (value) {
                this.$el.scrollTop = value;
            },

            scroll (value, duration) {
                const from = this.$el.scrollTop;
                const to = this.$el.scrollTop + value;
                this.animation.from(from).to(to).duration(duration).start().complete(() => {
                    console.log('scroll done');
                });
            },

            next () {

            }

        }

    }

</script>