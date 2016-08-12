export default function (value) {
  this.codeunits = unescape(encodeURIComponent(value)).split('')
}
