// 中文、英文、数字包括下划线
export const usernameRex = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
// 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
export const passwordRex = /^[a-zA-Z]\w{5,17}$/
//  必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
export const passwordstrongRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
//  手机号码
export const phoneRex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
//  身份证
export const idcardRex = /^\d{15}|\d{18}$/
// email
export const emailRex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 大写字母、下划线
export const valueRex = /^[A-Z_]+$/
// 小写字母、中划线
export const aliasRex = /^[a-z-]+$/
// 合法的链接URL
export const urlRex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/
// 非空
export const noNull = /^\s*$/g
// 中英文名字正则表达式-支持英文空格 中文少数名族
export const nameRex = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/
