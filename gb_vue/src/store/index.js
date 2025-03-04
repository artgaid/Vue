import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categories: [],
        edit: "",
        chartValue: "",
    },
    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = [...payload, ...state.paymentsList]
        },
        deletePayment(state, payload) {
            state.paymentsList.splice(payload.id - 1, 1)
            state.paymentsList.map(function (num) {
                if (num.id > payload.id) { num.id = num.id - 1 }
                return num.id
            })
        },
        editPayment(state, payload) {
            state.edit = payload
        },
        addDataToPaymentList(state, payload) {
            payload.id = this.state.paymentsList.length + 1
            state.paymentsList.push(payload)
        },
        setCategoriesListData(state, payload) {
            state.categories = payload
        },
        addCategoryToList(state, payload) {
            state.categories.push(payload)
        },
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategories: state => state.categories,
        getEdit: state => state.edit,
        getChart: state => {
            return [...new Set(state.paymentsList.map((c) => c.category))]
        },
        getValueToChart: state => {
            return [...new Set(state.paymentsList.map(c => {
                return state.paymentsList.reduce((res, cur) => {
                    if (cur.category === c.category) {
                        res += +cur.value
                    }
                    return res;
                }, 0)
            }))]
        },
    },
    actions: {
        editList({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const edit = this.state.edit
                    resolve(edit)
                }, 100)
            })
                .then(res => commit('editPayment', res))
        },
        fetchData({ commit }) {
            if (this.state.paymentsList.length) return
            return new Promise((resolve) => {
                // setTimeout(() => { 
                // *** убрал ассинхронность (имитацию запроса от сервера) ***
                const items = []
                for (let i = 0; i < 20; i++) {
                    items.push({
                        date: "11.08.2021",
                        category: "Sport",
                        value: i,
                        id: i + 1
                    })
                }
                resolve(items)
                // }, 2000)
            })
                .then(res => commit('setPaymentListData', res))
        },

        fetchCategoryList({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const categories = ['Sport', 'Food', 'IT', 'Internet', 'Other']
                    resolve(categories)
                }, 100)
            })
                .then(res => commit('setCategoriesListData', res))
        }
    },
})