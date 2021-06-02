# Mor Life Expo

Mobile Client App for Mor calendar

## Table of Contents

- [Setup](#initial-setup)
- [Development Process (on notion)](https://www.notion.so/morlife/Development-Processes-bd630af6d9cd456c9b687b3d89166b39)
- [QA Process](https://www.notion.so/morlife/QA-Process-60cc87fa07d24a8c97ccd012bced85fd)
- [Testing and Target ](#testing-and-target)
- [TestFlight Instructions](#testFlight-instructions)
- [Search ](#search)

- [Branchin Policy](docs/branching-policy.md) 🔗
- [Debugging](docs/debugging.md) 🔗
- [Folder Structure](docs/folderStructure.md) 🔗
- [Linting](docs/linting.md) 🔗
- [Design Systems Guide](#design-systems-guide)
- [Mor Icons](#mor-icons)

## Initial Setup

1. Install Xcode

2. Install Xcode tools with the following command
   ```sh
   xcode-select --install
   ```
3. Enable tools in xcode

   xcode -> preferences -> locations -> command line tools

4. Install Expo npm package:

   ```sh
   npm install expo-cli --global
   ```

5. Navigate to project directory and install dependencies:

   ```sh
   expo install
   ```

6. Start the expo server:

   ```sh
   expo start
   ```

7. Install and run Expo Client

   https://apps.apple.com/us/app/expo-client/id982107779

8. Launch app and create user

   All test users will be deleted with new TestFlight releases

## Testing and Target

It is set to test the app for only **ios 14 and iPhone 8** and up for alpha testing.

## TestFlight Instructions

1. Give user at least "App Manager" permissions on Apple Developer

2. Update app version on app.json both on version and ios>buildNumber

   ```json
      "version": "x.x.xx",
      "ios": {
           ...
           "buildNumber": "x.x.xx",
           ...
      }
   ```

3. Let expo build the .ipa

   ```sh
   expo build:ios
   ```

4. Choose option "Let expo handle ..."

5. Enter Apple Developer account information

6. Wait for expo to finish build and download the .ipa file

7. Transfer .ipa file to appconnect via Apple Transfer app (Avaliable on MacOS App Store)

8. Go to appconnect and if build status asks for manage compications say no

9. Delete all **internal test users accounts** from firebase `users` collection, so all internal testers can start testing from sign up flow.

## Search

For search functionality we use algolia.com's API. Categories and routines are uploaded to algolia on the same index with type parameter.

## Design Systems Guide

[Design specs file]("https://drive.google.com/file/d/13S5RDIgLj7uG2-chtfjLt-J3C0dloNgh/view?usp=sharing") can be found on our Technolog folder of our Google Drive. If you require access to Google Drive folder, please ask.

## Mor Icons

Custom icons we use, Mor Icons, are added to the project through fontella. To add new icons to mor-icons :

1. Download the [icons folder]("https://drive.google.com/drive/folders/1k__-8SPBHBSsKD1UmnpUzmD5xuU-hpE1?usp=sharing") from Google Drive/Technology

2. Import `.svg` format icons to `icons svg` folder

3. Go to https://www.fontello.com

4. Drap&Drop all icon svgs in the folder

5. Select all of the droped icons

6. Enter font name on top "mor-icons"

7. Download webfont()

8. Upload the files to Google Drive (css/font/README/conig/demo.html)

9. Upload svg's to Google Drive (Its important to keep all synced)

10. Rename `config.json` => `mor-icons-config.json`

11. Move `mor-icons-config.json`(config we just renamed) and `mor-icons.tff` (located in font/) => `assets/fonts` folder of the app
