
const FormData = () => {
    let date = new Date()
    let [y, mon, d, h, min] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]
    if (mon < 10) mon = '0' + mon
    if (min < 10) min = '0' + min
    return `${d}.${mon}.${y} at ${h}:${min}`
}

module.exports = FormData