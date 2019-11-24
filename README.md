# discord-symphogear

[![Dependency Status](https://david-dm.org/lucas-deangelis/discord-symphogear/status.svg)](https://david-dm.org/lucas-deangelis/discord-symphogear)
[![devDependency Status](https://david-dm.org/lucas-deangelis/discord-symphogear/dev-status.svg)](https://david-dm.org/lucas-deangelis/discord-symphogear?type=dev)

## Using:

You need to have PostgreSQL installed and running to run the tests correctly.

You will need to provide these environment variables to make the bot run:

-   For the PostgreSQL database:
    -   DBHOST: The adress of your PostgreSQL instance.
    -   DBUSER: The user for PostgreSQL.
    -   DBNAME: The name of the database.
    -   DBPASSWORD: The password for the user.
    -   DBPORT: The port on which PostgreSQL runs.
-   For the bot itself:
    -   BOT_TOKEN: The bot token. More informations on the Discord developper portal.

## Contributing:

See the open issues if you want to contribute. Feel free to add some if you feel the bot is lacking in functionality you might want.

Please be aware that you will need a local postgresql instance to run the tests, which are ran automatically as a pre-push hook.

Please be aware that there are git hooks for formatting and linting.

## Contributors:

See CONTRIBUTORS.md
