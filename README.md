# MaskMate

An anonymous platform for university students✨

## Overview

MaskMate is a social media app designed exclusively for university students, offering a secure and anonymous environment for sharing thoughts, questions, and experiences with other students.

## Technical Details

The app is built upon a robust microservices architecture, utilizing Node.js for the backend and React for the frontend. Key technologies include Express.js for backend API development and PostgreSQL for efficient data storage and management.

## Local Development

To contribute to MaskMate or set up a local development environment, follow these steps:

### Prerequisites

1. Docker or PostgreSQL installed on your system
2. Optional: Google's app password for send OTP verification
3. Node.js and pnpm installed on your machine

### Setup Development Environment

1. Navigate to the backend directory by running `cd backend`.
2. Duplicate `.env.example` and rename it to `.env`, ensuring to replace placeholder values with your configurations.
3. Initialize a PostgreSQL container by executing the following docker command:
    ```sh
    docker run --name makemask -e POSTGRES_PASSWORD=makemask_password -e POSTGRES_USER=makemask_user -e POSTGRES_DB=makemask -p 5432:5432 -d postgres
    ```
4. Install project dependencies by running `pnpm install` or using your preferred package manager.
5. Start the backend server with the following command: `pnpm dev`.
6. In a separate terminal window, execute database migrations by running `pnpm migrate`.

Feel free to reach out to our team for any further assistance or inquiries. Happy coding! 🚀
