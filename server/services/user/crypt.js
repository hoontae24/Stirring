const crypto = require('crypto')
const config = require('../../config')
const key = config.secret

module.exports = {
  encrypt: data => {
    /* 알고리즘과 암호화 key 값으로 셋팅된 클래스를 뱉는다 */
    var cipher = crypto.createCipher('aes-256-cbc', key)

    /* 컨텐츠를 뱉고 */
    var encipheredContent = cipher.update(data, 'utf8', 'hex')

    /* 최종 아웃풋을 hex 형태로 뱉게 한다*/
    encipheredContent += cipher.final('hex')

    return encipheredContent
  },

  /*암호화나 복호화나 자세히 보면 비슷함*/
  decrypt: data => {
    var decipher = crypto.createDecipher('aes-256-cbc', key)

    var decipheredPlaintext = decipher.update(data, 'hex', 'utf8')

    decipheredPlaintext += decipher.final('utf8')

    return decipheredPlaintext
  }
}
