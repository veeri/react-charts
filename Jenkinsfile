pipeline {
    agent any

    tools {
        git 'git'       // match the name set in Global Tool Configuration
        nodejs 'NodeJS 18'     // optional: if using NodeJS plugin
    }

    environment {
        REPO_URL = 'https://github.com/veeri/react-charts.git'
        BRANCH = 'main'
        GIT_CREDENTIALS_ID = 'github-pat'
        DEPLOY_DIR = '/var/www/react'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: env.REPO_URL, branch: env.BRANCH, credentialsId: env.GIT_CREDENTIALS_ID
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh "sudo mkdir -p ${DEPLOY_DIR}"
                sh "sudo rm -rf ${DEPLOY_DIR}/*"
                sh "sudo cp -r ${WORKSPACE}/build/* ${DEPLOY_DIR}/"
            }
        }
    }

    post {
        success {
            echo "✅ Build & deploy succeeded. App deployed to ${DEPLOY_DIR}"
        }
        failure {
            echo "❌ Build or deploy failed"
        }
    }
}
