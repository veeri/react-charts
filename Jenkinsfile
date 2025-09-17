pipeline {
  agent any

  environment {
    // change these to match your repo & branch
    REPO_URL = 'https://github.com/veeri/react-charts.git'
    BRANCH = 'main'
    GIT_CREDENTIALS_ID = 'github-pat'   // the credential ID you added in Jenkins
    DEPLOY_DIR = '/var/www/react'
  }

  stages {
    stage('Checkout') {
      steps {
        // uses Jenkins built-in 'git' step with credentials
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
        // ensure deploy dir exists (owned by jenkins user)
        sh "mkdir -p ${DEPLOY_DIR}"
        // delete previous content safely, then copy build *contents*
        sh "rm -rf ${DEPLOY_DIR}/*"
        sh "cp -r ${WORKSPACE}/build/* ${DEPLOY_DIR}/"
      }
    }
  }

  post {
    success {
      echo "Build & deploy succeeded. App deployed to ${DEPLOY_DIR}"
    }
    failure {
      echo "Build or deploy failed"
    }
  }
}
