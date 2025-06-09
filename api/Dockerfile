# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /build
COPY pom.xml .

COPY src ./src
RUN mvn clean package -DskipTests -Dmaven.compiler.release=17 --no-transfer-progress


# ----------step 2 -->  Runtime stage (with tiny Alpine Image)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar


# Expose the application port
EXPOSE 8090

# Environment variables with default values
ENV SPRING_PROFILES_ACTIVE=dev
ENV APP_VERSION=1.0.0
ENV DB_URL=jdbc:postgresql://postgres_db:5432/springboot
ENV SPRING_DATASOURCE_URL=${DB_URL}
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=pgufc

CMD ["java", "-jar", "app.jar"]