pipeline {
    agent any

environment {
    AWS_REGION = 'eu-north-1'
    ECR_REPO = '455905339171.dkr.ecr.eu-north-1.amazonaws.com/my-react-app'
    IMAGE_TAG = "latest"
    DOCKER_IMAGE = "${ECR_REPO}:${IMAGE_TAG}"
    GIT_CREDENTIALS_ID = 'f01e9e83-c2e9-4584-b59a-b30b08dcaa47' 
    // GIT_CREDENTIALS_ID = credentials('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') // this pulls from Jenkins credentials securely
}

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: '${GIT_CREDENTIALS_ID}', url: 'https://github.com/veeri/react-charts.git' , branch: 'main'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'jenkins-ecr-user'
                ]]) {
                    sh '''
                        aws --version
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh-key-id']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@your-ec2-public-ip << EOF
                        docker pull $DOCKER_IMAGE
                        docker stop react-app || true
                        docker rm react-app || true
                        docker run -d --name react-app -p 80:80 $DOCKER_IMAGE
                        EOF
                    '''
                }
            }
        }
    }
}
