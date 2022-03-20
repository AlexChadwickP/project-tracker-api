# Project Tracker
This is a very simple project tracker RESTful API. Deploy this on your private server.

## Motivation behind the project
I made this because I need to manage my projects at work, and being a solo developer at the moment, it's tough to find something that doesn't feel bloated and overkill for my needs. A very simple project tracker is exactly what I need.

I made it into a RESTful API to make it easy to connect any sort of client to it. I'm thinking of creating a CLI client as I'd like to get more work done in the terminal.

## Running
Running it fairly simple. Clone the repository, cd into the repo's folder, and run `node src/server.js`. Additionally, you may create a `.env` file that contains the `PORT` you want it to run on, or configure that environment variable in any other way you'd like.

## Use
At the minute using it is fairly simple.

* `GET /task`: Show's you all of the tasks
* `POST /task`: Inserts a new task. It needs a required `author` and `title` body parameters. It also takes in an optional `priority` paramater. If no `priority` is supplied, it defaults to `4` (this is because I work on a priority system that goes 1-4).

## Contributing
It's too small to add contributing guidelines, just make small, understandable commits, make sure your code is relatively clean, and I'm always open to new suggestions on features and refactors.

## Coming Up
I'd like to be able to create some sort of query system, whereby I can query for tasks with a certain `priority` or `status`.

## Other notes
I'd love to see someone create a CLI application that can connect to this API