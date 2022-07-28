import {createStore} from "vuex";

export default createStore({
    state: {
        list: [
            {
                name: "Обязательные для всех",
                threeDots: true,
                greyLabel: 'Документы, обязательные для всех сотрудников без исключения',
                id: 8888888888,
                children: [
                    {name: 'Паспорт', blueDot: true, id: 5},
                    {name: 'ИНН', id: 6}
                ]
            },
            {
                name: "Обязательные для трудоустройства",
                id: 1,
                greyLabel: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж',
                children: [
                    {name: 'Еще какая то бумага', id: 7},
                    {name: 'Карта метро', id: 8},
                ]
            },
            {name: "Специальные", id: 2, children: []},
            {
                name: "hidden_folder", hidden: true, id: 111, children: [
                    {
                        name: 'Тестовое задание кандидата',
                        id: 112,
                        greyLabel: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха'
                    },
                    {name: 'Трудовой договор', twoDots: true, id: 113},
                    {name: 'Мед. книжка', id: 112},
                ]
            },
        ]
    },
    getters: {
        getList: (state) => {
            return state.list
        }
    },
    mutations: {
        updateList(state, value) {
            state.list = value;
        },
        updateChildren(state, {value, parentId}) {
            const changingIndex = state.list.findIndex((item) => item.id === parentId);
            return state.list[changingIndex].children = value;
        }
    },
    actions: {},
    modules: {}
})
