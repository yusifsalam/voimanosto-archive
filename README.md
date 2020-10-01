# Voimanosto

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/logo.png" alt="app_logo" width="600">

This is a fullstack application for tracking powerlifting workouts. It was built as part of the course _Full Stack -websovelluskehitys harjoitustyö_ at the University of Helsinki.

The project was built using the MERN stack. The frontend utilizes the power of React and Typescript combo, while the backend is a Node application using Express and is written in Javascript. The backend API is RESTful.
MongoDB Atlas is used as the database provider and Cloudinary is used for image storage.

The project is deployed to Heroku at [https://voimanosto.herokuapp.com](http://voimanosto.herokuapp.com).

### Features:

- track training volume
- track personal records (PRs)
- track competition progress
- track development over time
- see how you compare to other powerlifters

### Environment variables:

| Name                  |             Purpose             |
| --------------------- | :-----------------------------: |
| MONGODB_URI           | Mongo Atlas development cluster |
| MONGODB_PROD          | Mongo Atlas production cluster  |
| PORT                  |      port for the backend       |
| SECRET                |   secret key for jsonwebtoken   |
| CLOUDINARY_API_KEY    |       cloudinary api key        |
| CLOUDINARY_CLOUD_NAME |      cloudinary cloud name      |
| CLOUDINARY_API_SECRET |    cloudinary api secret key    |

### Known Issues

Input validation is missing from most forms currently, so unexpected behavior is possible.
