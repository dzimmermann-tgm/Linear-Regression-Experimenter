let k = 1
let d = 0

let current_f = document.querySelector("#current_f")
let abs_dev = document.querySelector("#abs_dev")
let lss = document.querySelector("#lss")
let biq = document.querySelector("#biq")


let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")
context.fillStyle = "black"

let k_slider = document.querySelector("#k")
let d_slider = document.querySelector("#d")

let HEIGHT = 500
let WIDTH = 1000

let x_step = WIDTH/10
let y_step = HEIGHT/10

let testpoints = [
    [5,3],
    [1,2],
    [3,5],
    [7,4],
    [6,8],
    [8,7],
    [5,5],
    [2,5],
    [7,3],
    [2,4]
]


k_slider.addEventListener("input", () => {
    k = parseFloat(k_slider.value)
    update()
})

d_slider.addEventListener("input", () => {
    d = parseFloat(d_slider.value)
    update()
})

function update() {
    update_heading()
    context.clearRect(0,0, WIDTH, HEIGHT)
    draw_axes_and_tickmarks()
    draw_points(testpoints)
    draw_function(k,d)
    let epsilons = calc_epsilons(k,d, testpoints);
    update_loss_fs(epsilons)

}


function update_heading() {
    current_f.innerHTML = "f(x) = " + k + " *x + " + d;
}

function draw_points(points) {
    context.fillStyle = "red"
    const radius = 4
    for(let x = 0; x < points.length; x++) {
        context.beginPath();
        context.arc(points[x][0]*x_step, HEIGHT-points[x][1]*y_step, radius, 0, 2 * Math.PI);
        context.fill(); 
    }
    context.fillStyle = "black"
}

function draw_axes_and_tickmarks() {
    //Axes
    const rh = 5
    context.fillRect(0, HEIGHT-rh, WIDTH, rh)
    context.fillRect(0, 0, rh, HEIGHT)

    //x and y Tickmarks 
    const tmb = 2
    const tmh = 10
    for(let x = 0; x < 10; x++) {
        context.fillRect(x*x_step-tmb/2, HEIGHT-tmh, tmb, tmh)
        if(x!=0) context.fillRect(0, x*y_step-tmb/2, tmh, tmb)

    }
}

function draw_function(k, d) {
    let start = [0, d]
    let end = [10, k*10+d]

    context.beginPath()
    context.lineWidth = 5
    context.moveTo(start[0], HEIGHT-start[1]*y_step)
    context.lineTo(end[0]*x_step, HEIGHT-end[1]*y_step)
    context.stroke()
}


function calc_epsilons(k,d, points) {
    let epsilons = []
    for(let x = 0; x < points.length; x++) {
        let f_val = k*points[x][0]+d
        //Berechen der Abweichung, Punkt-Y - Funktionswert
        epsilons.push(parseFloat(points[x][1] - f_val).toFixed(2))
    }
    return epsilons
}

function update_loss_fs(epsilons) {
    let sum = 0;
    let sum_lss = 0;
    let sum_biq = 0;
    for(let x = 0; x < epsilons.length; x++) {
        sum+= Math.abs(epsilons[x])
        
        sum_lss+= epsilons[x]*epsilons[x]

        sum_biq+= epsilons[x]*epsilons[x]*epsilons[x]*epsilons[x]
    }


    sum = parseFloat(sum).toFixed(2)
    sum_lss = parseFloat(sum_lss).toFixed(2)
    sum_biq = parseFloat(sum_biq).toFixed(2)
    abs_dev.innerHTML =   "Summe des Betrags der Abweichungen: " + sum
    lss.innerHTML =       "Summe der Quadrate der Abweichungen: " + sum_lss
    biq.innerHTML =       "Summe der Biquadrate: " + sum_biq

}

update()