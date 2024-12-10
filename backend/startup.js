import { spawn } from 'child_process';

function runServer(filePath, port) {
    const serverProcess = spawn('node', [filePath]);
  
    serverProcess.stdout.on('data', (data) => {
      console.log(`Server on port ${port}: ${data}`);
    });
  
    serverProcess.stderr.on('data', (data) => {
      console.error(`Error on server at port ${port}: ${data}`);
    });

  }
  
  // Run each server
  runServer('./auth/login_route.js', 5175); 
  runServer('./posts/posts_route.js', 5176);  
  runServer('./comments/comments_route.js', 5177);  
