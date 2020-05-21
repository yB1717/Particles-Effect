const particles = []

function setup(){
    createCanvas(window.innerWidth , window.innerHeight)
    const particlesLength = window.innerWidth / 9

    for(let i = 0 ; i < particlesLength ; i++){
        particles.push(new Particle())
    }
}

function draw(){
    background(55 , 100 , 144)
    particles.forEach((p , index) => {
        p.update()
        p.draw()
        p.connectParticles(particles.slice(index))
    })

}

class Particle{
    constructor(){
        //POSITION
        this.pos = createVector(random(width), random(height))
        //VELOCITY
        this.vel = createVector(random(-1 , 1) , random(-1 , -1))
        //SIZE
        this.size = 10
    }
    //UPDATE MOVEMENT BY ADDING VELOCITY
    update(){
        this.pos.add(this.vel)
        this.bounceOff()
    }
    //DRAW A SINGLE PARTICLE
    draw(){
        noStroke()
        fill('#35bfcc')
        circle(this.pos.x , this.pos.y , this.size)
    }
    //PARTICLE BOUNCE OFF THE EDGES
    bounceOff(){
        if(this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1
        }
        if(this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1
        }
    }

    //CONNECT PARTICLES
    connectParticles(particles){
        particles.forEach(particle => {
            let d = dist(this.pos.x , this.pos.y , particle.pos.x , particle.pos.y)

            if(d < 120){
                stroke('rgba(255,255,255,0.5)')
                line(this.pos.x , this.pos.y , particle.pos.x , particle.pos.y)
            }
        })
    }
}
