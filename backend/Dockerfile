FROM openjdk:17
CMD pwd
ARG DEFALUT_JAR
ENV JAR_FILE=${DEFALUT_JAR:-build/libs/*.jar}
COPY ${JAR_FILE} app.jar
ENTRYPOINT java -jar app.jar