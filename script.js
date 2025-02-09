            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            connectParticles();
            requestAnimationFrame(animate);
        }

        init();
        animate();
