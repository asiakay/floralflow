# FloralFlow

FloralFlow is a progressive web app designed to help retail floral department managers and employees manage inventory, reduce waste and paper usage, and streamline their workflows through effective process management. The app allows users to create and manage their own SOPs, define steps in a process, assign roles and responsibilities, set deadlines, and collaborate with team members. FloralFlow also provides access to a library of pre-made SOPs, notifications and reminders, version control, analytics and reports, and integration with other tools.

## Installation

To run FloralFlow locally, clone this repository to your local machine and install the required dependencies using npm:

git clone https://github.com/your-username/floralflow.git
cd floralflow
npm install

Next, set up a Firebase project and services as described in the `firebase-setup.md` file. Then, create a `.env.local` file in the root directory of the app and set the following environment variables to your Firebase project credentials:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

Finally, start the development server using the following command:

npm run dev

## Contributing

We welcome contributions to the FloralFlow app! To contribute, please follow these steps:

1. Fork this repository to your own GitHub account.
2. Create a new branch from the `main` branch for your feature or bug fix: `git checkout -b my-new-feature`.
3. Make your changes and commit them with a descriptive commit message: `git commit -am 'Add some feature'`.
4. Push your changes to your fork: `git push origin my-new-feature`.
5. Create a pull request on this repository and describe your changes in detail.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

Please note that you will need to replace your-username with your GitHub username and provide the appropriate Firebase credentials in the .env.local file for the app to work properly.
