import Api from './api'
// import Axios from 'axios'
// import Csrf from './Csrf'

export default({
    register(form){
        // await Csrf.getCookie();
        return Api().post('/register', form);
        // return Axios.post('/api/register', form).then(() => console.log("Hekkkk"))
    },

    login(form){
        // await Csrf.getCookie;

        return Api().post('/login', form);
    },

    logout(){
        // await Csrf.getCookie();
        return Api().post('/logout');
    },

    auth(){
        return Api().get('/user');
    }

    // login(form)
})
