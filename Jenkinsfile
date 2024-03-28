pipeline {

	agent any
	tools {
		jdk "zulu_jdk17.0.10"
		gradle "Gradle 8.6"
		nodejs "NodeJS 20.11.1"
		dockerTool "DockerDefault"
	}

	environment {
		GIT_BRANCH = "infra"

		DOCKER_ENV = "/docker/env"

		SSH_CONNECTION = "ubuntu@j10a607.p.ssafy.io"
		SSH_CONNECTION_SUB = "ubuntu@j10a607a.p.ssafy.io"

		BACK_NAME = "dmc_be"
		BACK_PORT = "8082"
		BACK_DIR = "./backend/"

		FRONT_NAME = "dmc_fe"
		FRONT_PORT = "80"
		FRONT_DIR = "./frontend/dangmoca-project"

		DOCKER_BACK_PORT = "8082"
		DOCKER_FRONT_PORT = "3000"

		MATTERMOST_ENDPOINT = "https://meeting.ssafy.com/hooks/i7bxozcspt8suj4ntdabter4eh"
		MATTERMOST_CHANNEL = "A607-Jenkins"
	}

	stages {




////// Git
		stage("Git Clone") {
			steps {
				echo "Git Clone Start"

				git branch : "${GIT_BRANCH}", credentialsId: "GitLab", url: "https://lab.ssafy.com/s10-bigdata-dist-sub2/S10P22A607.git"

				echo "Git Clone End"

				sh '''
					echo Print env
					cat /docker/env
				'''

			}
		}




////// BE
		stage("BE : Build") {
			steps {
				echo "BE : Build Start"

				dir("${BACK_DIR}") {
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

					if(running) {
						sh '''
							docker stop ${BACK_NAME}
							echo stop

							docker rm ${BACK_NAME}
							echo rm
						'''
					}else {
						sh "echo no running"
					}
				}

				echo "Image"
				script {
					def image = sh(script: "docker images -aqf reference=${BACK_NAME}", returnStdout: true).trim()
					sh "echo ${image}"

					if(image) {
						sh "docker rmi ${image}"
					}else {
						sh "echo no image"
					}
				}

				echo "BE : rm End"
			}
		}

		stage("BE : Docker") {
			steps {
				echo "BE : Docker Build Start"
				dir("${BACK_DIR}") {
					script {
						sh "docker build -t ${BACK_NAME}:latest ./"
					}
				}
				echo "BE : Docker Build End"
			}
		}

		stage("BE : Container") {
			steps {
				sh "docker run --env-file ${DOCKER_ENV} --name ${BACK_NAME} -d -p ${BACK_PORT}:${DOCKER_BACK_PORT} ${BACK_NAME} -e TZ=Asia/Seoul"
			}
		}




////// FE
		stage("FE : Install") {
			steps {
				echo "FE : Install Start"
				dir("${FRONT_DIR}") {
					sh "npm install react react-dom react-scripts"
				}
				echo "FE : Install End"
			}
		}

		stage("FE : rm") {
			steps {
				echo "FE : rm Start"

				echo "Container"
				script {
					def running = sh(script: "docker ps -aqf name=${FRONT_NAME}", returnStdout: true).trim()
					sh "echo ${running}"

					if(running) {
						sh '''
							docker stop ${FRONT_NAME}
							echo stop

							docker rm ${FRONT_NAME}
							echo rm
						'''
					}else {
						sh "echo no running"
					}
				}

				echo "Image"
				script {
					def image = sh(script: "docker images -aqf reference=${FRONT_NAME}", returnStdout: true).trim()
					sh "echo ${image}"

					if(image) {
						sh "docker rmi ${image}"
					}else {
						sh "echo no image"
					}
				}

				echo "FE : rm End"
			}
		}

		stage("FE : Docker") {
			steps {
				echo "FE : Docker Build Start"
				dir("${FRONT_DIR}") {
					script {
						sh "docker build -t ${FRONT_NAME}:latest ./"
					}
				}
				echo "FE : Docker Build End"
			}
		}

		stage("FE : Container") {
			steps {
				sh "docker run --env-file ${DOCKER_ENV} --name ${FRONT_NAME} -d -p ${FRONT_PORT}:${DOCKER_FRONT_PORT} ${FRONT_NAME}"
			}
		}





	}




////// Message
	post {
		success {
			script {
				def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
				def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
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
				def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
				def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
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