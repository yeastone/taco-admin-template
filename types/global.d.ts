import type {
    // ComponentRenderProxy,
    VNode,
    VNodeChild,
    ComponentPublicInstance,
    FunctionalComponent,
    PropType as VuePropType,
} from 'vue'

declare global {
    // 定时器相关
    type TimeoutHandle = ReturnType<typeof setTimeout>
    type IntervalHandle = ReturnType<typeof setInterval>

    type ResponseData = Object | any[] | null

    interface httpResponseSuccess {
        errCode: number
        data: ResponseData
        msg: string
    }
}

declare module 'vue' {
    export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}
