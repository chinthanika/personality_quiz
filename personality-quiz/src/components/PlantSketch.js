export default function ButterflySketch(p) {
    let butterflies = [];
  
    class Butterfly {
      constructor() {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.wingSpan = p.random(40, 80);
        this.angle = p.random(p.TWO_PI); // Initial random angle for each butterfly
        this.flutterRate = 300; // Frames between each flutter
        this.lastFlutterFrame = 0; // Track the last frame number when the butterfly fluttered
      }
  
      move() {
        this.x += p.random(-1, 1); // Horizontal movement
        this.y += p.random(-1, 1); // Vertical movement
        // Check if it's time to flutter the wings
        if (p.frameCount - this.lastFlutterFrame > this.flutterRate) {
          this.angle += p.PI / 4; // Change the angle for the next flutter
          this.lastFlutterFrame = p.frameCount; // Update the last flutter frame
        }
      }
  
      display() {
        p.stroke(0);
        p.noFill();
  
        // Drawing the left wing similar to the leaf
        this.drawWing(-1); // Negative direction for left wing
        // Drawing the right wing similar to the leaf
        this.drawWing(1); // Positive direction for right wing
      }
  
      drawWing(direction) {
        const wingWidth = this.wingSpan / 2;
        const wingHeight = this.wingSpan;
        const angleOffset = p.PI / 8; // Adjust this to change the curve shape of the wings
  
        let startPointX = this.x;
        let startPointY = this.y;
  
        let controlPointX = startPointX + (direction * wingWidth * p.cos(this.angle + angleOffset));
        let controlPointY = startPointY + (wingWidth * p.sin(this.angle + angleOffset));
  
        let endPointX = startPointX + (direction * wingWidth * p.cos(this.angle - angleOffset));
        let endPointY = startPointY + (wingWidth * p.sin(this.angle - angleOffset));
  
        // Draw the top part of the wing
        p.beginShape();
        p.vertex(startPointX, startPointY);
        p.quadraticVertex(controlPointX, controlPointY, endPointX, endPointY);
        p.endShape();
  
        // Adjust control points for the bottom part of the wing for a more leaf-like appearance
        controlPointX = startPointX + (direction * wingWidth * 0.5 * p.cos(this.angle - angleOffset * 2));
        controlPointY = startPointY + (wingWidth * 0.5 * p.sin(this.angle - angleOffset * 2));
  
        // Draw the bottom part of the wing
        p.beginShape();
        p.vertex(startPointX, startPointY);
        p.quadraticVertex(controlPointX, controlPointY, endPointX, endPointY);
        p.endShape();
      }
  
      update() {
        this.move();
        this.display();
      }
    }
  
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      for (let i = 0; i < 10; i++) {
        butterflies.push(new Butterfly());
      }
    };
  
    p.draw = () => {
      p.background(255);
      butterflies.forEach((butterfly) => {
        butterfly.update();
      });
    };
  }