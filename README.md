OpenShift Setup Instructions
============================

The OpenShift-hosted project is at [http://seon-zickonezero.rhcloud.com/](http://seon-zickonezero.rhcloud.com/).

Instructions are for OS X Mountain Lion, but will probably work across most versions of OS X.

Initial setup
-------------

First, create an [OpenShift](https://www.openshift.com/) account if you haven't done so.

Then create a Node.JS app, and use this Git source link (https or ssh) to directly import the code into your app.

Next, add two cartridges: MongoDB and RockMongo.

Seting up the database
----------------------

I've included a CSV file called "surfers.csv" in "your_app_name/mongo_exports/".

Go to the RockMongo URL for your OpenShift app, select "your_app_name_db" and import this CSV file.

Local Setup Instructions
========================

Installing Node, MongoDB and Supervisor
---------------------------------------

Go to [nodejs.org](http://nodejs.org/) and download the package for OS X.

After you've installed Node, open up Terminal and install Supervisor, the file-watching app:

`$ sudo npm install supervisor -g`

This installs Supervisor into "/usr/local/bin/", and is available globally.

Install MongoDB:

`$ sudo port install mongodb`

For other install methods, refer to the [installation guide](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/).

Seting up the database
----------------------

In terminal, create the /data/db directory:

`$ cd /`

`$ sudo mkdir data && cd data`

`$ sudo mkdir db`

Start the MongoDB server:

`$ mongod`

Then, in a new Terminal window/tab:

`$ mongo`

Refer to the [Getting Started with MongoDB](http://docs.mongodb.org/manual/tutorial/getting-started/) guide for creating a new database and other operations.

Follow the [import guide](http://docs.mongodb.org/manual/reference/program/mongoimport/) to import surfers.csv into your new database.

Running the app
---------------

Use Git commands in Terminal or use a Git management app (SourceTree, Tower, etc) to pull the repository to your local machine.

In your Git management app, create a new branch from master.

In server.js, uncomment the local connection code and comment-out the OpenShift connection code right above it.

In Terminal, go to your project root:

`$ cd your_app_name/`

Make sure you're in the directory where "server.js" lives.

Run the command:

`$ supervisor server.js`

The last line of the console output should be "Express server listening on port 8080".

In your browser, go to [http://127.0.0.1:8080/](http://127.0.0.1:8080/) and see your project!

Legal
-----

All code, apps, packages, databases, files and text are free to use, distribute and modify under the open source licenses of their respective creators. For more information, visit the creator's sites directly.