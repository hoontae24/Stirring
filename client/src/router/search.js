import Search from '@/views/Search'
import Board from '@/components/Board'
import UserBoard from '@/components/UserBoard'
import CollectionBoard from '@/components/CollectionBoard'

export default {
  path: '/search',
  name: 'search',
  redirect: '/search/posts',
  component: Search,
  children: [
    {
      path: 'posts',
      name: 'search-posts',
      component: Board
    },
    {
      path: 'authors',
      name: 'search-authors',
      component: UserBoard
    },
    {
      path: 'collections',
      name: 'search-collections',
      component: CollectionBoard
    }
  ]
}
