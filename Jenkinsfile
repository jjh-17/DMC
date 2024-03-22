pipeline {

	agent any
	tools {
		nodejs "NodeJS 21.7.1"
		gradle "Gradle 8.6"
		dockerTool "DockerDefault"
	}

	environment {
		GIT_BRANCH = "infra"

		SSH_CONNECTION = "ubuntu@j10a607.p.ssafy.io"
		SSH_CONNECTION_SUB = "ubuntu@j10a607a.p.ssafy.io"

		BACK_NAME = "dmc_be"
		BACK_PORT = "8082"
		FRONT_NAME = "dmc_fe"
		FRONT_PORT = "5173"

		DOCKER_BACK_PORT = "8082"
		DOCKER_FRONT_PORT = "5173"

		MATTERMOST_ENDPOINT = "https://meeting.ssafy.com/hooks/i7bxozcspt8suj4ntdabter4eh"
		MATTERMOST_CHANNEL = "A607-Jenkins"
	}

	stages {





		stage("Git Clone") {
			steps {
				echo "Git Clone Start"

				git branch : "${GIT_BRANCH}", credentialsId: "GitLab", url: "https://lab.ssafy.com/s10-bigdata-dist-sub2/S10P22A607.git"

				echo "Git Clone End"
			}
		}





		stage("BE : Build") {
			steps {
				echo "BE : Build Start"

					dir("./backend/") {
						sh '''
							chmod +x gradlew
							./gradlew clean build
						'''
					}

			echo "BE : Build End"
			}
		}

		stage("BE : rm") {
			steps {
				echo "BE : rm Start"
				echo "Container"
				script {
					def running = sh(script: "docker ps -aqf name=${BACK_NAME}", returnStdout: true).trim()
					sh "echo ${running}"
					if(running != null && running != "") {
						sh '''
echo '1'
							docker stop ${BACK_NAME}
echo '2'
							echo 'stop'
echo '3'
							docker rm ${BACK_NAME}
echo '4'
							echo 'rm'
echo '5'
						'''
					}else {
						sh "echo 'no running'"
					}
				}

				echo "Image"
				script {
					def image = sh(script: "docker images -aqf reference=${BACK_NAME}", returnStdout: true).trim()
					sh "echo $image"

sh '''
echo "image"
echo "${image}"
'''


					if(image != null && image != "") {
						sh '''
echo "image"
echo "${image}"
							docker rmi image
							echo 'rmi'
						'''
					}else {
						sh "echo 'no image'"
					}
				}

				echo "BE : rm End"
			}
		}

		stage("BE : Docker") {
			steps {
				echo "BE : Docker Build Start"
				dir("./backend/") {
					script {
						sh "docker build -t ${BACK_NAME}:latest"
					}
				}
				echo "BE : Docker Build End"
			}
		}

		stage("BE : Container") {
			steps {
				sh "docker run --name ${BACK_NAME} -d -p ${BACK_PORT}:${DOCKER_BACK_PORT} ${BACK_NAME}"
			}
		}





/**
		stage("FE : Build") {
			steps {
				echo "FE : Build Start"

				dir("./frontend/dangmoca-project") {
					sh "npm install"
					sh "npm run build"
				}

				echo "FE : Build End"
			}
		}


		stage("FE : Docker Build") {
			steps {
				echo "FE : Docker Build Start"

				dir("./forntend/dangmoca-project") {
					script {
						dockerImage = docker.build FRONT_NAME
					}
				}

				echo "FE : Docker Build End"
			}
		}
**/
/*
		stage("FE : Docker Push") {
			steps {
				echo "FE : Docker Push Start"

				dir("./frontend/dangmoca-project") {
					script {
						dockerImage.push("latest")
					}
				}

				echo "FE : Docker Push End"
			}
		}
*/
/*
		stage("FE : Remove Stopped Container") {
			steps {
				echo "FE : Remove Stopped Start"

				script {
					def stoppedContainer =
						sh(
							script: "ssh -t ${SSH_CONNECTION} \"docker ps -a --filter \"name=${FRONT_NAME}\" --filter \"status=exited\" --format \"{{.ID}}\"\"",
							returnStdout: true
						).trim()

					if (stoppedContainer) {
						sh "ssh -t ${SSH_CONNECTION} \"docker rm ${stoppedContainer}\""
						echo "Stopped ${BACK_NAME}:${stoppedContainer} Container removed"
					} else {
						echo "No Stopped ${FRONT_NAME} Container found"
					}
				}

				echo "FE : Remove Stopped End"
			}
		}
*/
/**
		stage("FE : Update") {
			steps {
				echo "FE : Update Start"
				sshagent (credentials : [" "]) {
					script {
						sh "ssh -o StrickHostKeyChecking = no ${SSH_CONNECTION} uptime"

						script {
							def existingContainerId =
								sh(
									script : "ssh -t ${SSH_CONNECTION} \"docker ps -q -f name=${FRONT_NAME}\"",
									returnStdout : true
								).trim()
							if (existingContainerId) {
								sh '''
									docker stop ${FRONT_NAME}
									docker rm ${FRONT_NAME}
								'''
							} else {
								echo "No Existing ${FRONT_NAME} Container"
							}
						}

						script {
							def existingImageId =
								sh(
									script : "ssh -t ${SSH_CONNECTION} \"docker images -q -f name=${FRONT_NAME}\"",
									returnStdout : true
								).trim()
							if (existingImageId) {
								sh "docker rmi ${existingImageId}"
							} else {
								echo "No Existing ${FRONT_NAME} Image"
							}
						}

						// sh "docker-compose pull ${DOCKER_COMPOSE_FRONT}"
						// sh "docker-compose up -d ${DOCKER_COMPOSE_FRONT}"
						sh "docker run --name ${FRONT_NAME} -d -p ${DOCKER_FRONT_PORT}:{FRONT_PORT}  ${FRONT_NAME}"
					}
				}
				echo "FE : Update Start"
			}
		}
**/
	}





	post {
		success {
			script {
				def Author_ID = sh(script: '''git show -s --pretty=%an''', returnStdout: true).trim()
				def Author_Name = sh(script: '''git show -s --pretty=%ae''', returnStdout: true).trim()
				mattermostSend (
					color: "good",
					message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
					endpoint: "${MATTERMOST_ENDPOINT}",
					channel: "${MATTERMOST_CHANNEL}"
				)
			}
		}
		failure {
			script {
				def Author_ID = sh(script: '''git show -s --pretty=%an''', returnStdout: true).trim()
				def Author_Name = sh(script: '''git show -s --pretty=%ae''', returnStdout: true).trim()
				mattermostSend (
					color: "danger",
					message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
					endpoint: "${MATTERMOST_ENDPOINT}",
					channel: "${MATTERMOST_CHANNEL}"
				)
			}
		}
	}
}