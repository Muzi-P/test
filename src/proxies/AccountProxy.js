import Proxy from './Proxy';

class AccountProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super(`${process.env.VUE_APP_API_HOST}/userslist`, parameters);
  }

  list(pageid) {
    return this.submit('get', `${this.endpoint}/page/${pageid}`);
  }

  detail(userid){
    return this.submit('get', `${this.endpoint}/userid/${userid}`);
  }

  delete(id) {
    return this.submit('delete', `${this.endpoint}/userid/${id}/`);
  }

  create(params) {
    return this.submit('post', `${this.endpoint}/`, params);
  }

  update(params) {
    return this.submit('put', `${this.endpoint}/`, params);
  }
}

export default AccountProxy;
