export type menuItemType = {
    name: string
    icon?: string
    key: string
    route?: string
    auth?: string
    subMenuList?: menuItemType[]
}
