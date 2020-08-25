export default {

    data () {
        return {
            canGoBack: false
        }
    },

    beforeRouteEnter (to, from, next) {
        next(vm => vm.canGoBack = !!from.name);
    },

    methods: {

        back () {
            if (this.canGoBack) this.$router.back();
            else this.$router.push('/');
        }

    }

}