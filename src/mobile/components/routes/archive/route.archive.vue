<!--
    Styles
-->

<style>


    /* main */

    #archive {
        overflow: auto;
        transition: background .5s;
    }
    #archive main {
        padding-top: 2rem;
    }
    #archive nav {
        z-index: 1;
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
    <section id="archive" class="th-white u-stretch" :class="{contain}" @mousemove="minimizeReset">


        <!-- headers -->

        <archive-header-cover />

        <transition name="fade">
            <archive-header-contain
                v-show="contain && !minimized"
                :active="active"
                :contain.sync="contain"
            />
        </transition>


        <!-- main -->

        <main>

            <archive-filters
                :sort.sync="sort"
                :search.sync="search"
            />

            <archive-projects
                :showed="showed"
                :active.sync="active"
                :contain.sync="contain"
                :video.sync="video"
                :search="search"
                :sort="sort"
                @scroll="scroll"
            />

            <archive-footer />

        </main>


        <!-- controls -->

        <transition name="fade">
            <ui-controls
                v-if="contain && !minimized"
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
    import minimize from '@/common/scripts/mixins/minimize'
    import archiveHeaderCover from './archive.header.cover.vue'
    import archiveHeaderContain from './archive.header.contain.vue'
    import archiveFilters from './archive.filters.vue'
    import archiveProjects from './archive.projects.vue'
    import archiveFooter from './archive.footer.vue'
    import uiControls from '@/mobile/components/ui/controls.vue'

    export default {

        components: {
            archiveHeaderCover,
            archiveHeaderContain,
            archiveFilters,
            archiveProjects,
            archiveFooter,
            uiControls
        },

        mixins: [
            minimize()
        ],

        data () {
            return {
                showed: false,
                sort: false,
                search: '',
                video: {},
                animation: new Animation({
                    easing: 'inOut',
                    update: this.setScroll
                })
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
                this.animation.from(from).to(to).duration(duration).start();
            }

        },

        created () {
            this.$parent.$once('afterEnter', () => this.showed = true);
        }

    }

</script>
