<template>
    <div class="flex flex-center justify-center">
        <q-form @submit.prevent.stop="register" class="q-mt-md my-form">
            <q-card>
                    <q-card-section class="bg-red" v-if="errors.length > 0">
                        <div v-for="(error, index) in errors" :key="index">
                            <span>{{ error[index] }}</span>
                        </div>
                    </q-card-section>
                    <q-card-section lang="en-us" class="text-center col" style="z-index: 5;">
                        <div class="text-h4 q-my-md text-positive">Register</div>
                        <q-avatar icon="person" color="positive" class="text-white"></q-avatar>
                    </q-card-section>
                    <q-card-section>
                        <q-input outlined autofocus dense name="name" v-model="formData.name" hint="First and Last name" :rules="[val => val && val.length > 0 || 'Please enter a valid name']"
                        placeholder="First and Last name">
                            <template v-slot:prepend>
                                <q-icon name="person"></q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <q-input outlined dense type="email" name="email" v-model="formData.email" hint="Email"
                         :rules="[ val => val && val.length > 0 || 'Please enter a valid email address']"
                         placeholder="Email address">
                            <template v-slot:prepend>
                            <q-icon name="email"></q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <q-input outlined dense :type="isPassword ? 'password' : 'text'" v-model="formData.password" hint="Password" name="password"
                         :rules="[ val => val && val.length > 0 || 'Please enter a valid password']"
                         placeholder="Password">
                            <template v-slot:prepend>
                                <q-icon name="lock"></q-icon>
                            </template>
                            <template v-slot:append>
                                <q-icon :name="isPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPassword = !isPassword"></q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <q-input outlined dense :type="isPassword ? 'password' : 'text'" hint="Repeat Password" placeholder="Re-enter password" name="password_confirmation" v-model="formData.password_confirmation"
                         :rules="[
                            val => val && val.length > 0 || 'Please enter a valid password',
                            val => val === formData.password && val.length > 0 || 'The two passwords do not match'
                         ]">
                            <template v-slot:prepend>
                                <q-icon name="lock"></q-icon>
                            </template>
                            <template v-slot:append>
                                <q-icon :name="isPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPassword = !isPassword"></q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-section>
                        <q-toggle v-model="acceptTerms" label="I Accept terms and conditions" color="positive"/>
                    </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Login"
                    color="positive"
                    class="q-px-sm"
                    type="submit"
                    :disable="formData.name === '' || formData.email === '' || formData.password === '' || formData.repeatPassword === ''"
                    ></q-btn>
                </q-card-actions>
                    <!-- <q-img :img-style="{ transform: 'rotate(180deg)' }" src="/images/wave.svg" style="top: 0px;" class="absolute-top"/> -->
            </q-card>
        </q-form>
    </div>
</template>

<script>

import user from '../api/user'
import Csrf from '../api/Csrf'
import Api from '../api/api'

export default {
    data: () => ({
        formData: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        errors: [],
        isPassword: true,
        acceptTerms: false
    }),
    methods: {
        register(){
                user.register(this.formData)
                .then(() => {
                    this.$router.push({name: 'Login'})
                })
                    .catch(error => {
                        if(error.response.status === 422){
                            this.errors = error.response.data.errors
                        }
                    })
            // Api.get('/csrf-cookie').then(() => {
            //     user.register(this.formData)
            // })
        }
    }
}
</script>
<style lang="scss">
    .my-form{
        width: 400px;
        min-width: 150px;
    }
</style>

