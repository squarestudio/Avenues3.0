<!--
    Styles
-->

<style scoped>

    main {
        overflow: hidden;
    }
    .slider > * {
        height: 100%;
    }
    .slider.immediate {
        transition: none !important;
    }
    
</style>



<!--
    Template
-->

<template>
    <main class="u-stretch">
        <div class="slider" ref="slider" :class="{immediate}" @transitionend="update">

            <home-project
                v-for="project in projects"
                :project="project"
                :contain="contain"
                :active="project.active"
                @video="$emit('update:video', $event)"
                @end="next"
            />

            <home-about />

        </div>
    </main>
</template>



<!--
    Scripts
-->

<script>

    import homeProject from './home.project.vue'
    import homeAbout from './home.about.vue'

    function pageY (event) {
        return (event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0] || event).pageY;
    }

    function extend (self) {
        return self.$store.state.home.map(project => Object.assign({
            active: false
        }, project));
    }

    export default {

        components: {
            homeProject,
            homeAbout
        },

        props: [
            'contain',
            'index'
        ],

        data () {
            return {
                projects: extend(this),
                drag: false,
                prev: -1,
                immediate: true
            }
        },

        computed: {

            $slider () {
                return this.$refs.slider;
            },

            $slides () {
                return Array.from(this.$slider.children);
            }

        },

        methods: {

            start (event) {
                if (this.contain) return;
                // this.immediate =
                const y = this.$slider.getBoundingClientRect().top;
                const e = pageY(event);
                this.drag = {y, e};
                this.$slider.style.transition = 'node';
                this.$slider.style.transform = `translateY(${y}px)`;
            },

            move (event) {
                if (!this.drag) return;
                const e = pageY(event);
                let y = this.drag.y + e - this.drag.e;
                if (y > 0 || y < window.innerHeight - this.$slider.offsetHeight) y = this.drag.y + (e - this.drag.e) / 4;
                this.$slider.style.transform = `translateY(${y}px)`;
                event.preventDefault();
            },

            end () {

                if (!this.drag) return;
                this.drag = false;

                let index = this.$slides.findIndex(($slide, i) => {
                    if (i === this.index) return;
                    const slide = $slide.getBoundingClientRect();
                    const y11 = slide.top;
                    const y12 = y11 + slide.height;
                    const y21 = 0;
                    const y22 = y21 + window.innerHeight;
                    const h = Math.min(y12, y22) - Math.max(y11, y21);
                    if (h > window.innerHeight * 0.1) return true;
                });

                if (index !== -1) return this.$emit('update:index', index);
                this.$slider.style.transition = `transform .3s`;
                this.show();

            },

            show () {
                const y = 100 / this.$slides.length * this.index;
                this.$slider.style.transform = `translateY(-${y}%)`;
            },

            update () {
                if (this.projects[this.index]) this.projects[this.index].active = true;
                if (this.projects[this.prev]) this.projects[this.prev].active = false;
            },

            next () {
                let next = this.index + 1;
                if (this.contain && next > this.projects.length - 1) next = 0;
                this.$emit('update:index', next);
            }

        },

        watch: {

            index (curr, prev) {
                this.prev = prev;
                this.$slider.style.transition = `transform .5s`;
                this.show();
                this.immediate && this.update();
            },

            contain (value) {
                this.immediate = value;
            }

        },

        mounted () {
            this.show();
            this.update();
            this.immediate = this.contain;
            this.$el.addEventListener('mousedown', this.start);
            document.addEventListener('mousemove', this.move);
            document.addEventListener('mouseup', this.end);
            document.addEventListener('mouseleave', this.end);
            document.addEventListener('touchstart', this.start);
            document.addEventListener('touchmove', this.move, {passive: false});
            document.addEventListener('touchend', this.end);
            document.addEventListener('touchcancel', this.end);
        },

        destroyed () {
            this.$el.removeEventListener('mousedown', this.start);
            document.removeEventListener('mousemove', this.move);
            document.removeEventListener('mouseup', this.end);
            document.removeEventListener('mouseleave', this.end);
            document.removeEventListener('touchstart', this.start);
            document.removeEventListener('touchmove', this.move, {passive: false});
            document.removeEventListener('touchend', this.end);
            document.removeEventListener('touchcancel', this.end);
        }

    }

</script>