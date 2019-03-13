import Mypage from '@/views/Mypage'
import Board from '@/components/Board'
import CollectionBoard from '@/components/CollectionBoard'
import UserBoard from '@/components/UserBoard'
import Likes from '@/components/Likes'


export default {
  path: '/:id',
  name: 'mypage',
  redirect: '/:id/posts/',
  component: Mypage,
  props: true,
  children: [
    {
      path: 'posts',
      name: 'posts',
      component: Board
    },
    {
      path: 'collections',
      name: 'collections',
      component: CollectionBoard
    },
    {
      path: 'likes',
      name: 'likes',
      component: Likes
    },
    {
      path: 'followings',
      name: 'followings',
      component: UserBoard
    },
    {
      path: '*',
      redirect: 'posts'
    }
  ]
}
