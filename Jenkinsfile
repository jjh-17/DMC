pipeline {

	agent any
	tools {
		jdk "zulu_jdk17.0.10"
		gradle "Gradle 8.6"
		nodejs "NodeJS 20.12.0"
		dockerTool "DockerDefault"
	}

	environment {
		// for info, not necessary
		HOST_VOLUME = "/jenkins/workspace/"
		JENKINS_VOLUME = "/var/jenkins_home/workspace/"
		SSH_CONNECTION = "ubuntu@j10a607.p.ssafy.io"
		SSH_CONNECTION_SUB = "ubuntu@j10a607a.p.ssafy.io"

		GIT_BRANCH = "infra"
		CREDENTIAL = "A607"

		ENV_DIR = "/var/jenkins_home/workspace/env/"
		BACK_ENV = "back.env"
		FRONT_ENV = "front.env"

		BACK_NAME = "dmc_be"
		BACK_PORT = "8082"
		BACK_DOCKER_PORT = "8082"
		BACK_DIR = "./backend/"

		FRONT_NAME = "dmc_fe"
		FRONT_PORT = "3000"
		FRONT_DOCKER_PORT = "3000"
		FRONT_DIR = "./frontend/dangmoca-project/"

		NGINX_DIR = "/nginx"
		NGINX_DOCKER_DIR = "/usr/share/nginx"

		MATTERMOST_ENDPOINT = "https://meeting.ssafy.com/hooks/i7bxozcspt8suj4ntdabter4eh"
		MATTERMOST_CHANNEL = "A607-Jenkins"
	}

	stages {




////// Git
		stage("Git Clone") {
			steps {
				echo "Git Clone Start"

				git branch : "${GIT_BRANCH}", credentialsId: "${CREDENTIAL}", url: "https://lab.ssafy.com/s10-bigdata-dist-sub2/S10P22A607.git"

				echo "Git Clone End"

				sh '''
					echo Print env
					echo Back
					cat ${ENV_DIR}${BACK_ENV}
					echo Front
					cat ${ENV_DIR}${FRONT_ENV}
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
				sh "docker run --name ${BACK_NAME} --env-file ${ENV_DIR}${BACK_ENV} --detach --publish ${BACK_PORT}:${BACK_DOCKER_PORT} ${BACK_NAME}"
			}
		}




////// FE

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

				echo "BE : rm End"
			}
		}

		stage("FE : Node") {
			steps {
				echo "FE : NodeJS Start"
				dir("${FRONT_DIR}") {
					script {
						sh '''
							npm install
							npm run build
						'''
					}
				}
				echo "FE : NodeJS End"
			}
		}

		stage("FE : Nginx") {
			steps {
				echo "FE : Nginx Start"
				dir("${FRONT_DIR}") {
					script {
						sh '''
							pwd
							ls -al /nginx
							ls -al ${FRONT_DIR}dist
							cp ./dist /nginx/html
							docker run --name ${FRONT_NAME} --env-file ${ENV_DIR}${FRONT_ENV} --detach --volume ${NGINX_DIR}:${NGINX_DOCKER_DIR} --publish ${FRONT_PORT}:${FRONT_DOCKER_PORT} --publish 80:80 --publish 443:443 nginx
						'''
					}
				}
				echo "FE : Nginx End"
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