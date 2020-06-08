# Tydii - Organization and Minimalism App

This app is designed to help people organize and part ways with belongings they are
on the fence about keeping.

## Motivation for this app

A couple years ago I went on a cleaning spree where I had an assortment of items I needed to go through and determine if I wanted to keep them or not.
I would write down each item on a piece of paper and then rate it on a scale of how happy they made me feel. This individual analysis of each item in question
helped immensely in drawing clarity to which things I should keep and ones I should get rid of. A few months later a show on Netflix came out called
'Tidying Up with Marie Kondo' where Marie implemented a very similar strategy in helping horders get rid of stuff. I decided it would be a great opportunity
to expand this idea into an app to allow people to have a set of 'emotions' to help them determine what they should keep and what they should get rid of.

## Upcoming features

- eBay pricing history integration for items looking to be sold

## Add .env file

Make sure you create a `.env` file in the root directory to add these three environment variables:

1. `URL` - this will point to your local database, usually mongodb://localhost:27017
2. `DB_NAME` - the name you gave your database
3. `JWT_SECRET` - This JSON Web Token Secret can be any sort of combination of letters/numbers

## Run locally

- `npm i`
- have a mongoDB instance
- `npm run dev`
