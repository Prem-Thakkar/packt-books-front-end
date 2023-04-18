    <template>
        <user-common-header :backBtn=true />
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"
                            :src=book.image  /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">#{{ book.isbn }}</div>
                        <h1 class="display-5 fw-bolder">{{ book.title }}</h1>
                        <p class="lead">{{ book.description }}</p>
                    </div>
                </div>
            </div>
        </section>
    </template>

    <script>

    import UserCommonHeaderVue from '../layout/UserCommonHeader.vue';
    import { toRaw } from 'vue';

    export default {
        components: {
            'user-common-header': UserCommonHeaderVue
        },
        mounted() {
            this.getBook(this.$route.params.id)
        },
        data() {
            return {
                book: {},
            }
        },
        methods: {
            async getBook(id) {
                this.store.dispatch('pageLoader', { show: true })
                var response = await this.frontendApi('GET', 'books/' + id)
                if (response) {
                    this.book = toRaw(response.detail);
                    this.store.dispatch('pageLoader', { show: false })
                }
            }
        },
    }
    </script>