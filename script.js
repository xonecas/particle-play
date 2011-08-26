/* browser:true, onevar:true, eqeqeq:true, curly:true, maxlen:80 */

(function (win, doc) {
   var body    = doc.querySelector('body'),
      canvas   = doc.createElement('canvas'),
      c        = canvas.getContext('2d'),
      xmiddle  = Math.floor(win.innerWidth /2),
      ymiddle  = Math.floor(win.innerHeight /2),
      radians  = Math.PI /180;

   function Particle (x, y) {
      this.x      = x;
      this.y      = y;
      this.xVel   = randomRange(0, 1);
      this.yVel   = randomRange(0, 1);
      this.size   = 20;
      this.color  = Math.floor(randomRange(0, 360));
      this.alpha  = 1;
      this.angle  = Math.floor(randomRange(0, 360));
   }

   Particle.prototype = {
      update: function () {
         this.alpha -= 0.02;
         this.size -= 0.3;
         this.color = this.color > 300 ? 0 : this.color +1;

         this.xVel *= 1.2; 
         this.yVel *= 1.2; 

         this.x += this.xVel;
         this.y += this.yVel;

         if (this.x > canvas.width -10 || this.y > canvas.height -10 || 
            this.size <= 0 || this.angle > 360) {

            /* I'm pretty sure this is not the right way to do this, but
               it's working... Correct me please */
            Particle.call(this, Math.floor(randomRange(0, win.innerWidth)),
               Math.floor(randomRange(0, win.innerHeight)));

         }
      },

      render: function () {
         c.save();
         c.translate(xmiddle, ymiddle);
         c.rotate(this.angle * radians);
         c.fillStyle = "hsla("+ this.color +", 100%, 50%, "+ this.alpha +")";
         c.beginPath();
         c.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
         c.fill();
         c.restore();
      }
   };

   function randomRange(min,max){
      return Math.random()*(max-min) + min;
   }

   function init() {
      var particles  = [],
         max         = 20,
         randomx     = Math.floor(randomRange(0, canvas.width)),
         randomy     = Math.floor(randomRange(0, canvas.height));

      body.appendChild(canvas);
      canvas.width = win.innerWidth;
      canvas.height = win.innerHeight;

      while(max-- > 0) {
         particles.push(new Particle(Math.floor(randomRange(0, canvas.width)),
            Math.floor(randomRange(0, canvas.height))));
      }
      
      setInterval(function () {
         var count   = 0,
            len      = particles.length,
            particle;

         c.save();
         c.fillStyle = "hsla(0, 0%, 0%, 0.02)";
         c.fillRect(0, 0, canvas.width, canvas.height);
         c.restore();

         for (count; count < len; count++) {
            particle = particles[count];

            particle.update();
            particle.render();
         }
      }, 1000/30);
   }

   init();

}) (window, document);
