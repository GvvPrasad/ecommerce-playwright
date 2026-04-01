pipeline {
    agent any

    tools {
        nodejs "NodeJS 24.11.1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/GvvPrasad/ecommerce-playwright.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**'
            }
        }
    }
}