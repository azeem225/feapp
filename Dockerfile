#Frontend Image

# Use the official Tomcat image as the base image
FROM tomcat:9.0-jre8-alpine

# Remove the default Tomcat applications
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy your frontend files to the Tomcat webapps directory
COPY . /usr/local/tomcat/webapps/ROOT/

# Expose port 8080 for Tomcat
EXPOSE 8080
