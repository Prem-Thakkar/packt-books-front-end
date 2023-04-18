import BookList from '@/components/user/pages/UserBookListComponent.vue'
import BookView from '@/components/user/pages/UserBookViewComponent.vue'
import CommonMain from '@/components/user/layout/CommonMain.vue'

export default [
    {
        path: '/',
        component: CommonMain,
        children: [
            {
                path: '',
                name: 'books',
                component: BookList
            },
            {
                path: ':id/view',
                name: 'books.view',
                component: BookView
            }
        ]
    },
]