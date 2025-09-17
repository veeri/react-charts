pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"  // Name must match the NodeJS tool in Jenkins
    }

    environment {
        REACT_BUILD_DIR = "/var/www/react-app"  // Deployment directory
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies with peer deps..."
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    sudo rm -rf ${REACT_BUILD_DIR}/*
                    sudo cp -r build/* ${REACT_BUILD_DIR}/
                """
            }
        }
    }

    post {
        success {
            echo "React app built and deployed successfully!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
