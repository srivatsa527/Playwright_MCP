pipeline {
    agent any  // You can specify a specific agent with Node.js installed

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from your repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Install Playwright browsers
                sh 'npx playwright install'
            }
        }

        stage('Run Tests in Chrome') {
            steps {
                // Run Playwright tests specifically for Chromium (Chrome)
                sh 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            // Publish Playwright HTML report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}