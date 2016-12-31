# MarkPage Server

![](/public/markpage.png)

Server which supports the Firefox WebExtensions plugin MarkPage. Please see the [MarkPage GitHub](https://github.com/digithree/markpage) repo for more information.

## Purpose

Currently the only purpose of this Node.js server is to serve the MarkPage plugin with content extracted from webpages. Note that it does not store this data, **we are not scraping content** and there should be no copyright implications here. In fact this is a main concern, and the main purpose this server exists.

## Roadmap

It is planned to allow for public, remote publishing of webpage highlights. Once the local storage of highlights is possible in the MarkPage plugin, I will integrate a sync feature into this server. At that point I will use a MongoDB database to store those informations

### Plan for remote sync of webpage highlights

_Originally from main MarkPage README.MD_

**Save highlights remotely**

The user can choose to post their highlights to a remote server to share with other users of the plugin. These posts will not contain any identifying information and there will be no account based authentication procedure.

Instead the server will give the user a unique private key for their post which only the user (i.e. local plugin data) will know. Using this they can post updates to their remote highlight (i.e. sync with their local changes).

We may allow a couple of hashtags to be attached to a post in order to facilitate viewing better, but the usage of any personally identifying information is strongly discouraged.

## Usage

You can test this server in a live Heroku app at [https://markpage-server.herokuapp.com/](https://markpage-server.herokuapp.com/). This is currently being used by the MarkPage plugin. _Please use it responsibly_.

**Endpoints**

### GET /

index.html, default skeleton info

### GET /test

test express endpoint routing is working and server is alive

### GET /extract-content

Extract content from a webpage and respond with extracted data

Params:

- _from_ (required), Base64 encoded URL of webpage to extract content from
- _format_ (optional) [default: full]
-- full, response will contain entire content extration JSON object as supplied by node-unfluff
-- content-only, response will contain the extracted text body content only

# Deploy to Heroku

You can deploy a live copy of this application to Heroku with the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/digithree/web-db-intermediary)

## Changelog

*16.12.31
- Update readme only

*16.12.27 - v0.1.0*
- GET /extract-content endpoint implemented

*16.12.27 - v0.0.1*

- Create project with only test endpoint.
- Note that there will be lots of commits as in order to deploy to Heroku I must make a commit. Minor version branches will be used and merged into develop branch when minor version reached. Major versions will be full merge to master branch when ready.