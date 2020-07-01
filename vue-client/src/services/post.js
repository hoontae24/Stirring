import Service from './service';

const path = `/post`;

class PostService extends Service {
  constructor() {
    super(path);
  }
}

export default new PostService();
