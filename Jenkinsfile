pipeline {
    agent any
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/GvvPrasad/ecommerce-playwright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                powerShell '''
            npm install
            npx playwright install
        '''
            }
        }
        stage('Run Playwright Tests') {
            steps {
                powerShell '''
            npx playwright test
        '''
            }
        }
        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
