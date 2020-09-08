<template>
    <div class="flex flex-center justify-center">
        <q-form @submit.prevent="login" class="q-mt-lg my-form">
            <q-ajax-bar
            ref="bar"
            position="top"
            color="positive"
            size="5px"
            skip-hijack
            />
            <q-card>
                    <q-card-section lang="en-us" class="text-center col" style="z-index: 5;">
                        <div class="text-h4 q-my-md text-positive">Login</div>
                        <q-avatar icon="login" color="positive" class="text-white"></q-avatar>
                    </q-card-section>
                    <q-card-section>
                        <q-input outlined autofocus dense type="email" name="email" v-model="formData.email" hint="Email"
                         :rules="[ val => val && val.length > 0 || 'Please enter a valid email address']"
                         placeholder="Email address">
                            <template v-slot:prepend>
                            <q-icon name="email"></q-icon>
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-section>
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
                    <q-card-section>
                        <q-checkbox v-model="keepSignedIn" label="Keep me signed in" color="positive" style="z-index: 5;"/>
                    </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Login"
                    color="positive"
                    class="q-px-sm"
                    type="submit" @click="trigger"
                    :disable="formData.email === '' || formData.password === ''"
                    ></q-btn>
                </q-card-actions>
                    <!-- <q-img :img-style="{ transform: 'rotate(180deg)' }" src="/images/wave.svg" style="top: 0px;" class="absolute-top"/> -->
            </q-card>
        </q-form>
    </div>
</template>

<script>
import user from '../api/user'
export default {
    data: () => ({
        formData: {
            email: '',
            password: '',
            device_name: 'browser'
        },
        isPassword: true,
        keepSignedIn: false
    }),
    methods: {
        login(){
            user.login(this.formData)
                .then(response => {
                    this.$root.$emit('login', true);
                    // localStorage.setItem("auth", "true");
                    localStorage.setItem('token', response.data)
                    this.$router.push({name: 'Dashboard'})
                }).catch((error) => {
                    console.log(error);
                })
        },
        trigger () {
            const bar = this.$refs.bar

            bar.start()

            this.timer = setTimeout(() => {
                if (this.$refs.bar) {
                this.$refs.bar.stop()
                }
            }, 5000)
        }
    },
}
</script>
<style lang="scss">
    .my-form{
        width: 400px;
        min-width: 150px;
    }
</style>
