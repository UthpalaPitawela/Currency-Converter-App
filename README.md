 # Currency Converter App

This project consists of the below functionalities

## Functional Requirements

- Login with authentication
- Search functionality to search countries
- Display a list of countries with details such as full name, population, currency types, and exchange rate to SEK
- An option to enter any amount in SEK
- The respective currencies in the list should be converted with respective to the enetered SEK amount
- Display country details including full name, population, currency types and exchange rates with respect to SEK facilitated by a search
- An option to add SEK amount and view corresponding currency converted amounts in the listed countries

## Non Functional Requirements
- Usability: Error handling
- Performance and Security: Rate limiting
- Logging

## How to Install

This project has a client  and a server where you need to run both as follows.

### Pre requisites
 
 - node v16.14.2
 - yarn
 
### Client

- Go to the client directory
- Type yarn to install dependencies
- Run yarn install to run the client

### Server

- Go to the server directory
- Type yarn to install dependencies
- Run yarn install to run the client

### Environment Variables

- Create a .env file similar to env.example in the server directory 
- Create a valid API key from https://fixer.io and add to the FIXER_API_KEY in the .env file
 
### Login credentials

Use the below credential to log into the system
- email: user@test.com
- password: test1234



## Technical Overview

The client application is made up from React and it's version is 18.1.0. React functional components are used for this application along with React hooks. The apollo client is used to manage graphql from the client side. Semantic UI is used as the UI library for the application. For the login, Semantic UI has been directly utilized. Essential application state data are persisted using local storage.

Server is made up using Node and Apollo-server to handle graphql queries from server end. Axios is used to handle API endpoints.

Used API libraries: 
 - https://restcountries.com  : To obtain country information
 - https://fixer.io :  To obtain exchange rate information

## How authentication handled

A user will be authenticated via JWT token

## How rate limiting handled

For the rate limit graphql-rate-limit-directive has been utilized. https://www.npmjs.com/package/graphql-rate-limit-directive?activeTab=readme

## Logging

Log4js library is used to handle logging https://www.npmjs.com/package/log4js
