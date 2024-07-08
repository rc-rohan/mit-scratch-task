export const SIDEBAR_STATICS = {
    MOTION_ACTION_CONTAINER: {
        title: 'Motion',
        CTA_LIST: [
            {
                id: 'translate',
                label: '50 steps forward',
                action: 50,
            },
            {
                id: 'translate',
                label: '50 steps backward',
                action: -50,
            },
            {
                id: 'translate',
                label: 'Orgin',
                action: 0,
            },
            {
                id: 'rotate',
                label: 'Rotate 50 deg',
                direction: 'x',
                action: 50,
            },
        ]
    },
    LOOKS_ACTION_CONTAINER: {
        title: 'Looks',
        CTA_LIST: [
            // {
            //     id: 'message',
            //     label: '50 steps forward',
            //     direction: 'x',
            //     action: 50,
            // },
            // {
            //     id: 'message',
            //     label: '50 steps backward',
            //     direction: 'x',
            //     action: 50,
            // },
            // {
            //     id: 'message',
            //     label: 'x steps',
            //     direction: 'x',
            //     action: 50,
            // },
        ]
    }
}