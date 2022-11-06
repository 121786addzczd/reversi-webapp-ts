const fs = require('fs');

/* logsディレクトリが存在しなければ作成する */
const logsDirectory = './logs'
if (!fs.existsSync(logsDirectory)){
  try {
    fs.mkdirSync(logsDirectory);
    console.log(`${logsDirectory}ディレクトリ作成しました`)
  } catch (err) {
    console.log(err)
  }
}

/* 今日の日付を取得しYYYYmmddフォーマットにする */
const today = new Date()
const year: string = `${today.getFullYear()}`               //年
const month: string = `0${today.getMonth() + 1}`.slice(-2)  //月
const day: string = `0${today.getDate()}`.slice(-2)         //日
const todaysDate: string = `${year}${month}${day}`

const hour: string = `0${today.getHours()}`.slice(-2)       //時
const minute: string = `0${today.getMinutes()}`.slice(-2)   //分
const second: string = `0${today.getSeconds()}`.slice(-2)   //秒
const todaysDateTime: string = `[${year}-${month}-${day} ${hour}:${minute}:${second}]`


/* ログファイル作成する */
function apendLog(text: string) {

  const pathInfo = __filename.split('/')
  //最後の要素（ファイル名）だけ欲しいので抜き出す
  const filename = pathInfo.pop();
  const logFile: string = `${todaysDate}_${filename}.log`

  let writeText: string = `${text}\n`
  writeText = `${todaysDateTime}${writeText}`
  try {
      fs.appendFileSync(`${logsDirectory}/${logFile}`, writeText, 'utf-8');
  } catch (err) {
      console.log(err)
  }

}


