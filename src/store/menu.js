import Store from './index.js'

Store.registerModule('menu', {
    namespaced: true,
    state: {
        activeItem: '',
        menus: [],
        nativeMenu: [],
        tabs: []
    },
    mutations: {
        // 初始化菜单项
        initMenu(state, menus) {
            state.menus = menus
        },
        // 初始化页签项
        initTabs(state, tabs) {
            state.tabs = tabs
        },
        // 初始化菜单数据
        initNativeMenu(state, nativeMenu) {
            state.nativeMenu = nativeMenu
        },
        // 添加页签
        addTab(state, tab) {
            // 如果已经存在则替换
            let areadyHas = state.tabs.filter( item => {
                return item.alias == tab.alias
            })
            // 如果不存在则添加
            if (areadyHas && areadyHas.length < 1) {
                state.tabs.push(tab)
            }
        },
        // 切换页签
        switchTab(state, nowIndex) {
            state.activeItem = nowIndex
        }
    },
    actions: {
        // 提交initMen方法
        getMenus({commit}, menuData) {
            commit('initMenu', menuData)
        },
        // 提交initNativeMenu方法
        getNativeMenu({commit}, nativeMenu) {
            commit('initNativeMenu', nativeMenu)
        },
        // 点击菜单项
        menuClick({commit}, name) {
            let menus = this.state.menu.nativeMenu
            let addTab = menus.filter( item => {
                return item.name == name
            })     
            commit('addTab',addTab[0])
            commit('switchTab', name)
        },
        // 关闭页签
        menuClose({commit}, name) {
            let tabs = this.state.menu.tabs
            let indexNum = tabs.findIndex( f => f.name == name)
            let newTabs = tabs.filter( item => {
                return item.name != name
            })  
            commit('initTabs', newTabs)
            let alias = newTabs[indexNum - 1] ? newTabs[indexNum - 1].name : (newTabs[indexNum+1] ? newTabs[indexNum].name : '')
            commit('switchTab', alias)
        }
    }
})