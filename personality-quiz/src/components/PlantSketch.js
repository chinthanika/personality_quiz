export default function PlantSketch(p) {
  let vines = [];

  class Vine {
      constructor(startX, startFrame) {
          this.points = [{x: startX, y: p.height}];
          this.startFrame = startFrame;
          this.leaves = [];
          this.finished = false;
      }

      grow() {
        
          if (p.frameCount >= this.startFrame && !this.finished) {
              let lastPoint = this.points[this.points.length - 1];
              let stepX = p.random(-2, 2);
              let stepY = -p.random(2, 5);

              this.points.push({x: lastPoint.x + stepX, y: lastPoint.y + stepY});

              if (lastPoint.y + stepY <= 0) {
                  this.finished = true;
              }
          } else if (this.finished && p.frameCount % 60 === 0) {
            // Add a new leaf with initial opacity of 0 and a random angle
            let leafPos = this.points[p.int(p.random(this.points.length))];
            this.leaves.push({
                x: leafPos.x, 
                y: leafPos.y, 
                opacity: 0,
                angle: p.random(p.TWO_PI) // Initialize with a random angle
            });
        }

          // Increase opacity of each leaf gradually until fully opaque
          this.leaves.forEach(leaf => {
              if (leaf.opacity < 255) {
                  leaf.opacity += 5;
              }
          });
      }

      display() {
        p.noFill();
        p.stroke(85, 107, 47); // Dark green color for vine
        p.strokeWeight(2);
        p.beginShape();
        this.points.forEach(point => p.curveVertex(point.x, point.y));
        p.endShape();
    
        // Current time factor for the oscillation
        let time = p.millis() * 0.001; // Convert milliseconds to seconds
    
        // Draw leaves with their initial random angle adjusted by the wind simulation
        this.leaves.forEach(leaf => {
            // Simulate wind by oscillating the angle within a small range
            const windOscillation = 0.2; // Max angle deviation in radians
            const windSpeed = 2; // How fast the leaves sway back and forth
            // Calculate the oscillation
            let angleOscillation = Math.sin(time * windSpeed) * windOscillation;
    
            // Adjusted angle with wind oscillation
            const angle = leaf.angle + angleOscillation;
    
            // Set stroke color and fill color with opacity
            p.stroke(34, 139, 34, leaf.opacity);

            p.strokeWeight(1);
    
            // Define the leaf size
            const leafWidth = 10;
            const leafHeight = 20;
    
            // Use push and pop to isolate transformations for each leaf
            p.push();
            p.translate(leaf.x, leaf.y);
            p.rotate(angle); // Apply the leaf's orientation
    
            // Drawing the leaf
            // Central vein of the leaf
            p.line(0, 0, 0, leafHeight);
    
            // Left curved line of the leaf
            p.beginShape();
            p.vertex(0, 0);
            p.quadraticVertex(leafWidth / 2, leafHeight / 2, 0, leafHeight);
            p.endShape();
    
            // Right curved line of the leaf
            p.beginShape();
            p.vertex(0, 0);
            p.quadraticVertex(-leafWidth / 2, leafHeight / 2, 0, leafHeight);
            p.endShape();
    
            p.pop(); // Restore previous drawing style settings and transformations
        });
    }
  }

  p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      for (let i = 0; i < p.width; i += 20) {
          vines.push(new Vine(i, p.int(p.random(0, 300))));
      }
  };

  p.draw = () => {
      p.clear();
      vines.forEach(vine => {
          vine.grow();
          vine.display();
      });
  };

  p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      vines = [];
      for (let i = 0; i < p.width; i += 20) {
          vines.push(new Vine(i, p.int(p.random(0, 300))));
      }
  };
}