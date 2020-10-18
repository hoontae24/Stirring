import Service from './service';

const path = '/action';

class ActionService extends Service {
  constructor() {
    super(path);
  }
}

const actionService = new ActionService();

export default actionService;
