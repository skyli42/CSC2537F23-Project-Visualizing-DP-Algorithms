function sgn(x) {
    return x < 0 ? -1 : 1;
}

// From wikipedia:
// Lap(X) = mu - b sgn(U) ln (1-2|U|) where U is a random variable between -0.5 and 0.5
function laplace(mu, b) {
    var U = Math.random() - 0.5;
    return mu - (b * sgn(U) * Math.log(1 - 2 * Math.abs(U)));
}

function privatize(F, deltaF, epsilon) {
    return F + laplace(0.0, deltaF / epsilon);
}
let count = 5;

// let adj_mean = Math.random()-0.5;
let adj_mean = 0;

// let data_points = Array.from({ length: count }, () => Math.random() * 2 - 1 + adj_mean);
let data_points = [0.7721301273318408, 0.9138631515491049, 0.10039595323493677, -0.060075713972223, 0.6628080041046305]


let noised = data_points.map(pt => privatize(pt, 1 / data_points.length, 1));

let mean_val = noised.reduce((cur, sum) => cur + sum) / count;

let unnoised_mean = data_points.reduce((cur, sum) => cur + sum) / count

let noisy_mean = privatize(unnoised_mean, 1 / count, 1)

let laplace_ex = Math.random() * 2 - 1;
let laplace_res = privatize(laplace_ex, 1, 1)


function vis_noisy_mean_v1(data_points, noised_data, mean_val, spacing, radius, range, offset, height) {
    let voffset = 20;   
    let width = 600;

    push()
    translate(150, 0)

    let output_line_centre = map(0.5, 0, 1, 20, width-20)-range;
    let output_x = map(mean_val, -2, 2, output_line_centre-range/2, output_line_centre+range/2);

    line(output_line_centre-range/2, height + voffset * 5, output_line_centre+range/2, height + voffset * 5);
    
    circle(output_x, height + voffset * 5, radius);
    text("Average of Data:", 0, height + voffset * 5 + 5)
    for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
        let display_x = map(label, -2, 2, output_line_centre-range/2, output_line_centre+range/2);
        line(display_x, height+voffset*5 + 2, display_x, height+voffset*5 - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, height+voffset*5 + 20);
        pop();
    }


    text("Original Data:", -125, height + 5)

    text("Noised Data:", -125, height + voffset * 2 + 5)

    for (let i = 0; i < data_points.length; i++) {
        let line_centre = map(i, 0, data_points.length, 20, width-20);
        let x_pos = map(data_points[i], -2, 2, line_centre-range/2, line_centre+range/2)

        // line(x_pos, height, unnoised_x_pos, height + voffset * 5);
        // line(unnoised_x_pos, height + voffset * 5, noised_x_pos, height + voffset * 8);

        line(line_centre-range/2, height, line_centre+range/2, height);

        circle(x_pos, height, radius);

        for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
            let display_x = map(label, -2, 2, line_centre-range/2, line_centre+range/2);
            line(display_x, height + 2, display_x, height - 2)
            push();
            textAlign(CENTER);
            text(`${label}`, display_x, height + 20);
            pop();
        }
    
        let noised_line_centre = map(i, 0, noised_data.length, 20, width-20);
        let noised_x_pos = map(noised_data[i], -2, 2, noised_line_centre-range/2, noised_line_centre+range/2)

        line(noised_line_centre-range/2, height+voffset*2, noised_line_centre+range/2, height+voffset*2);

        circle(noised_x_pos, height+voffset*2, radius);

        for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
            let display_x = map(label, -2, 2, noised_line_centre-range/2, noised_line_centre+range/2);
            line(display_x, height+voffset*2 + 2, display_x, height+voffset*2 - 2)
            push();
            textAlign(CENTER);
            text(`${label}`, display_x, height+voffset*2 + 20);
            pop();
        }

        line(x_pos, height, noised_x_pos, height+voffset*2)
        line(noised_x_pos, height+voffset*2, output_x, height+voffset*5)
    }


   
    // text("Average of Noised Data (output):", 100, height + voffset * 9 + 5)
    // line(spacing * count / 2 - range + offset, height + voffset * 9, spacing * count / 2 + offset, height + voffset * 9); +
    //     text("-2", spacing * count / 2 - range + offset, height + voffset * 9 + 15);
    // text("2", spacing * count / 2 - range + offset + range - 5, height + voffset * 9 + 15);

    // circle(spacing * count / 2 + mean_val * range / 4 + offset - range / 2, height + voffset * 9, radius);
    pop()
}

function vis_noisy_mean_v2(data_points, unnoised_mean, noisy_mean, spacing, radius, range, offset, height) {
    let voffset = 20;
    let width = 600;
    push()
    translate(150, 0)
    let unnoised_line_centre = map(0.5, 0, 1, 20, width-20)-range;
    let unnoised_x_pos = map(unnoised_mean, -2, 2, unnoised_line_centre-range/2, unnoised_line_centre+range/2);

    line(unnoised_line_centre-range/2, height + voffset * 5, unnoised_line_centre+range/2, height + voffset * 5);
    
    circle(unnoised_x_pos, height + voffset * 5, radius);
    text("Average of Data:", 0, height + voffset * 5 + 5)
    for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
        let display_x = map(label, -2, 2, unnoised_line_centre-range/2, unnoised_line_centre+range/2);
        line(display_x, height+voffset*5 + 2, display_x, height+voffset*5 - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, height+voffset*5 + 20);
        pop();
    }

    let noised_line_centre = map(0.5, 0, 1, 20, width-20)-range;
    let noised_x_pos = map(noisy_mean, -2, 2, noised_line_centre-range/2, noised_line_centre+range/2)
    line(noised_line_centre-range/2, height + voffset * 8, noised_line_centre+range/2, height + voffset * 8);
    circle(noised_x_pos, height + voffset * 8, radius);
    text("Noised Average (output):", 0, height + voffset * 8 + 5)
    for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
        let display_x = map(label, -2, 2, noised_line_centre-range/2, noised_line_centre+range/2);
        line(display_x, height+voffset*8 + 2, display_x, height+voffset*8 - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, height+voffset*8 + 20);
        pop();
    }

    for (let i = 0; i < data_points.length; i++) {
        let line_centre = map(i, 0, data_points.length, 20, width-20);
        let x_pos = map(data_points[i], -2, 2, line_centre-range/2, line_centre+range/2)

        line(x_pos, height, unnoised_x_pos, height + voffset * 5);
        line(unnoised_x_pos, height + voffset * 5, noised_x_pos, height + voffset * 8);

        line(line_centre-range/2, height, line_centre+range/2, height);

        circle(x_pos, height, radius);

        for (label of [...Array(2 - -2 + 1).keys()].map(i => i + -2)) {
            let display_x = map(label, -2, 2, line_centre-range/2, line_centre+range/2);
            line(display_x, height + 2, display_x, height - 2)
            push();
            textAlign(CENTER);
            text(`${label}`, display_x, height + 20);
            pop();
        }
    }
    text("Original Data:", -125, height + 5)    
    pop()
}

function vis_sLaplaceMech(data_point, res, spacing, radius, range, offset, height) {
    let voffset = 20;
    line(spacing * count / 2 + data_point * range / 4 + offset - range / 2, height, spacing * count / 2 + res * range / 4 + offset - range / 2, height + voffset * 3);

    text("Original Data:", 300, height + 5)
    line(spacing * count / 2 - range + offset, height, spacing * count / 2 + offset, height);
    text("-2", spacing * count / 2 - range + offset, height + 15);
    text("2", spacing * count / 2 - range + offset + range - 5, height + 15);
    circle(spacing * count / 2 + data_point * range / 4 + offset - range / 2, height, radius);

    text("Noised Data (output):", 300, height + voffset * 3 + 5)
    line(spacing * count / 2 - range + offset, height + voffset * 3, spacing * count / 2 + offset, height + voffset * 3);
    text("-2", spacing * count / 2 - range + offset, height + voffset * 3 + 15);
    text("2", spacing * count / 2 - range + offset + range - 5, height + voffset * 3 + 15);
    circle(spacing * count / 2 + res * range / 4 + offset - range / 2, height + voffset * 3, radius);


}
function histogram(values, binSize, min, max) {
    let out = [];
    for (let i = 0; i < (max - min) / binSize; i++) {
        out[i] = 0
    }
    for (value of values) {
        let bin = Math.min(Math.max(Math.floor((value - min) / binSize), 0), (max - min) / binSize);
        out[bin]++
    }
    console.log(values)
    console.log(out);
    return out;
}

function noisy_mean_v1(data_points) {
    let sensitivity = 2;
    let avg = data_points.map(pt => privatize(pt, sensitivity, 1)).reduce((cur, sum) => cur + sum) / data_points.length;
    return avg;
}
function noisy_mean_v2(data_points) {
    let avg = data_points.reduce((cur, sum) => cur + sum) / data_points.length;
    let sensitivity = 2;
    return privatize(avg, sensitivity / data_points.length, 1);
}

function reveal_one(data_points){
    return data_points[Math.floor(Math.random()*data_points.length)];
}

function lapMech(pt) {
    return privatize(pt, 1, 1);
}

function simulateDPAlg(alg, data_points, iterations) {
    let outputs = []
    for (let i = 0; i < iterations; i++) {
        outputs.push(alg(data_points));
    }
    return outputs;
}
function unnoised_mean_alg(data_points){
    return data_points.reduce((cur, sum) => cur + sum) / data_points.length
}

let noisy_mean_v1_hist = []
let noisy_mean_v2_hist = []
let reveal_one_hist = []
let hist_results_width = 400;
let hist_results_min = -3;
let hist_results_max = 3;
let bin_size = 0.2;
let bar_floor = 200;
let bar_data = Array.from({ length: 10 }, () => Math.random() * 2 - 1 + adj_mean);
let selected = Math.floor(Math.random()*data_points.length)
let unnoised_hist = []
function setup() {
    createCanvas(1600, 800);
    background(255);
    console.log(adj_mean)
    console.log(data_points);
    console.log(noised)
    console.log(mean_val)
    fill(0);
    noisy_mean_v1_hist = histogram(simulateDPAlg(noisy_mean_v1, bar_data, 10000), bin_size, hist_results_min, hist_results_max)
    noisy_mean_v2_hist = histogram(simulateDPAlg(noisy_mean_v2, bar_data, 10000), bin_size, hist_results_min, hist_results_max)
    reveal_one_hist = histogram(simulateDPAlg(reveal_one, bar_data, 100000), 0.01, -1, 1)
    unnoised_hist = histogram(simulateDPAlg(unnoised_mean_alg, bar_data, 1000), 0.5, -1, 1)
    console.log(unnoised_hist)
}

function draw_noisy_max_hists(bar_data, noisy_mean_v1_hist, noisy_mean_v2_hist, hist_results_min, hist_results_max, hist_results_width, bar_floor, bin_size){
    let input_display_height = 100;
    let padding = 300;
    push();
    translate(200, 100);

    text("Input data:", -75, input_display_height+5);
    line(0, input_display_height, hist_results_width - 20, input_display_height);
    for (pt of bar_data) {
        let display_x = map(pt, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        circle(display_x, input_display_height, 5);
    }
    for (label of [...Array(hist_results_max - hist_results_min + 1).keys()].map(i => i + hist_results_min)) {
        let display_x = map(label, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        line(display_x, input_display_height + 2, display_x, input_display_height - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, input_display_height + 20);
        pop();
    }
    push();
    translate(hist_results_width+padding, 0);
    text("Input data:", -75, input_display_height+5);
    line(0, 100, hist_results_width - 20, input_display_height);
    for (pt of bar_data) {
        let display_x = map(pt, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        circle(display_x, input_display_height, 5);
    }
    for (label of [...Array(hist_results_max - hist_results_min + 1).keys()].map(i => i + hist_results_min)) {
        let display_x = map(label, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        line(display_x, input_display_height+2, display_x, input_display_height-2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, input_display_height+20);
        pop();
    }
    pop();

    push();
    translate(0, bar_floor)

    let interval_size = 0.1;
    let max_val = (int(max(max(noisy_mean_v1_hist), max(noisy_mean_v2_hist))/interval_size)+1)*interval_size;
    for (x = 0; x < (hist_results_max - hist_results_min) / bin_size; x++) {
        index = noisy_mean_v1_hist[x];
        y1 = int(map(index, 0, max_val, bar_floor, bar_floor - 200));
        y2 = bar_floor
        xPos = map(x, 0, (hist_results_max - hist_results_min) / bin_size, 0, hist_results_width - 20)
        let bar_width = (hist_results_width-20)/((hist_results_max - hist_results_min) / bin_size)

        push();
        rectMode(CORNERS);
        fill(0, 255, 0);
        rect(xPos, y1, xPos + bar_width, y2);
        pop();
    }
    for (label of [...Array(hist_results_max - hist_results_min + 1).keys()].map(i => i + hist_results_min)) {
        let display_x = map(label, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        line(display_x, bar_floor + 2, display_x, bar_floor - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, bar_floor + 20);
        pop();
    }
    push()
    textAlign(CENTER);
    text("Output", hist_results_width/2-10, bar_floor+40)
    pop()
    push();
    translate(-50, bar_floor)
    rotate(-PI/2)
    text("Percentage of total simulations", 0, 0)
    pop();

    line(0, 0, 0, bar_floor);
    line(0, bar_floor, hist_results_width-20, bar_floor)

    for (label of [...Array(int(max(max(noisy_mean_v1_hist), max(noisy_mean_v2_hist))/interval_size)+2).keys()]) {
        let true_label = (label*interval_size).toFixed(1);
        let display_y = map(true_label, 0, max_val, bar_floor, bar_floor-200);
        line(-2, display_y, 2, display_y);
        push();
        textAlign(CENTER);
        text(`${true_label*100}\%`, -20, display_y+2);
        pop();
    }
    push();
    translate(hist_results_width+padding, 0);
    push();
    translate(-50, bar_floor)
    rotate(-PI/2)
    text("Percentage of total simulations", 0, 0)
    pop();
    push()
    textAlign(CENTER);
    text("Output", hist_results_width/2-10, bar_floor+40)
    pop()
    for (x = 0; x < (hist_results_max - hist_results_min) / bin_size; x++) {
        index = noisy_mean_v2_hist[x];
        y1 = int(map(index, 0, max_val, bar_floor, bar_floor - 200));
        y2 = bar_floor
        rectMode(CORNERS);
        xPos = map(x, 0, (hist_results_max - hist_results_min) / bin_size, 0, hist_results_width - 20)
        push()
        fill(0, 255, 0)
        let bar_width = (hist_results_width-20)/((hist_results_max - hist_results_min) / bin_size)
        
        rect(xPos, y1, xPos + bar_width, y2);
        pop()
    }
    for (label of [...Array(hist_results_max - hist_results_min + 1).keys()].map(i => i + hist_results_min)) {
        let display_x = map(label, hist_results_min, hist_results_max, 0, hist_results_width - 20);
        line(display_x, bar_floor + 2, display_x, bar_floor - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, bar_floor + 20);
        pop();
    }
    
    line(0, 0, 0, bar_floor);
    line(0, bar_floor, hist_results_width-20, bar_floor)
    for (label of [...Array(int(max(max(noisy_mean_v1_hist), max(noisy_mean_v2_hist))/interval_size)+2).keys()]) {
        let true_label = (label*interval_size).toFixed(1);
        let display_y = map(true_label, 0, max_val, bar_floor, bar_floor-200);
        line(-2, display_y, 2, display_y);
        push();
        textAlign(CENTER);
        text(`${true_label*100}\%`, -20, display_y+2);
        pop();
    }
    pop();
    pop();
    pop();
}

function draw_reveal_one_hist(bar_data, reveal_one_hist, hist_results_width, bar_floor, bin_size){
    let input_display_height = 100;
    let padding = 50;
    push();
    translate(100, padding);
    line(0, input_display_height, hist_results_width - 20, input_display_height);
    text("Input data:", -75, input_display_height+5);

    // original data points
    for (pt of bar_data) {
        let display_x = map(pt, -1, 1, 0, hist_results_width - 20);
        circle(display_x, input_display_height, 5);
    }

    // x axis labels
    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, 0, hist_results_width - 20);
        line(display_x, input_display_height + 2, display_x, input_display_height - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, input_display_height + 20);
        pop();
    }

    push();
    translate(0, bar_floor)
    
    let interval_size = 0.1;
    let max_val = (int(max(reveal_one_hist)/interval_size)+1)*interval_size;

    for (x = 0; x < (2) / bin_size; x++) {
        index = reveal_one_hist[x];
        y1 = int(map(index, 0, max_val, bar_floor, bar_floor - 200));
        y2 = bar_floor
        xPos = map(x, 0, 2 / bin_size, 0, hist_results_width - 20)
        push();
        rectMode(CORNERS);
        fill(0, 255, 255);
        rect(xPos, y1, xPos + 5, y2);
        pop();
    }
    // x axis labels
    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, 0, hist_results_width - 20);
        line(display_x, bar_floor + 2, display_x, bar_floor - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, bar_floor + 20);
        pop();
    }
    line(0, 0, 0, bar_floor);

    for (label of [...Array(int(max(reveal_one_hist)/interval_size)+2).keys()]) {
        let true_label = (label*interval_size).toFixed(1);
        let display_y = map(true_label, 0, max_val, bar_floor, bar_floor-200);
        line(-2, display_y, 2, display_y);
        push();
        textAlign(CENTER);
        text(`${true_label*100}\%`, -20, display_y+2);
        pop();
    }

    push();
    translate(-50, bar_floor)
    rotate(-PI/2)
    text("Percentage of total simulations", 0, 0)
    pop();
    push()
    textAlign(CENTER);
    text("Output", hist_results_width/2-10, bar_floor+40)
    pop()

    pop();
    pop();
}


function draw_method_reveal_one(data_points, selected, radius, height){
    let voffset = 20;
    let width = 500;
    push();
    fill(0);
    translate(150, 30)
    let output_line_centre = map(data_points.length/2, 0, data_points.length, 20, width-20)-40;
    let output_x = map(data_points[selected], -1, 1, output_line_centre-20, output_line_centre+20)
    line(output_line_centre-20, height+voffset*8, output_line_centre+20, height+voffset*8);

    circle(output_x, height + voffset * 8, radius);
    text("Output:", 100, height + voffset * 8 + 5);

    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, output_line_centre-20, output_line_centre+20);
        line(display_x, height+voffset*8 + 2, display_x, height+voffset*8 - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, height+voffset*8 + 20);
        pop();
    }

    for (let i = 0; i < data_points.length; i++) {
        
        let line_centre = map(i, 0, data_points.length, 20, width-20);
        let x_pos = map(data_points[i], -1, 1, line_centre-20, line_centre+20)
        line(line_centre-20, height, line_centre+20, height);
        circle(x_pos, height, radius);

        if(i === selected){
            line(x_pos, height, output_x, height+voffset*8)
        }
        for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
            let display_x = map(label, -1, 1, line_centre-20, line_centre+20);
            line(display_x, height + 2, display_x, height - 2)
            push();
            textAlign(CENTER);
            text(`${label}`, display_x, height + 20);
            pop();
        }
    
        
    }

    text("Original Data:", -100, height + 5)
    pop();
}

function draw_unnoised_mean_alg_hist(bar_data, unnoised_hist, hist_results_width, bar_floor, bin_size){
    console.log(unnoised_hist)
    let input_display_height = 100;
    let padding = 50;
    push();
    translate(100, padding);
    text("Input data:", -75, input_display_height+5);

    line(0, input_display_height, hist_results_width - 20, input_display_height);

    // original data points
    for (pt of bar_data) {
        let display_x = map(pt, -1, 1, 0, hist_results_width - 20);
        circle(display_x, input_display_height, 5);
    }

    // x axis labels
    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, 0, hist_results_width - 20);
        line(display_x, input_display_height + 2, display_x, input_display_height - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, input_display_height + 20);
        pop();
    }

    push();
    translate(0, bar_floor)

    let interval_size = 0.2;
    let max_val = (int(max(unnoised_hist)/interval_size))*interval_size;

    for (x = 0; x < (2) / bin_size; x++) {
        index = unnoised_hist[x];
        console.log(x)
        y1 = int(map(index, 0, max_val, bar_floor, bar_floor - 200));
        y2 = bar_floor
        xPos = map(x, 0, 2 / bin_size, 0, hist_results_width - 20)
        push();
        rectMode(CORNERS);
        fill(0, 0, 255);
        rect(xPos, y1, xPos + 5, y2);
        pop();
    }
    
    // x axis labels
    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, 0, hist_results_width - 20);
        line(display_x, bar_floor + 2, display_x, bar_floor - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, bar_floor + 20);
        pop();
    }
    line(0, 0, 0, bar_floor);
    line(0, bar_floor, hist_results_width-20, bar_floor)

    for (label of [...Array(int(max(unnoised_hist)/interval_size)+1).keys()]) {
        let true_label = (label*interval_size).toFixed(1);
        let display_y = map(true_label, 0, max_val, bar_floor, bar_floor-200);
        line(-2, display_y, 2, display_y);
        push();
        textAlign(CENTER);
        text(`${true_label*100}\%`, -20, display_y+2);
        pop();
    }
    push();
    translate(-50, bar_floor)
    rotate(-PI/2)
    text("Percentage of total simulations", 0, 0)
    pop();
    push()
    textAlign(CENTER);
    text("Output", hist_results_width/2-10, bar_floor+40)
    pop()
    pop();
    pop();
}

function draw_method_unnoised_mean(data_points, radius, height){
    let voffset = 20;
    let width = 500;
    push();
    fill(0);
    translate(150, 30)
    let output_line_centre = map(data_points.length/2, 0, data_points.length, 20, width-20)-40;
    let output_x = map(unnoised_mean_alg(data_points), -1, 1, output_line_centre-20, output_line_centre+20)
    line(output_line_centre-20, height+voffset*8, output_line_centre+20, height+voffset*8);

    circle(output_x, height + voffset * 8, radius);
    text("Output:", 100, height + voffset * 8 + 5);

    for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
        let display_x = map(label, -1, 1, output_line_centre-20, output_line_centre+20);
        line(display_x, height+voffset*8 + 2, display_x, height+voffset*8 - 2)
        push();
        textAlign(CENTER);
        text(`${label}`, display_x, height+voffset*8 + 20);
        pop();
    }

    for (let i = 0; i < data_points.length; i++) {
        
        let line_centre = map(i, 0, data_points.length, 20, width-20);
        let x_pos = map(data_points[i], -1, 1, line_centre-20, line_centre+20)
        line(line_centre-20, height, line_centre+20, height);
        circle(x_pos, height, radius);

        line(x_pos, height, output_x, height+voffset*8)
        
        for (label of [...Array(1 - -1 + 1).keys()].map(i => i + -1)) {
            let display_x = map(label, -1, 1, line_centre-20, line_centre+20);
            line(display_x, height + 2, display_x, height - 2)
            push();
            textAlign(CENTER);
            text(`${label}`, display_x, height + 20);
            pop();
        }
    
        
    }

    text("Original Data:", -100, height + 5)
    pop();
}

function draw() {
    let spacing = 160;
    let radius = 4;
    let range = 80;
    let offset = 200;
    background(255)

    if (frameCount % 30 == 0) {
        // data_points = Array.from({ length: 10 }, () => Math.random() * 2 - 1);

        noised = data_points.map(pt => privatize(pt, 1, 1));

        mean_val = noised.reduce((cur, sum) => cur + sum) / 10;

        noisy_mean = privatize(unnoised_mean, 1 / 5, 1)
        laplace_res = privatize(laplace_ex, 1, 1)
        selected = Math.floor(Math.random()*data_points.length);
    }

    // vis_noisy_mean_v1(data_points, noised, mean_val, spacing, radius, range, offset, 30);

    // push();
    // translate(0, 30);
    // vis_noisy_mean_v2(data_points, unnoised_mean, noisy_mean, spacing, radius, range, offset, 0);

    // pop()
    // vis_sLaplaceMech(laplace_ex, laplace_res, spacing, radius, range, offset, 500);

    

    // draw_noisy_max_hists(bar_data, noisy_mean_v1_hist.map(x=>x/10000), noisy_mean_v2_hist.map(x=>x/10000), hist_results_min, hist_results_max, hist_results_width, bar_floor, bin_size)
    // draw_reveal_one_hist(bar_data, reveal_one_hist.map(x=>x/100000), hist_results_width, bar_floor, 0.01);

    // draw_method_reveal_one(data_points, selected, radius, 100)
    // draw_unnoised_mean_alg_hist(bar_data, unnoised_hist.map(x=>x/1000), hist_results_width, bar_floor, 0.5);

    draw_method_unnoised_mean(data_points, radius, 100)
 }
