import Service from './service';

const path = `/resource`;

class ResourceService extends Service {
  constructor() {
    super(path);
  }
}

export default new ResourceService();
