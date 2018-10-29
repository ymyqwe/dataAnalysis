pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Start') { 
            steps {
                // sh './jenkins/scripts/deliver.sh' 
                // input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                // sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}