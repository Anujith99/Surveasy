# Surveasy

[Surveasy](https://its-surveasy.netlify.app/) is a survey builder inspired by [Google Forms](https://www.google.com/forms/about/). Users can create simple surveys for product,market and social research. With [Surveasy](https://its-surveasy.netlify.app/), your survey will be up and running in no time!

## About the Project
This project was my foray into full stack development. For this project I decided to use MERN stack as there are plenty of tutorials online and a vibrant coding community. As I already knew ReactJS, my focus was on the backend as I had never written any APIs before. 

Some of the technologies that I used for the backend are:
- JWT and Cookies for user authentication.
- [CORS](https://www.npmjs.com/package/cors) to enable the CORS header in all the apis.
- [Winston](https://www.npmjs.com/package/winston) logging for a complete logging solution.
- [Mongoose](https://www.npmjs.com/package/mongoose) to build MongoDB queries.
- Setting up a custom [webpack](https://www.npmjs.com/package/webpack) configuration for the backend code.

For the frontend I used:
- [Chakra UI](https://www.npmjs.com/package/@chakra-ui/react) to build a simple and beautiful user interface.
- [react-chartjs-2] to build graphs and charts.
- [react-beautiful-dnd] for a seamless drag and drop experience.
- [Redux](https://www.npmjs.com/package/redux) for global state management and [react-hook-form](https://www.npmjs.com/package/react-hook-form) for form state management.

The frontend code was deployed on [Netlify](https://www.netlify.com/) and the backend on [Heroku](https://www.heroku.com/). Click [here](https://its-surveasy.netlify.app/) to go to Surveasy and click [here](https://tinyurl.com/yem9shpn) to view a survey created using Surveasy.

## How to use Surveasy

1. Sign up with your personal email or sign in with the below credentials:
  - Username: dummy@gmail.com
  - Password: dummy789
2. Next, click 'Create' and enter the survey title. The survey description is optional.
3. Then under the 'Questions' Tab click on the 'Edit' button to start creating your survey. Here, you can add/delete questions, add a description, make the question required, change the question type, reorder the questions,etc.. You can also choose the personal information that you would like the respondent to enter.
4. After you have created all your questions, go back to the survey home page and click on the eye icon to preview the survey.
5. Once you are confident with your survey, you can share the survey link with your respondents by opening the menu on clicking on "Share Link". 
6. When your respondents have submitted their responses, you can view a summary of all the responses in the 'Responses Summary' tab. You can also download an Excel file with the list of all the responses, including the respondent information of each respondent.


Feel free to play around with Surveasy as well as go through the codebase. I am open to any kind of feedback. You can reach me at <banuj99@gmail.com>.
