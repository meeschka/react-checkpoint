# Checkpoint
GA Project 4: A full-stack MERN app that creates a framework for users to set longterm goals and track their progress.

## About
We all have goals and plans. Some are fuzzy, like the feeling that we really should loose some weight or contact that old school friend. Other goals are clearer, like the new year's resolution of bygone days: this year I will go to the gym at least three times a week, this year I will learn how to paint, or sing, or whatever your fancy is. We all make plans. Unfortunately, many of those plans go unfulfilled. One day goes by, and then another, and before you know it, you've entirely forgotten your plans to conquer the world, until the next new year or birthday rolls around. It's time to actually start acheiving your dreams.

Checkpoint is many things. It is a framework for setting goals in manageable time chunks or 2 - 3 months, and a method to track your progress. When we keep our goals at the forefront of our minds, they are much more likely to be accomplished. By entering your progress daily, you can become more miindful about encorporating your goals into your daily life. By seeing the progress you have already made, you will become more motivated to continue working towards your goals.

## How does it work?
As a user, you make checkpoints: a collection of goals and observations lumped into easy to manage categories. For example, you might have categories for health, finance, career development, social life, and hobbys. For each category, you are encouraged to think deeply about the positives and the potential areas of improvement. Use these items to guide you in the setting of goals and challenges: what can you do to fix the aspects you don't like? What can you do to increase the good things in this category? Each checkpoint comes with the option of setting up reminder notifications which are texted to you once a week, to help you further focus.

Goals are items you will be working towards and items you are trying to incorporate into your routine more regularly. This is a very flexible item, and might include what you'll be doing (practicing piano for at least 30 minutes every day? Contacting old friends at least twice a week? Limiting meals out to once a week?). This allows you to really make goals work for you. For each goal, you have the option of entering specific steps and the reasons for making the goal. Both of these categories are optional, but can be helpful when motivation starts to flag or you aren't sure what to do next.

The other type of entry Checkpoint allows is challenges. Challenges are discreet items with a quantity attached: I will read 5 books this checkpoint, I will meet three people for coffee this checkpoint, I will complete two coding projects, I will knit two hats. Seeing these challenges as you enter your daily progress will ensure that you don't forget about them, and can continue to to be mindful about working towards them.

## Screenshots
![Checkpoint radar graph overview](https://i.imgur.com/HsNiaMB.png)
![Checkpoint category overview](https://i.imgur.com/XCFes3n.png)

## Technologies Used
* Node JS using Express Framework for backend JS logic
* MongoDB/Mongoose databases of checkpoints and users
* Token-based authentication
* Optional weekly text-reminders implemented using Twilio and Heroko Scheduler
* Radar graphs using Nivo
* Calendar graphs using react-calendar-heatmap

## Background
Checkpoint was designed and built by Michelle Pitts Linley in one week for Project 4 of General Assembly's Software Engineering Immersive Bootcamp. It was built using Mongo, Express, React, and NodeJS (MERN Stack). Michelle is a big believer in incremental and mindful improvement. She and her husband have conducted 'quarterly reviews' for the past several years: regularly scheduled conversations to plan for the future and engineer a better life for themselves. While these quarters are incredibly useful, it can be easy to forget about the proposed goals due to the hectic nature of everyday life.

Checkpoint was designed to be an answer to this. It provides a location for storing collections of goals (be they quarterly or otherwise!), a framework for making and thinking of goals, and, perhaps most importantly, a means of tracking daily progress. This allows users to remain focused on their progress and on the goals themselves.

## Getting Started
You can access the app [here](https://checkpoint-tracker.herokuapp.com/).

## Next Steps
* On calendar graph click, should open option to edit daily progress
* Add option for email reminders
* Clean up guide page to include more images


