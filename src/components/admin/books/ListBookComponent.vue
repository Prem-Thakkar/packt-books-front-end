<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-2">
                <router-link class="admin-add-new-book-btn btn btn-dark" :to="{ name: 'admin.books.create' }">Add New
                    Book</router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
                <div class="grid search">
                    <div class="grid-body">
                        <div class="row">
                            <div>
                                <h2 class="mt-2 grid-title"><i class="fa fa-filter"></i> Filters <a @click="clearFilter()"
                                        class="reset-btn">Reset all</a></h2>
                                <hr>
                                <div class="row">
                                    <label> Title:
                                        <div class="input-group input-group-date-filter mb-3">
                                            <input type="text" class="form-control" placeholder="" v-model="TempTitle">
                                            <div class="input-group-append">
                                                <button @click="clearTitle()" class="btn" type="button">x</button>
                                            </div>
                                        </div>

                                    </label>
                                </div>

                                <div class="row mt-2">
                                    <label> Author:
                                        <div class="input-group input-group-date-filter mb-3">
                                            <input type="text" class="form-control" placeholder="" v-model="TempAuthor">
                                            <div class="input-group-append">
                                                <button @click="clearAuthor()" class="btn" type="button">x</button>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div class="row mt-2">
                                    <label> Genre:
                                        <div class="input-group input-group-date-filter mb-3">
                                            <input type="text" class="form-control" v-model="TempGenre" />
                                            <div class="input-group-append">
                                                <button @click="clearGenre()" class="btn" type="button">x</button>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div class="row mt-2">
                                    <label> ISBN:
                                        <div class="input-group input-group-date-filter mb-3">
                                            <input type="text" class="form-control" placeholder="" v-model="TempIsbn">
                                            <div class="input-group-append">
                                                <button @click="clearIsbn()" class="btn" type="button">x</button>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div class="row mt-2">
                                    <label> Published On:
                                        <div class="input-group input-group-date-filter mb-3">
                                            <input type="date" class="border-none-text-box published_on_box form-control"
                                                placeholder="" v-model="TempPublished_on">

                                            <div class="input-group-append">
                                                <button @click="clearPublishedOn()" class="btn" type="button">x</button>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <button @click="applyFilter()" class="btn btn-block btn-outline-dark"> Apply </button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-12 mt-2">
                        <EasyDataTable theme-color="#000" table-class-name="book-table" header-text-direction="center"
                            body-text-direction="center" :headers="headers" :items="items" v-model:payload="payload"
                            v-model:server-options="serverOptions" :server-items-length="serverItemsLength"
                            :loading="loading" :rowsItems="rowsItemsList" buttons-pagination>
                            <template #item-action="item">
                                <router-link class="btn btn-outline-dark btn-sm"
                                    :to="{ name: 'admin.books.edit', params: { id: item.id } }">Edit</router-link>

                                <button @click="deleteBook(item.id)" class="btn btn-outline-danger btn-sm">Delete</button>
                            </template>
                        </EasyDataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const headers = [
            { text: "ID", value: "id", sortable: true },
            { text: "Book Title", value: "title", sortable: true },
            { text: "Author", value: "author", sortable: true },
            { text: "Genre", value: "genre", sortable: true },
            { text: "Isbn", value: "isbn", sortable: true },
            { text: "Published On", value: "published_on", sortable: true },
            { text: "Action", value: "action", class: 'dsd' },
        ];
        return {
            headers,
            items: []
        };
    },
    data() {
        return {
            serverOptions: {
                page: 1,
                rowsPerPage: 5,
                sortBy: "id",
                sortType: "desc",
            },
            loading: false,
            serverItemsLength: null,
            payload: [],
            genres: [],
            TempTitle: "",
            TempAuthor: "",
            TempIsbn: "",
            TempGenre: "",
            TempPublished_on: "",
            rowsItemsList: [5, 10]
        };
    },
    mounted() {
        this.getBooksList();
    },
    watch: {
        serverOptions: {
            handler() {
                this.getBooksList();
            },
            deep: true,
        }
    },
    methods: {
        async getBooksList() {
            this.loading = true;
            this.payload = { ...this.serverOptions };
            this.payload.search = {
                title: this.title,
                author: this.author,
                isbn: this.isbn,
                genre: this.genre,
                published_on: this.published_on
            };
            var response = await this.frontendApi("POST", "books", this.payload);
            if (response) {
                this.items = response.data.records;
                this.serverItemsLength = response.data.recordsTotal;
                this.loading = false;
            }
        },
        applyFilter() {
            this.title = this.TempTitle,
                this.author = this.TempAuthor;
            this.isbn = this.TempIsbn;
            this.genre = this.TempGenre;
            this.published_on = this.TempPublished_on;
            this.resetServerOptions();
            this.getBooksList();
        },
        clearTitle() {
            this.title = "";
            this.TempTitle = "";
        },
        clearAuthor() {
            this.author = "";
            this.TempAuthor = "";
        },
        clearGenre() {

            this.genre = "";
            this.TempGenre = "";
        },
        clearIsbn() {
            this.isbn = "";
            this.TempIsbn = "";
        },
        clearPublishedOn() {
            this.published_on = "";
            this.TempPublished_on = "";
        },
        clearFilter() {
            this.resetServerOptions();
            this.title = "";
            this.author = "";
            this.isbn = "";
            this.genre = "";
            this.published_on = "";
            this.TempTitle = "";
            this.TempAuthor = "";
            this.TempIsbn = "";
            this.TempGenre = "";
            this.TempPublished_on = "";
            this.getBooksList();
        },
        resetServerOptions() {
            this.serverOptions.page = 1;
            this.serverOptions.sortBy = "id";
            this.serverOptions.sortType = "desc";
        },
        async deleteBook(id) {
            if (confirm('Are you sure?')) {
                this.store.dispatch('pageLoader', { show: true })
                var response = await this.adminApi('DELETE', 'books/' + id)
                if (response) {
                    this.store.dispatch('pageLoader', { show: false })
                    this.store.dispatch('alert', {
                        messages: response.message,
                        alertClass: 'success'
                    })
                }
                this.getBooksList();
            }
        }
    }
}
</script>