<template>
    <div class="container">
        <div class="card border-0 shadow rounded-3 my-3">
            <div class="card-body p-4 p-sm-5">
                <div class="card-title mb-2 fw-light fs-5 col-md-12" style="float: left;">
                    <router-link :to="{ name: 'admin.books' }" class="navbar-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg> &nbsp;
                    </router-link>
                </div>
                <form @submit.prevent="onSubmit" @submit="createBook()">
                    <div class="row">
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3" :class="{ error: v$.form.title.$errors.length }">
                                <input type="text" class="form-control" placeholder="" v-model="v$.form.title.$model">
                                <label for="floatingInput">Title</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.title.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" placeholder="" v-model="v$.form.author.$model">
                                <label for="floatingInput">Author</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.author.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" placeholder="" v-model="v$.form.genre.$model">
                                <label for="floatingInput">Genre</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.genre.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3">
                                <input type="number" class="form-control" placeholder="" v-model="v$.form.isbn.$model">
                                <label for="floatingInput">ISBN</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.isbn.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" placeholder="" v-model="v$.form.image.$model">
                                <label for="floatingInput">Image URL</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.image.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 mt-2">
                            <div class="form-floating mb-3">
                                <input type="date" class="form-control" placeholder="" v-model="v$.form.published_on.$model"
                                    :max="maxPublishedDate">
                                <label for="floatingInput">Published On</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.published_on.$errors"
                                    :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mt-2">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" placeholder="" v-model="v$.form.publisher.$model">
                                <label for="floatingInput">Publisher</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.publisher.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mt-2">
                            <div class="form-floating mb-3">
                                <textarea class="form-control" placeholder="" v-model="v$.form.description.$model" />
                                <label for="floatingInput">Description</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.description.$errors"
                                    :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 mt-2">
                            <button class="btn btn-dark col-12 mt-1 ml-2" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, url, numeric, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            form: {
                title: '',
                author: '',
                genre: '',
                isbn: '',
                image: '',
                published_on: '',
                publisher: '',
                description: '',
            },
            maxPublishedDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
        }
    },
    validations() {
        return {
            form: {
                title: {
                    required: helpers.withMessage('Please enter title', required),
                },
                author: {
                    required: helpers.withMessage('Please enter author', required),
                },
                genre: {
                    required: helpers.withMessage('Please enter genre', required),
                },
                isbn: {
                    required: helpers.withMessage('Please enter ISBN', required),
                    numeric: helpers.withMessage('Please enter valid ISBN', numeric),
                    minLength: helpers.withMessage('ISBN should be of 13 digits', minLength(13)),
                    maxLength: helpers.withMessage('ISBN should be of 13 digits', maxLength(13)),
                },
                image: {
                    required: helpers.withMessage('Please enter Image URL', required),
                    url: helpers.withMessage('Please enter valid URL', url)
                },
                published_on: {
                    required: helpers.withMessage('Please select Published Date', required),
                },
                publisher: {
                    required: helpers.withMessage('Please enter publisher', required),
                },
                description: {
                    required: helpers.withMessage('Please enter description', required),
                },
            },
        }
    },
    methods: {
        async createBook() {
            const formValidation = await this.v$.$validate()
            if (!formValidation) return
            this.store.dispatch('pageLoader', { show: true })
            var response = await this.adminApi('POST', 'books', {
                title: this.form.title,
                author: this.form.author,
                genre: this.form.genre,
                isbn: this.form.isbn,
                image: this.form.image,
                published_on: this.form.published_on,
                publisher: this.form.publisher,
                description: this.form.description,
            });
            this.store.dispatch('pageLoader', { show: false })
            if (response) {
                this.store.dispatch('alert', {
                    messages: response.message,
                    alertClass: 'success'
                })
                this.$router.push({ name: 'admin.books' })
            }
        }
    },
}
</script>