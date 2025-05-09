# 🌤️️ Weather App (NestJS + OpenWeather + PostgreSQL)

## Description

This is a test task from Spendbase company. This NestJS service fetches weather data from OpenWeather's One Call
3.0 API, stores the response in PostgreSQL as JSONB, and provides two endpoints: one for fetching weather data and one
for retrieving cached data. The project
contains [Dockerfile](https://github.com/SharpDevOps10/spendbase-test-task/blob/main/Dockerfile)
with [wait-for-it.sh](https://github.com/SharpDevOps10/spendbase-test-task/blob/main/wait-for-it.sh) script for waiting
for PostgreSQL container.
What is more, there are
also [test-cases](https://github.com/SharpDevOps10/spendbase-test-task/blob/main/test/weather.service.spec.ts) for the
service

## Installation

* First and foremost, you need to make sure that you have installed [Node.js](https://nodejs.org/en)
* After that, you have to clone this repository and enter the working folder:

```bash
$ git clone https://github.com/SharpDevOps10/spendbase-test-task.git
$ cd spendbase-test-task
```

* Then you have to install the dependencies for this project:

```bash
$ npm install
```

## Running the app

* First of all, you need to create a `.env` file in the root directory of the project. You can use the `.env.example`
  file. Note: you need to set the `WEATHER_API_KEY` variable in the `.env` file. You can get it by signing up on the
  site.
* Then you need to create a PostgreSQL database. Add the credentials to the `.env` file.
* After that, you can run the application using the following command:

```bash
$ npm run start:dev
```

* Or you can run the whole project using Docker. Visit my `Dockerization` section of README file for more
  information.

## API Usage

The application has two endpoints:

* `POST /weather` that fetches weather data from OpenWeather and stores in DB.
    * URL: `http://localhost:3000/weather`
    * Request body for Kyiv:
    ```json
    {
        "lat": 50.450001,
        "lon": 30.523333,
        "part": "minutely,hourly"
    }
    ```
* `GET /weather?lat=50.450001&lon=30.523333&part=minutely,hourly` that returns cached data from DB.
    * URL: `http://localhost:3000/weather?lat=50.450001&lon=30.523333&part=minutely,hourly`
    * Response format (via interceptor):
    ```json
    {
       "sunrise": 1684926645,
       "sunset": 1684977332,
       "temp": 292.55,
       "feels_like": 292.87,
       "pressure": 1014,
       "humidity": 89,
       "uvi": 0.16,
       "wind_speed": 3.13
    }
    ```

## Dockerization

* If you want to build my image, you should write these commands:

```bash
$ docker build -t nest-weather-app .
```

* After that, you can run the image using the following command:

```bash
$ docker run -d --name weather-app -p 3000:3000 --env-file .env nest-weather-app
```

* You can also get the latest version of the image from Docker
  Hub [repository](https://hub.docker.com/repository/docker/rerorerio8/spendbase-test-task/general):

```bash
$ docker pull rerorerio8/spendbase-test-task
```

* Or you can run both PostgreSQL and NestJS containers
  using [docker-compose.yaml](https://github.com/SharpDevOps10/spendbase-test-task/blob/main/docker-compose.yaml):

```bash
$ docker compose up -d
```

Or

```bash 
$ docker-compose up -d
```

* Note: if you are running container using `docker-compose`, you have to pass `DB_HOST=postgres` to `.env` file
  because the name of the PostgreSQL container is `postgres` in `docker-compose.yaml` file

## Tests

The test-cases are located in the `test` folder. You can run them using the following command:

```bash
$ npm run test
```

The test-cases are written using Jest. They are written for the `WeatherService` class with mock technique

## Continuous Integration and Continuous Deployment

I have also added CI/CD pipelines using `GitHub Actions` (located in `.github` folder) for building + pushing the image
to
Dockerhub and running tests.
Here you can find my [All Workflows](https://github.com/SharpDevOps10/spendbase-test-task/actions)