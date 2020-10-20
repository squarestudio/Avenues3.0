import Timeout from '@/common/scripts/utils/timeout'

export default function (time = 8000) {
    return {

        data () {
            return {
                minimized: false,
                timeout: new Timeout(time, this.minimizeExec)
            }
        },

        methods: {

            minimizeReset () {
                if (!this.contain) return;
                this.minimized = false;
                this.timeout.stop();
                this.timeout.start();
            },

            minimizeExec () {
                this.minimized = true;
            }

        },

        watch: {

            contain: {
                immediate: true,
                handler (value) {
                    if (value) this.timeout.start();
                    else this.timeout.stop();
                }
            }

        }

    }
}
