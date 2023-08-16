# Social Media App

## Description

This application aims to mimic the basic functionality of Instagram. The app is fully built in node and uses a JSON based database to handle read and write operations. To ensure typesafety I used Typescript along with React as the frontend library and express to handle backend operations.

## Features

- User Authentication: Securely sign up and log in to your account.
- Create Posts: Share your thoughts, photos, and moments with others.
- Like and Comment: Interact with posts by liking and leaving comments.
- Explore Feed: Discover new posts and users through the explore feed.
- User Profiles: View user profiles to see their posts and information.
- Responsive Design: Enjoy a seamless experience across various devices.

## Tech Stack

- Backend: Node.js and Express for server operations.
- Frontend: React for building the user interface.
- Database: JSON-based database built with node.
- Typesafety: Utilized TypeScript for strong typing and code quality.
- Styling: TailwindCSS.

## Getting Started

1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Configure your environment variables .
   1. Add two env files: `/vite-social-media-app/backend/.env` and `/vite-social-media-app/.env`
   2. The following variables must match exactly on both env's `VITE_CLIENT_ID VITE_CLIENT_SECRET` (frontend) and `CLIENT_ID CLIENT_SECRET` (backend)
4. Run the backend server:
   1. `cd /vite-social-media-app/backend && pnpm run dev`
5. Run the frontend server:
   1. `cd /vite-social-media-app && pnpm run dev`

## Usage

1. Register or log in to your account.
2. Create new posts and share your content.
3. Interact with posts by liking and commenting.
4. Explore the feed to discover new content from other users.
5. Visit user profiles to see their posts and activity.

## Contributing

Contributions are always welcome! If you find any bugs or have suggestions for improvements, feel free to submit an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries, reach out to [raulrodriguez@leprekus.dev](mailto:raulrodriguez@leprekus.dev).
