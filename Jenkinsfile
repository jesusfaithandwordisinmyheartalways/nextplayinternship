pipeline {
  agent any

  tools {
    nodejs "node18"  // Make sure you have this NodeJS version set in Jenkins
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/jesusfaithandwordisinmyheartalways/nextplayinternship.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        dir('client') {
          sh 'npm ci'  // Installs from package-lock
        }
        dir('server') {
          sh 'npm ci'
        }
      }
    }

    stage('Run Frontend Tests (Playwright + Jest)') {
      steps {
        dir('client') {
          sh 'npx playwright install'     // Ensures browsers are installed
          sh 'npm run test'               // Assumes this runs Jest/Playwright tests
        }
      }
    }

    stage('Run Backend Tests (Jest + Supertest)') {
      steps {
        dir('server') {
          sh 'npm run test'               // Assumes backend tests are wired to `npm test`
        }
      }
    }
  }
}