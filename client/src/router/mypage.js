import Mypage from '@/views/Mypage'
import Profile from '@/components/Profile'
import Board from '@/components/Board'
import Collections from '@/components/Collections'
import Likes from '@/components/Likes'

// import authGuard from '@/mixins/authGuard'

export default {
  path: '/:id',
  name: 'mypage',
  // beforeEnter: authGuard.checkBeforeEnter,
  redirect: '/:id/profile/',
  component: Mypage,
  props: true,
  children: [
    {
      path: 'profile/',
      name: 'profile',
      component: Profile
    },
    {
      path: 'posts',
      name: 'posts',
      component: Board
    },
    {
      path: 'collections',
      name: 'collections',
      component: Collections
    },
    {
      path: 'likes',
      name: 'likes',
      component: Likes
    },
    {
      path: 'followings',
      name: 'followings',
      component: Board
    },
    {
      path: '*',
      redirect: 'profile'
    }
  ]
}
