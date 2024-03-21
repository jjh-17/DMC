pipeline {

	agent any
	tools {
		nodejs 'NodeJS 21.7.1'
		gradle 'Gradle 8.6'
		docker 'DockerDefault'
	}

	environment {
		SSH_CONNECTION = 'ubuntu@j10a607.p.ssafy.io'
		SSH_CONNECTION_SUB = 'ubuntu@j10a607a.p.ssafy.io'

		BACK_NAME = 'DMC_BE'
		FRONT_NAME = 'DMC_FE'

		DOCKER_COMPOSE_BACK = 'spring'
		DOCKER_COMPOSE_FRONT = 'vue'

		MATTERMOST_ENDPOINT = 'https://meeting.ssafy.com/hooks/i7bxozcspt8suj4ntdabter4eh'
		MATTERMOST_CHANNEL = 'A607-Jenkins'
	}

	stages {





		stage('Git Clone') {
			steps {
				echo 'Git Clone Start'

				git branch : 'infra', credentialsId: 'GitLab', url: 'https://lab.ssafy.com/s10-bigdata-dist-sub2/S10P22A607.git'

				echo 'Git Clone End'
			}
		}





		stage('BE : Build') {
			steps {
				echo 'BE : Build Start'

					dir('./backend/') {
						sh '''
							chmod +x gradlew
							./gradlew clean build
						'''
					}

			echo 'BE : Build End'
			}
		}


		stage('BE : Docker Build') {
			steps {
				echo 'BE : Docker Build Start'

					dir('./backend/') {
						script {
							dockerImage = docker.build BACK_NAME
						}
					}

				echo 'BE : Docker Build End'
			}
		}


		stage('BE : Docker Push') {
			steps {
				echo 'BE : Docker Push Start'

					script {
						dockerImage.push('latest')
					}

				echo 'BE : Docker Push End'
			}
		}


		stage('BE : Remove Stopped Container') {
			steps {
				echo 'BE : Remove Stopped Start'

					script {
						def stoppedContainer =
							sh(
								script : 'ssh -t ${SSH_CONNECTION} \'docker ps -a --filter \"name = ${BACK_NAME}\" --filter \"status=exited\" --format \"{{.ID}}\"\'',
								returnStdOut : true
							).trim()

						if (stoppedContainer) {
							sh 'ssh -t ${SSH_CONNECTION} "docker rm ${stoppedContainer}"'
							echo 'Stopped ${BACK_NAME}:${stoppedContainer} Container removed'
						} else {
							echo 'No Stopped ${BACK_NAME} Container found'
						}
					}

				echo 'BE : Remove Stopped End'
			}
		}


		stage('BE : Deploy') {
			steps {
				sshagent (credentials : [' ']) {
					script {
						sh 'ssh -o StrickHostKeyChecking = no ${SSH_CONNECTION} uptime'

						script {
							def existingContainerId =
								sh(
									script : 'ssh -t ${SSH_CONNECTION} "docker ps -q -f name=${BACK_NAME}"',
									returnStdout : true
								).trim()
							if (existingContainerId) {
								sh 'ssh -t ${SSH_CONNECTION} "docker stop ${BACK_NAME}"'
								sh 'ssh -t ${SSH_CONNECTION} "docker remove ${BACK_NAME}"'
							} else {
								echo 'No Existing ${BACK_NAME} Container'
							}
						}

						script {
							def existingImageId =
								sh(
									script : 'ssh -t ${SSH_CONNECTION} "docker images -q -f name=${BACK_NAME}"',
									returnStdout : true
								).trim()
							if (existingImageId) {
								sh 'ssh -t ${SSH_CONNECTION} "docker rmi ${existingImageId}"'
							} else {
								echo 'No Existing ${BACK_NAME} Image'
							}
						}

						sh 'ssh -t ${SSH_CONNECTION} "docker-compose pull ${DOCKER_COMPOSE_BACK}"'
						sh 'ssh -t ${SSH_CONNECTION} "docker-compose up -d ${DOCKER_COMPOSE_BACK}"'
					}
				}
			}
		}





		stage('FE : Build') {
			steps {
				echo 'FE : Build Start'

				dir('./frontend/dangmoca-project') {
					sh 'npm install'
					sh 'npm run build'
				}

				echo 'FE : Build End'
			}
		}


		stage('FE : Docker Build') {
			steps {
				echo 'FE : Docker Build Start'

				dir('./forntend/dangmoca-project') {
					script {
						dockerImage = docker.build FRONT_NAME
					}
				}

				echo 'FE : Docker Build End'
			}
		}


		stage('FE : Docker Push') {
			steps {
				echo 'FE : Docker Push Start'

				dir('./frontend/dangmoca-project') {
					script {
						dockerImage.push('latest')
					}
				}

				echo 'FE : Docker Push End'
			}
		}


		stage('FE : Remove Stopped Container') {
			steps {
				echo 'FE : Remove Stopped Start'

				script {
					def stoppedContainer =
						sh(
							script: 'ssh -t ${SSH_CONNECTION} \'docker ps -a --filter \"name=${FRONT_NAME}\" --filter \"status=exited\" --format \'{{.ID}}\'\"',
							returnStdout: true
						).trim()

					if (stoppedContainer) {
						sh 'ssh -t ${SSH_CONNECTION} "docker rm ${stoppedContainer}"'
						echo 'Stopped ${BACK_NAME}:${stoppedContainer} Container removed'
					} else {
						echo 'No Stopped ${FRONT_NAME} Container found'
					}
				}

				echo 'FE : Remove Stopped End'
			}
		}


		stage('FE : Deploy') {
			steps {

				sshagent (credentials : [' ']) {
					script {
						sh 'ssh -o StrickHostKeyChecking = no ${SSH_CONNECTION} uptime'

						script {
							def existingContainerId =
								sh(
									script : 'ssh -t ${SSH_CONNECTION} "docker ps -q -f name=${FRONT_NAME}"',
									returnStdout : true
								).trim()
							if (existingContainerId) {
								sh 'ssh -t ${SSH_CONNECTION} "docker stop ${FRONT_NAME}"'
								sh 'ssh -t ${SSH_CONNECTION} "docker remove ${FRONT_NAME}"'
							} else {
								echo 'No Existing ${FRONT_NAME} Container'
							}
						}

						script {
							def existingImageId =
								sh(
									script : 'ssh -t ${SSH_CONNECTION} "docker images -q -f name=${FRONT_NAME}"',
									returnStdout : true
								).trim()
							if (existingImageId) {
								sh 'ssh -t ${SSH_CONNECTION} "docker rmi ${existingImageId}"'
							} else {
								echo 'No Existing ${FRONT_NAME} Image'
							}
						}

						sh 'ssh -t ${SSH_CONNECTION} "docker-compose pull ${DOCKER_COMPOSE_FRONT}"'
						sh 'ssh -t ${SSH_CONNECTION} "docker-compose up -d ${DOCKER_COMPOSE_FRONT}"'
					}
				}
			}

		}
	}




	post {
		success {
			script {
				def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
				def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
				mattermostSend (color: 'good', 
				message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
				endpoint: ${MATTERMOST_ENDPOINT}, 
				channel: ${MATTERMOST_CHANNEL}
				)
			}
		}
		failure {
			script {
				def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
				def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
				mattermostSend (color: 'danger', 
				message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
				endpoint: ${MATTERMOST_ENDPOINT}, 
				channel: ${MATTERMOST_CHANNEL}
				)
			}
		}
	}
}