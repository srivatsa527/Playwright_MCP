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
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Install Playwright browsers
                bat 'npx playwright install'
            }
        }

        stage('Run Tests in Chrome') {
            steps {
                // Run Playwright tests specifically for Chromium (Chrome)
                bat 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            // Archive test results or reports if needed
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}