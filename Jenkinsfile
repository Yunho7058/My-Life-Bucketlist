pipeline {
  agent any

  environment {
    GIT_URL = "https://github.com/Yunho7058/sincheonCoco.git"
    sh "echo 'workspace is ${env.WORKSPACE}'"
    sh "echo 'job_name is ${env.JOB_NAME}'"
    sh "echo 'job_base_name is ${env.JOB_BASE_NAME}'"
  }

  stages {
    stage('Pull') {
      steps {
        git(url: "${GIT_URL}", branch: "main", changelog: true, poll: true)
        // sh 'docker cp /home/ec2-user/ jenkins_jenkins_1:/var/jenkins_home/workspace/CocoProject-CICD/client'
      }
    }

    stage('Build') {
      steps {
        dir(path: 'server') {
          sh 'docker build --rm -t fastapi .'
        }

        dir(path: 'client') {
          sh 'docker build --rm -t nginx .'
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