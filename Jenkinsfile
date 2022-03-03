pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        git(url: 'https://github.com/Yunho7058/sincheonCoco', branch: 'dev', changelog: true, poll: true)
      }
    }

    stage('dockerizing') {
      steps {
        dir(path: 'server') {
          sh 'docker build --rm -t fastapi .'
        }

        dir(path: 'client') {
          sh 'docker build --rm -t nginx .'
        }

      }
    }

    stage('deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }

    stage('finish') {
      steps {
        sh 'docker image prune -f'
      }
    }
  }
}