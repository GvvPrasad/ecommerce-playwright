pipeline {
    agent any
    
    tools {
        nodejs "NodeJS"
    }
    
    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    environment {
        REPO_URL = 'https://github.com/GvvPrasad/ecommerce-playwright.git'
        BRANCH = 'main'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '=== Checking out code from GitHub ==='
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "${BRANCH}"]],
                    userRemoteConfigs: [[url: "${REPO_URL}"]]
                ])
                echo 'Code checkout successful'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '=== Installing Node.js dependencies ==='
                powershell '''
                    npm install
                    npx playwright install
                    echo "Dependencies installed successfully"
                '''
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                echo '=== Running Playwright Tests ==='
                powershell '''
                    npx playwright test
                '''
            }
        }
        
        stage('Publish Playwright Report') {
            steps {
                echo '=== Publishing Playwright HTML Report ==='
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
        
        stage('Generate Allure Report') {
            when {
                fileExists 'allure-results'
            }
            steps {
                echo '=== Generating Allure Report ==='
                script {
                    allure includeProperties: false,
                           jdk: '',
                           results: [[path: 'allure-results']]
                }
            }
        }
    }
    
    post {
        always {
            echo '=== Archiving test artifacts ==='
            archiveArtifacts artifacts: 'playwright-report/**,allure-results/**', 
                             fingerprint: true,
                             allowEmptyArchive: true
            junit testResults: 'junit-results.xml', 
                  allowEmptyResults: true,
                  skipPublishingChecks: true
        }
        
        success {
            echo '✓ Pipeline completed successfully'
        }
        
        failure {
            echo '✗ Pipeline failed - check logs above'
        }
        
        cleanup {
            echo '=== Cleaning up workspace ==='
            deleteDir()
        }
    }
}
