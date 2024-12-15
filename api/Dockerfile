# Build stage
FROM maven:3.9.9 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /build/target/*.jar /app/ServicePlatform.jar

# Expose the application port
EXPOSE 9090

# Environment variables with default values
ENV SPRING_PROFILES_ACTIVE=${PROFILE}
ENV APP_VERSION=${APP_VERSION}
ENV DB_URL=jdbc:postgresql://postgres_db:5432/springboot
ENV SPRING_DATASOURCE_URL=${DB_URL}
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=pgufc

# Enable remote debugging (optional)
#CMD java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
#    -jar ServicePlatform.jar

CMD ["java", "-jar", "ServicePlatform.jar"]
