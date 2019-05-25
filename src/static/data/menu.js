import createMenu from '@/static/js/createMenu.js'

const nativeMenu = [
    {
        id: 1,
        parentId: 0,
        name: 'test',
        alias: '测试',
        icon: '',
        components: 'test'
    }, {
        id: 2,
        parentId: 0,
        name: 'demo',
        alias: '案例',
        icon: '',
    }, {
        id: 3,
        parentId: 2,
        name: 'demo1',
        alias: 'demo1',
        icon: '',
        components: 'demo/demo1'
    }, {
        id: 4,
        parentId: 2,
        name: 'demo2',
        alias: 'demo2',
        icon: '',
        components: 'demo/demo2'
    }
]

const menus = createMenu(nativeMenu)
export { nativeMenu, menus }