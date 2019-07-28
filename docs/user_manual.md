# User manual

This is a (incomplete) user manual for the Voimanosto fullstack application, an application for powerlifters.

## Getting started

1. Clone the repository

`git clone https://github.com/yusifsalam/voimanosto.git`

2. Install backend and start it with nodeman

`cd voimanosto-backend && npm install && npm run watch`

3. Install frontend and launch it

`cd ../voimanosto-frontend && npm install && npm start`

## Registering a new user

Navigate to port 3000 of your machine that the frontend is running on: http://localhost:3000

Click on the sign-up button, you'll be redirected to the registration form. When registering, the username and email have to be unique, otherwise the registration will fail. Fill in the form and hit submit. If the registration is successful, a message will appear on top of the form. You can now click on the green Log In button or on the app name in the left corner "Voimanosto" to be redirected to the login page.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/reg.png" alt="registration" width="600">

## Logging in

Enter your username and password that you registered with and hit the blue Login button. If successful, you'll be redirected to the dashboard.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/login.png" alt="login" width="600">

## Logging out

While logged in, click the red _Log out_ button in the top menu.

## Main functionality

Currently, you can log bodyweight readings, add competitions and calculate your powerlifting performance in terms of IPF points and Wilks scores.

### Bodyweight tool

#### Adding a new reading

Navigate to the calendar. Click on the cell with the date that you want to add a bodyweight reading for, then click _Log bodyweight_.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/bw_1.png" alt="bw" width="600">
Input your bodyweight and click the green _Add bodyweight_ button. The window will close and you will see a message that you have successfully added a new bodyweight reading.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/bw_2.png" alt="add bw" width="600">

#### Viewing your bodyweight readings

Navigate to tools and there click on the scale icon that reads Bodyweight. You will see a chart with your logged bodyweights. You can also enable the table view by clicking on the Settings cog icon and then shifting the slider to the on position.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/bw_3.png" alt="view bw" width="600">

#### Modifying previous entries

If you made a mistake when entering your bodyweight, you can either edit it or remove it altogether. With the table view on, click on the row that you want to modify. From the popup menu, pick the action that you would like to perform.

If you want to edit your previous entry, click _Edit_, a new window will pop up. Enter the new value and click _Edit bodyweight_, the chart will update.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/bw_4.png" alt="edit bw" width="600">

If you want to delete your previous entry, click _Delete_, a confirmation window will pop up. If you are certain that you want to remove the entry, click _Yes, I'm sure_ and the entry will be removed from the database. This action is undoable, you cannot recover deleted entries.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/bw_5.png" alt="del bw" width="600">

### Competition tool

With this tool you can add and view competitions.

#### Adding a new competition

Navigate to the calendar. Click on the day cell that the competiton was held on and then click _New competiton_, a window will pop up with the form. Fill in the form and click the green _Add competition_ button.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/comp_1.png" alt="add comp" width="600">

#### Viewing your competition progress

When you have added several competition, you can track your progress!
Go to Tools - Competitions. You will see a chart showing your competition progress. You can hover over the bar to reveal more information.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/comp_2.png" alt="view comp" width="600">

### Custom exercises

By default, you only have three exercises in your exercise library - Competiton squat, bench press and deadlift. You can add more exercises to your exercise library.

#### Viewing your exercise library

Navigate to My profile. On the bottom of the page you can see all of your exercises. You can filter them by category and exercise name using the two dropdown menus above the table.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/ex_2.png" alt="exercise library" width="600">

#### Adding a new exercise

Navigate to My profile. On the bottom of the page you can see your exercise library. To add a new exercise to the library, click on the _Add new exercise_ button. A new window will pop up. Fill in the form and click the green _Add exercise_ button.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/ex_1.png" alt="new exercise" width="600">

#### Viewing your personal records

Navigate to Tools - PR Table. You will see a table taht contains all your most recent personal records for all the exercises in your exercise library. As you add workouts and competitions, the PR table will update automatically.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/ex_3.png" alt="pr table" width="600">

You can view all the PRs at once or show only select exercise/category.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/ex_4.png" alt="pr table squat" width="600">

### IPF/Wilks points calculator

You can calculate your powerlifting scores in the app. Go to Tools - IPF points. Fill in the form and click the _Calculate_ button.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/points.png" alt="ipf points" width="600">

### User settings

In the user settings, you can set a custom profile picture.

#### Changing your profile picture

Go to Settings from the sidebar on desktop or bottom navigation panel on mobile. To upload a picture, first select your desired image by clicking on the blue _Select image_ button. Allowed formats are jpeg and png, maximum file size is 3mb. Select your desired image and then click the purple _Submit_ button. You can verify that your profile picture has been changing by going to My Profile.

<img src="https://github.com/yusifsalam/voimanosto/blob/master/docs/images/profile.png" alt="profile pic" width="600">
