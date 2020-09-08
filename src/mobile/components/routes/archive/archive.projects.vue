<!--
    Styles
-->

<style scoped>


    /* ticker */

    .ui-ticker span:after {
        content: '/';
        margin: 0 .3rem;
    }
    .ui-ticker span:last-child:after {
        visibility: hidden;
    }
    .ui-ticker.active span:last-child:after {
        visibility: visible;
    }


    /* accordion */

    .accordion {
        overflow: hidden;
        transition: transform .5s;
    }
    .accordion-enter,
    .accordion-leave-to {
        height: 0 !important;
    }
    .accordion-enter-active,
    .accordion-leave-active {
        transition: height .3s;
    }
    .accordion .ui-video {
        border-bottom: 1px solid #000000;
    }


    /* immediate */

    .immediate .accordion {
        transition: none !important;
    }


</style>



<!--
    Template
-->

<template>
    <div class="projects" :class="{immediate}">
        <div class="project" v-for="(project, i) in sorted" :key="project.id">


            <!-- title -->

            <ui-ticker class="row u-row" :active="i === index" @click.native="activate(project.id)">
                <span>{{ project.client }}</span>
                <span>{{ project.title }}</span>
                <span>{{ project.category }}</span>
                <span>{{ project.editor }}</span>
            </ui-ticker>


            <!-- video -->

            <transition
                appear
                name="accordion"
                @before-enter="beforeEnter($event, i)"
                @after-enter="afterEnter($event, i)"
                @before-leave="beforeLeave($event, i)"
                @after-leave="afterLeave($event, i)">

                <div class="accordion" ref="accordion" v-show="i === index">
                    <ui-video
                        ref="video"
                        :video="project.video"
                        :poster="project.frame"
                        :paused="project.paused"
                        :active="project.active"
                        :style="project.style"
                        @end="next"
                        @click.native="$emit('update:contain', true)"
                    />
                </div>
            </transition>



        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import uiVideo from '@/common/components/ui/video.vue'
    import uiTicker from '@/common/components/ui/ticker.vue'

    function timeout (time = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    function extend (self) {
        return self.$store.state.archive.map(project => Object.assign({
            paused: true,
            active: false,
            playable: false,
            style: {
                width: '',
                height: ''
            },
        }, project));
    }

    export default {

        components: {
            uiVideo,
            uiTicker
        },

        props: [
            'active',
            'contain',
            'search',
            'sort',
            'video'
        ],

        data () {
            return {
                archive: extend(this),
                immediate: true
            }
        },

        computed: {

            index () {
                return this.sorted.findIndex(project => project.id === this.active);
            },

            sorted () {
                return this.archive
                    .filter(project => {
                        return !this.search ||
                        project.client.includes(this.search) ||
                        project.title.includes(this.search) ||
                        project.category.includes(this.search) ||
                        project.editor.includes(this.search);
                    })
                    .sort((a, b) => {
                        if (a[this.sort] < b[this.sort]) return -1;
                        if (a[this.sort] > b[this.sort]) return 1;
                        return 0;
                    });
            }

        },

        methods: {

            beforeEnter ($node, i) {
                $node.style.height = this.sorted[i].style.height;
                this.sorted[i].active = true;
            },

            afterEnter ($node, i) {
                $node.style.height = '';
                this.sorted[i].paused = false;
            },

            beforeLeave ($node, i) {
                $node.style.height = this.sorted[i].style.height;
                this.sorted[i].paused = true;
            },

            afterLeave ($node, i) {
                $node.style.height = '';
                this.sorted[i].active = false;
            },

            resize () {
                this.archive.forEach(project => {
                    const rw = window.innerWidth / project.videoWidth;
                    const rh = window.innerHeight / project.videoHeight;
                    const r = Math.min(rw, rh);
                    project.style.width = r * project.videoWidth + 'px';
                    project.style.height = r * project.videoHeight + 'px';
                })
            },

            scrollToVideo (curr, prev) {
                if (curr === -1) return;
                const $curr = this.$refs.accordion[curr];
                const $prev = this.$refs.accordion[prev];
                const height = parseFloat(this.sorted[curr].style.height);
                const top = $curr.getBoundingClientRect().top;
                let scroll = top - (window.innerHeight - height) / 2;
                if (prev > -1 && prev < curr) scroll -= $prev.getBoundingClientRect().height;
                this.$emit('scroll', scroll, this.immediate ? 0 : 300);
            },

            centerVideo () {
                const $accordion = this.$refs.accordion[this.index];
                if (!$accordion) return;
                if (!this.contain) return ($accordion.style.transform = '');
                const top = $accordion.getBoundingClientRect().top;
                const height = parseFloat(this.sorted[this.index].style.height);
                const y = (window.innerHeight - height) / 2 - top;
                $accordion.style.transform = `translateY(${y}px)`;
            },

            activate (id) {
                this.immediate = false;
                if (this.active === id) id = -1;
                this.$emit('update:active', id);
            },

            setVideo () {
                const $video = this.$refs.video[this.index];
                this.$emit('update:video', $video ? $video.$refs.video : {});
            },

            next () {
                if (!this.contain) return this.video.play();
                let next = this.index + 1;
                if (next > this.sorted.length - 1) next = 0;
                this.immediate = true;
                this.$emit('update:active', this.sorted[next].id);
            },

            reset () {
                this.immediate = true;
                this.$emit('update:active', -1);
            },

        },

        watch: {

            sort () {
                this.reset();
            },

            search () {
                this.reset();
            },

            async index (curr, prev) {
                this.setVideo();
                await this.$nextTick();
                this.scrollToVideo(curr, prev);

            },

            contain () {
                this.immediate = false;
                this.centerVideo();
            }

        },

        async mounted () {
            this.setVideo();
            this.resize();
            await this.$nextTick();
            this.scrollToVideo(this.index, -1);
            await timeout();
            this.centerVideo();
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>