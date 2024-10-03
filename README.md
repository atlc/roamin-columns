# Roamin' Columns API

Welcome to Roamin' Columns, a drag-and-drop column-based application similar to tools like Jira or Trello. It's like Roman Columns, except they're Roamin' around - feel free to roll your eyes here. This project is built with TypeScript and Node.js, and utilizes Mailgun for a completely passwordless authentication workflow.

Features:
- Create your own boards - Todo lists, project tracking, etc.
- Create, update, and delete columns: Users can manage columns to organize tasks.
- Drag-and-drop support: Rearrange tasks within and between columns using the HTML5 drag & drop API.
- Passwordless authentication: Secure login via email using Mailgun.
- Easy DB setup: Just run the `npm run refreshDB` script, which will drop your tables if they exist, recreate them, and seed them with starting data. It will only commit the data in the event everything suceeds, otherwise it will rollback.