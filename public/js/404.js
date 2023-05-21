// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Le Long An,Truong Hong Van,Bui Tuan Anh,Lao Vinh Khang,Pham Le Quynh Anh
// ID: s3963207,s3957034,s3970375,s3891925,s3927427
// Acknowledgement: MDN Web Docs, RMIT Canvas, ChatGPT, NPM Packages' Docs


let comingDate = new Date('Dec 31, 2023 00:00:00')

let d = document.getElementById('days')
let h = document.getElementById('hours')
let m = document.getElementById('minutes')
let s = document.getElementById('seconds')

let x = setInterval(function () {
    let now = new Date()
    let selisih = comingDate.getTime() - now.getTime()

    let days = Math.floor(selisih / (1000 * 60 * 60 * 24))
    let hours = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let minutes = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60))
    let seconds = Math.floor(selisih % (1000 * 60) / 1000)

    d.innerHTML = getTrueNumber(days)
    h.innerHTML = getTrueNumber(hours)
    m.innerHTML = getTrueNumber(minutes)
    s.innerHTML = getTrueNumber(seconds)

    if (selisih < 0) {
        clearInterval(x)
        d.innerHTML = '00'
        h.innerHTML = '00'
        m.innerHTML = '00'
        s.innerHTML = '00'
    }
}, 1000)

function getTrueNumber(x) {
    if (x < 10) return '0' + x
    else return x
}