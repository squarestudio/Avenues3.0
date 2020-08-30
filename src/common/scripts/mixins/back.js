import {mapState} from 'vuex'

export default {

    data () {
        return {
            canGoBack: false
        }
    },

    computed: {

        ...mapState([
            'private'
        ])

    },

    beforeRouteEnter (to, from, next) {
        next(vm => vm.canGoBack = !!from.name);
    },

    methods: {

        back () {
            if (this.canGoBack) this.$router.back();
            else this.$router.push({name: this.private ? 'private' : 'home'});
        }

    }

}