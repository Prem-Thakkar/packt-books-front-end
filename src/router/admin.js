import LoginComponent from '@/components/admin/auth/LoginComponent.vue'
import MainLayout from '@/components/admin/layouts/MainLayoutComponent.vue'
import BookIndex from '@/components/admin/books/ListBookComponent.vue'
import BookCreate from '@/components/admin/books/AddBookComponent.vue'
import BookEdit from '@/components/admin/books/EditBookComponent.vue'

export default [
  {
    path: '/admin/',
    redirect: 'admin/login',
    meta: {
      redirectIfLoggedIn: true,
      requiresAuth: false,
    }
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: LoginComponent,
    meta: {
      redirectIfLoggedIn: true,
      requiresAuth: false,
    },
  },
  {
    path: '/admin/books',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'admin.books',
        component: BookIndex
      },
      {
        path: 'create',
        name: 'admin.books.create',
        component: BookCreate
      },
      {
        path: ':id/edit',
        name: 'admin.books.edit',
        component: BookEdit
      }
    ]
  },
]