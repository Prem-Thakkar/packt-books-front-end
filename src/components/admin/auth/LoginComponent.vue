<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">
                            <router-link :to="{ name: 'books' }" class="navbar-brand">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg> &nbsp;
                            </router-link>
                            Welcome back, Fill your credentials to Login
                        </h5>
                        <form @submit.prevent="onSubmit" @submit="login">
                            <div class="form-floating mb-3" :class="{ error: v$.form.email.$errors.length }">
                                <input type="email" class="form-control" placeholder="name@example.com"
                                    v-model="v$.form.email.$model">
                                <label for="floatingInput">Email</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                            <div class="form-floating mb-3" :class="{ error: v$.form.password.$errors.length }">
                                <input type="password" class="form-control" placeholder="Password"
                                    v-model="v$.form.password.$model">
                                <label for="floatingPassword">Password</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-dark btn-login text-uppercase fw-bold" type="submit"
                                    :disabled="v$.form.$invalid">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    validations() {
        return {
            form: {
                email: {
                    required: helpers.withMessage('Please enter an email', required),
                    email: helpers.withMessage('Please enter valid email address', email)
                },
                password: {
                    required: helpers.withMessage('Please enter password', required)
                },
            },
        }
    },
    methods: {
        async login() {
            this.store.dispatch('pageLoader', { show: true })
            const formValidation = await this.v$.$validate()
            if (!formValidation) return
            var response = await this.adminApi('POST', 'login', { email: this.form.email, password: this.form.password });
            this.store.dispatch('pageLoader', { show: false })
            if (response) {
                localStorage.setItem('admin_access_token', JSON.stringify(response.data))
                this.$router.push({ name: 'admin.books' })
            }
        }
    },

}
</script>