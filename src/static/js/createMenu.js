export default function createMenu(nativeMenu) {
  let menu = []

  nativeMenu.map( item => {
      let menuItem = {
          id: item.id,
          parentId: item.parentId || 0,
          name: item.name,
          alias: item.alias
      }
      if (!item.parentId) {
          menuItem.icon = item.icon
          if (!item.components) menuItem.children = []
          menu.push(menuItem)
      } else if (item.components) {
          menu.map(val => {
              if (val.id === item.parentId && val.children) {
                  menuItem.components = item.components
                  val.children.push(menuItem)
              }
          })
      }
  })

  return menu
}