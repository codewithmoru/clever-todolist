# Clever to-do list

App was created with the help of Firebase Database architecture and dayjs library.
We have a basic routing with Authorization  / Registration pages.
After Firebase validate your data,  it's redirecting on the Homepage.

Custom calendar generated with usage of dayjs library.
Calendar shows you days from current day to last day of the month.
With the help of pagination you can see the tasks from the last and next months.

During creating a task, Firebase saves your data : day of creating, last day to make this task (due date), priority of the task and title.
Every created task shows on calendar : day you pick as last day to make this task will show you the status of the task : red for undone, and  green for done.
Every task has its own logic of updating, you can update your data with the help of newly opened update panel.

This task was made with the help of the list of dependencies, such libraries as :
- MUI Components Library (Linear progress in Tasks List , Circular progress an Toasts on SignUp / Registration pages , etc.)
- UUID (to generate unique id's)
- DayJS (to help us work with calendar data and set data for our usage)
- React-router-dom (to help us work with app navigation)

Also we use strong linter alliance in our application : ESLint + Prettier + Pre-commit Hook.
After installing linter and prettier, we rewrite some rules for our code, such as no-console and use-brackets.
Adding new scripts 'npm run lint' and 'npm run lint:fix' allow us to catch and handle warnings / errors in our code.
Installing husky-library and lint-staged-library allow us to work with Git-hooks : we pick work with pre-commit.
This hook stop us before commiting , because it monitors the code for existence of warnings and throw us an error, if it exists.


