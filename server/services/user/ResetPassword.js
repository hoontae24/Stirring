const nodemailer = require('nodemailer')
const crypt = require('./crypt')
const Token = require('../../models/token')

const serviceAddress = 'http://localhost:8080/new-password'
const Email = 'kadr8941@gmail.com'
const Pass = 'Datablock92!'

const createToken = (email, name) => {
  return new Promise((resolve, reject) => {
    const expireTime = new Date().setMinutes(new Date().getMinutes() + 5)
    const data = { email, expireTime }
    const token = crypt.encrypt(JSON.stringify(data))
    resolve({ email, name, token })
  })
}

const setToken = ({ email, name, token }) => {
  return Token.setTokenOnEmail(email, token).then(result => {
    if (!result) throw new Error('Error on Set token on DB')
    return Promise.resolve({ email, name, token })
  })
}

const sendLink = payload => {
  const { email, name, token } = payload
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: Email, pass: Pass }
    })

    const mailOption = {
      from: 'Manager@stirring.com',
      to: email,
      subject: '<STIRRING> Do you request to reset password?',
      html: `
    Hello, ${name} <br>
    <a href="${serviceAddress}?token=${token}">새 비밀번호 등록하기</a><br>
    비밀번호 변경을 원하시면 5분 이내에 위의 링크로 접속하세요. <br>
    비밀번호 변경을 원하지 않으시면 이메일을 무시하세요. <br>
    감사합니다. <br>
    <br>
    본 메일은 서비스를 테스트하기 위한 용도의 메일입니다.<br>
    발신자는 유효하지 않은 메일주소입니다.
    `
    }

    transporter.sendMail(mailOption, function(err, info) {
      if (err) {
        console.error('Send Mail error : ', err)
        reject(err)
      } else {
        // console.log('Message sent : ', info)
        resolve({ email, info })
      }
    })
  })
}

module.exports = {
  request: (email, name) =>
    createToken(email, name)
      .then(setToken)
      .then(sendLink),

  checkAndSubmit: ({ newPassword, token }) => {
    const { email, expireTime } = JSON.parse(crypt.decrypt(token))
    if (expireTime < Date.now())
      return Promise.reject(new Error('비밀번호 요청 시간이 만료되었습니다.'))
    return Token.getTokenOnEmail(email)
      .then(data => {
        if (!data || token !== data.token)
          return Promise.reject(new Error('이미 처리되었거나 유효하지 않은 요청입니다.'))
        return Promise.resolve(email)
      })
      .then(email => {
        return Token.completeOnEmail(email)
      })
      .then(() => {
        return Promise.resolve({email, newPassword})
      })
  }
}
