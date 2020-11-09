# OpenBaltimore

## Technologies Used

- Java Spring Boot
- Hibernate 
- JPA Data
- Angular 10
- Angular Material

## Server:

1. Clone repository
2. [Install Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
3. [Install Maven](https://maven.apache.org/)
4. Run the following commands from the command line: 
```
mvn install from command line
Run java -jar target/<jar-file-name>
```
The jar file should be named something similar to 'open-baltimore-0.0.1-SNAPSHOT.jar' and should be the only jar file in the target folder
The server is hosted on http://localhost:8080'

## Web App:

1. Clone repository
2. [Download NodeJS](https://nodejs.org/en/)
3. Run npm the following command to install Angular 10 from the command line: 
```
install -g @angular/cli from command line
```
4. Open terminal (or another command line interface) and navigate to 'open-baltimore-app' directory
5. Run the following command to install required node_modules and start the web app locally:
```
npm install
ng serve
```
The web is hosted on 'http://localhost:4200'

## Data Model

### Restaurant

id: Long [PRIMARY KEY]   
name: String  
address: String  
zipCode: String
neighborhood: String
rating: Double
employeeSerialNumber: String  

### Review

id: Long [PRIMARY KEY]  
email: String  
rating: Integer
review: String  

## Routes

### /restaurant/all
Request Type: GET
Returns: List of Restaurant objects  

### /restaurant/save
Request Type: POST  
Body: A Restaurant object  
Returns: The newly created restaurant's id
This will save a new restaurant created  

### /restaurant/update
Request Type: POST
Parameters: A Restaurant object  
Returns: Nothing
This will update the restaurant passed

### /restaurant/delete
Request Type: POST 
Parameters: restaurant's id  
Returns: Nothing  

### /restaurant/export
Request Type: GET 
Returns: CSV of restaurants 

### /review/all/{email}
Request Type: GET  
Parameters: User's email address  
Returns: Nothing  
This will return all reviews for the user

### /review/save
Request Type: POST 
Body: Review object  
Returns: Nothing
