# Three.js Docker Project

This repository contains a **Three.js project** served via Docker. It includes a `threejs.html` file demonstrating a basic 3D scene, and a **GitHub Actions workflow** that automatically builds and pushes a Docker image to Docker Hub whenever changes are pushed to the main branch.

---

## Usage

### Run Locally with Docker

1. Build the image manually (optional if using GitHub Actions):

```bash
docker build -t topguntaube/threejs:latest

2. Run the container: 
docker run -p 8080:80 topguntaube/threejs:latest .

3. Open your browser at http://localhost:8080 to see the Three.js scene.
