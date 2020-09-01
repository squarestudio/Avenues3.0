<!--
    Styles
-->

<style scoped>


    /* ticker */

    .ui-ticker span:after {
        content: '/';
        display: inline-block;
        margin: 0 var(--padding);
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
        transition: height .3s, transform .5s;
    }
    .accordion:not(.active) {
        height: 0 !important;
    }
    .accordion .ui-video {
        border-bottom: 1px solid #000000;
    }


</style>



<!--
    Template
-->

<template>
    <div class="projects">
        <div class="project" v-for="(project, i) in archive">


            <!-- title -->

            <ui-ticker class="row u-row" :active="index === i" @click.native="toggle(i)">
                <span>{{ project.client }}</span>
                <span>{{ project.title }}</span>
                <span>{{ project.category }}</span>
                <span>{{ project.editor }}</span>
            </ui-ticker>


            <!-- video -->

            <div class="accordion"
                 ref="accordion"
                 :style="{height: project.style.height}"
                 :class="{active: index === i}"
                 @transitionstart="start(i)"
                 @transitionend="end(i)">

                <ui-video
                    ref="video"
                    :video="project.video"
                    :poster="project.frame"
                    :paused="project.paused"
                    :active="project.active"
                    :style="project.style"
                    @click.native="$emit('update:contain', true)"
                />

            </div>

        </div>
    </div>
</template>



<!--
    Scripts
-->

<script>

    import uiVideo from '@/common/components/ui/video.vue'
    import uiTicker from '@/common/components/ui/ticker.vue'

    function extend (self) {
        return self.$store.state.archive.map(project => Object.assign({
            paused: false,
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
            'index',
            'contain'
        ],

        data () {
            return {
                archive: extend(this)
            }
        },

        methods: {

            resize () {
                this.archive.forEach(project => {
                    const rw = window.innerWidth / project.videoWidth;
                    const rh = window.innerHeight / project.videoHeight;
                    const r = Math.min(rw, rh);
                    project.style.width = r * project.videoWidth + 'px';
                    project.style.height = r * project.videoHeight + 'px';
                })
            },

            scroll (curr, prev, duration = 300) {
                if (curr === -1) return;
                const $curr = this.$refs.accordion[curr];
                const $prev = this.$refs.accordion[prev];
                const height = parseFloat($curr.style.height);
                const top = $curr.getBoundingClientRect().top;
                let scroll = top - (window.innerHeight - height) / 2;
                if (prev > -1 && prev < curr) scroll -= $prev.getBoundingClientRect().height;
                this.$emit('scroll', scroll, duration);
            },

            toggle (i) {
                if (i === this.index) i = -1;
                this.$emit('update:index', i);
            },

            start (i) {
                if (i === this.index) this.archive[i].active = true;
                else this.archive[i].paused = true;
            },

            end (i) {
                if (i === this.index) this.archive[i].paused = false;
                else this.archive[i].active = false;
            },

            setVideo () {
                this.$emit('update:video', this.$refs.video[this.index].$refs.video);
            }

        },

        watch: {

            index (curr, prev) {
                this.scroll(curr, prev);
                this.setVideo();
            },

            contain (value) {
                const $accordion = this.$refs.accordion[this.index];
                if (!value) return ($accordion.style.transform = '');
                const rect = $accordion.getBoundingClientRect();
                const y = (window.innerHeight - rect.height) / 2 - rect.top;
                $accordion.style.transform = `translateY(${y}px)`;
            }

        },

        mounted () {
            this.resize();
            this.setVideo();
            this.$nextTick(() => this.scroll(this.index, -1, 0));
            window.addEventListener('resize', this.resize);
        },

        destroyed () {
            window.removeEventListener('resize', this.resize);
        }

    }

</script>