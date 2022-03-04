pipeline {
  agent any

  environment {
    GIT_URL = "https://github.com/Yunho7058/sincheonCoco.git"
  }

  stages {
    stage('Pull') {
      steps {
        git(url: "${GIT_URL}", branch: "main", changelog: true, poll: true)
        sh "docker cp /react_env/.env jenkins_jenkins_1:${env.WORKSPACE}/client"
        sh "docker cp /fastapi_env/.env jenkins_jenkins_1:${env.WORKSPACE}/server/app"
      }
    }

    stage('Build') {
      steps {
        dir(path: 'server') {
          sh 'docker build --rm -t coco-fastapi:0.0.1 .'
        }

        dir(path: 'client') {
          sh 'docker build --rm -t coco-nginx:0.0.1 .'
        }

      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }

    stage('Finish') {
      steps {
        sh 'docker image prune -f'
      }
    }
  }
}